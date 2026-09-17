const prompt = require('prompt-sync')()
const apprenants = require('./data')

function ajouterApprenant(){
    const id = Number(prompt("Identifiant: "))
    const fullname = prompt("New Complet: ")
    const city = prompt("City: ")

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
    console.log("The Apprenant has been successfully added")
}

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