const apprenants = require('./data')


// Ajoute un nouvel apprenant dans la liste.
// Vérifie d'abord si l'identifiant existe déjà.
function ajouterApprenant(id, fullname, city){

    const exist = apprenants.find(function(apprenant){
        return apprenant.id === id
    })

    if(exist){
        console.log("Fatal: This Identifiant Already Exist")
        return
    }

    const apprenant = {
        id: id,
        nomComplet: fullname.trim(),
        ville: city.trim(),
        resultats: [],
    }

    apprenants.push(apprenant)

    console.log("The Learner has been successfully added")
}


// Enregistre ou met à jour le résultat d'un apprenant
// pour un jour donné.
// Vérifie également que les données saisies sont valides.
function enregistrerResultat(id, day, exercicesfin, totalexercices, challengefin){

    // Recherche l'apprenant avec son identifiant.
    const exist = apprenants.find(function(app){
        return app.id === id
    })

    if(!exist){
        console.log("Fatal: The Learner is not exist")
        return
    }

    // Vérifie que le jour est compris entre 1 et 7.
    if(day < 1 || day > 7){
        console.log("Fatal: The days Must be betwen 1 and 7")
        return
    }

    // Vérifie que les exercices terminés
    // ne dépassent pas le nombre total d'exercices.
    if(exercicesfin > totalexercices){
        console.log("Fatal: Exercices Termines Cant be up than Total Exercices")
        return
    }

    // Vérifie que les nombres d'exercices ne sont pas négatifs.
    if(exercicesfin < 0 || totalexercices < 0){
        console.log("exercices cant be negative")
        return
    }

    // Vérifie que le challenge est bien un booléen.
    if(typeof challengefin !== "boolean"){
        console.log("The challenge need to be true or false")
        return
    }

    // Recherche si un résultat existe déjà pour ce jour.
    const resultexist = exist.resultats.find(function(result){
        return result.jour === day
    })

    // Si le résultat existe, on le met à jour.
    if(resultexist){

        resultexist.challengeTermine = challengefin
        resultexist.totalExercices = totalexercices
        resultexist.exercicesTermines = exercicesfin

        console.log("The Results Has Been Updated")

    }else{

        // Sinon, on crée un nouveau résultat.
        const result = {
            jour: day,
            exercicesTermines: exercicesfin,
            totalExercices: totalexercices,
            challengeTermine: challengefin
        }

        exist.resultats.push(result)

        console.log("The Results Has Been Added")
    }
}


// Recherche un apprenant à partir de son identifiant.
// Retourne l'apprenant s'il existe.
function searchLearner(id){

    const exist = apprenants.find(function(app){
        return app.id === id
    })

    if(!exist){
        console.log("Fatal: learner not exist")
        return
    }

    return exist
}


// Normalise un nom pour faciliter la recherche.
// Supprime les espaces inutiles, met le texte en minuscules
// et réduit les espaces multiples à un seul espace.
function parsingnames(name){

    return name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ")
}


// Recherche des apprenants à partir d'une partie de leur nom.
// La recherche n'est pas sensible aux majuscules/minuscules.
function searchwithname(name){

    const search = parsingnames(name)

    const result = apprenants.filter(function(app){

        return parsingnames(app.nomComplet).includes(search)

    })

    return result
}


// Calcule la progression globale d'un apprenant.
// Calcule également le nombre d'exercices terminés,
// le total des exercices, les challenges terminés
// et le nombre de jours enregistrés.
function calculation(apprenant){

    let exercicesTermines = 0
    let totalExercices = 0
    let challengeTermine = 0

    // Parcourt tous les résultats de l'apprenant.
    apprenant.resultats.forEach(function(app){

        exercicesTermines += app.exercicesTermines

        totalExercices += app.totalExercices

        // Compte les challenges terminés.
        if(app.challengeTermine){
            challengeTermine++
        }
    })

    let prosess = 0

    // Évite une division par zéro.
    if(totalExercices > 0){

        prosess = (exercicesTermines / totalExercices) * 100
    }

    return {
        exercicesTermines: exercicesTermines,
        totalExercices: totalExercices,
        challengeTermine: challengeTermine,
        prosess: prosess,
        jourtermine: apprenant.resultats.length
    }
}


// Filtre les apprenants selon leur niveau de progression.
// Les niveaux sont : Solide, En progression et À renforcer.
function filterbylevels(level){

    const result = apprenants.filter(function(app){

        const progress = calculation(app).prosess

        // Niveau Solide : progression >= 80%.
        if(level === "Solide"){
            return progress >= 80
        }

        // Niveau En progression : progression entre 50% et 79%.
        if(level === "En progression"){
            return progress >= 50 && progress < 80
        }

        // Niveau À renforcer : progression < 50%.
        if(level === "À renforcer"){
            return progress < 50
        }

        return false
    })

    return result
}


// Trie les apprenants par progression décroissante.
// L'apprenant avec la plus grande progression apparaît en premier.
function trierParProgression(){

    const result = apprenants.sort(function(one, two){

        const progresone = calculation(one).prosess

        const progrestwo = calculation(two).prosess

        return progrestwo - progresone
    })

    return result
}


// Affiche le tableau de bord général.
// Affiche le nombre d'apprenants, la moyenne du groupe,
// la répartition des niveaux et les informations des apprenants.
function afichingboard(){

    const totallearner = apprenants.length

    let totalprogress = 0

    let Solide = 0

    let Enprogression = 0

    let arenforcer = 0

    // Parcourt tous les apprenants pour calculer
    // les statistiques du groupe.
    apprenants.forEach(function(app){

        const progress = calculation(app).prosess

        totalprogress += progress

        if(progress >= 80){

            Solide++

        }else if(progress >= 50 && progress < 80){

            Enprogression++

        }else{

            arenforcer++
        }
    })

    // Calcule la moyenne de progression du groupe.
    let moyene = 0

    if(totallearner > 0){

        moyene = totalprogress / totallearner
    }

    console.log("===== DASHBOARD =====")

    console.log("Total learners:", totallearner)

    console.log("Average progression:", moyene.toFixed(2) + "%")

    console.log("Solide:", Solide)

    console.log("En progression:", Enprogression)

    console.log("À renforcer:", arenforcer)

    console.log("\n===== LEARNERS =====")

    // Affiche les informations de chaque apprenant.
    apprenants.forEach(function(app){

        const progress = calculation(app).prosess

        console.log("ID:", app.id)

        console.log("Nom:", app.nomComplet)

        console.log("Progression:", progress.toFixed(2) + "%")

        console.log("Jours terminés:", app.resultats.length)

        console.log("--------------------------------")
    })

    console.log("===== END OF DASHBOARD =====")
}


// Trie les apprenants par ordre alphabétique
// en utilisant leur nom complet.
function trierParNom(){

    const result = apprenants.sort(function(one, two){

        return one.nomComplet.localeCompare(two.nomComplet)

    })

    return result
}


// Exporte les fonctions pour pouvoir les utiliser
// dans index.js et dans les fichiers de test.
module.exports = {

    ajouterApprenant,
    enregistrerResultat,
    searchLearner,
    parsingnames,
    searchwithname,
    calculation,
    filterbylevels,
    trierParProgression,
    afichingboard,
    trierParNom
}
