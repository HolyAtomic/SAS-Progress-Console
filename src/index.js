const prompt = require('prompt-sync')()
const apprenants = require('./data')
// const helpers = require('./helpers')

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
    console.log(exist);
    
}

function parsingnames(name){
    return name.trim().toLowerCase().replace(/\s+/g, " ")
}
function searchwithname(name){
    const search = parsingnames(name)
    const result = apprenants.filter(function(app){
        return parsingnames(app.nomComplet).includes(search)
    })
    console.log(result);
}

// while (true) {

//     console.log("Welcome To Sas Progress Console")

//     console.log("1. Start")
//     console.log("2. Exit Or Stop")

//     const choose = prompt("Choose an Option: ")

//     if (choose.toLowerCase() === "start" || choose === "1") {

//         console.log("Starting The Program...")

//     } else if (choose.toLowerCase() === "exit" || choose === "2" || choose.toLowerCase() === "stop") {

//         console.log("Stopping The Program...")
//         break
//     }else {

//         console.log("Invalid Option.")

//     }
// }
searchwithname("sara")

