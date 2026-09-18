const prompt = require('prompt-sync')()
const apprenants = require('./data')
const {
    ajouterApprenant,
    enregistrerResultat,
    searchLearner,
    parsingnames,
    searchwithname,
    calculation,
    filterbylevels
} = require('./helpers')

while (true) {

    console.log("Welcome To Sas Progress Console")

    console.log("1. Start")
    console.log("2. Exit Or Stop")

    const choose = prompt("Choose an Option: ")

    if (choose.toLowerCase() === "start" || choose === "1") {

        console.log("Starting The Program...")

    } else if (choose.toLowerCase() === "exit" || choose === "2" || choose.toLowerCase() === "stop") {

        console.log("Stopping The Program...")
        break
    }else {

        console.log("Invalid Option.")

    }
}

