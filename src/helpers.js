const apprenants = require('./data')


function ajouterApprenant(id, fullname, city){
    const exist = apprenants.find(function(apprenant){
        return apprenant.id === id
    })
    if(exist){
        console.log("Fatal: This Identifiant Already Exist")
        return
    }
    const apprenant = {
        id : id ,
        nomComplet : fullname.trim(),
        ville : city.trim(),
        resultats : [],
    }
    apprenants.push(apprenant)
    console.log("The Learner has been successfully added")
}


function enregistrerResultat(id, day, exercicesfin, totalexercices, challengefin){
    const exist = apprenants.find(function(app){
        return app.id === id
    })
    if(!exist){
        console.log("Fatal: The Learner is not exist")
        return
    }
    if(day < 1 || day > 7){
        console.log("Fatal: The days Must be betwen 1 and 7")
        return
    }
    if (exercicesfin > totalexercices){
        console.log("Fatal: Exercices Termines Cant be up than Total Exercices")
        return
    }
    if(exercicesfin < 0 || totalexercices < 0){
        console.log("exercices cant be negative");
        return
    }
    if(typeof challengefin !== "boolean"){
        console.log("The challenge need to be true or false")
        return
    }
    const resultexist = exist.resultats.find(function(result){
        return result.jour === day
    })
    if(resultexist){
        resultexist.challengeTermine = challengefin
        resultexist.totalExercices = totalexercices
        resultexist.exercicesTermines = exercicesfin
        console.log("The Results Has Been Updated")
        
    }else{
        const result = {
            jour: day,
            exercicesTermines: exercicesfin,
            totalExercices: totalexercices,
            challengeTermine: challengefin
        }
        exist.resultats.push(result)
        console.log("The Results Has Been Added");
        
    }
}


function searchLearner(id){
    const exist = apprenants.find(function(app){
        return app.id === id
    }
)
if(!exist){
    console.log("Fatal: learner not exist")
    return
}  
    return exist
}


function parsingnames(name){
    return name.trim().toLowerCase().replace(/\s+/g, " ")
}


function searchwithname(name){
    const search = parsingnames(name)
    const result = apprenants.filter(function(app){
        return parsingnames(app.nomComplet).includes(search)
    })
    return result
}


function calculation(apprenant){
    let exercicesTermines = 0
    let totalExercices = 0
    let challengeTermine = 0
    
    apprenant.resultats.forEach(function(app){
        exercicesTermines += app.exercicesTermines
        totalExercices += app.totalExercices
        if(app.challengeTermine){
            challengeTermine++
        }
    })
    let prosess = 0
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

function filterbylevels(level){
    const result = apprenants.filter(function(app){
        let progress = calculation(app).prosess
        if(level === "Solide"){
            return progress >= 80
        }
        if(level === "En progression"){
            return progress >= 50 && progress < 80
        }
        if(level === "À renforcer"){
            return progress < 50
        }
        return false
    })
    return result
}

function trierParProgression(){
    const result = apprenants.sort(function(one, two){
       const progresone = calculation(one).prosess
       const progrestwo = calculation(two).prosess

       return progrestwo - progresone
    })
    return result
}
module.exports = {
    ajouterApprenant,
    enregistrerResultat,
    searchLearner,
    parsingnames,
    searchwithname,
    calculation,
    filterbylevels,
    trierParProgression
}