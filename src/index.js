const prompt = require('prompt-sync')()
const apprenants = require('./data')
const {
    ajouterApprenant,
    enregistrerResultat,
    searchLearner,
    searchwithname,
    calculation,
    filterbylevels,
    trierParProgression,
    trierParNom,
    afichingboard
} = require('./helpers')


while (true) {

    console.log("\n===== SAS PROGRESS CONSOLE =====")
    console.log("1. Dashboard")
    console.log("2. List learners")
    console.log("3. Add learner")
    console.log("4. Find learner by ID")
    console.log("5. Add / Update result")
    console.log("6. Search by name")
    console.log("7. Filter by level")
    console.log("8. Sort by progression")
    console.log("9. Sort by name")
    console.log("10. Exit")

    const choice = prompt("Choose an option: ")


    // 1 - Dashboard
    if (choice === "1") {

        afichingboard()


    // 2 - List learners
    } else if (choice === "2") {

        console.log("\n===== ALL LEARNERS =====")

        if (apprenants.length === 0) {

            console.log("No learners found")

        } else {

            apprenants.forEach(function(app) {

                const progress = calculation(app).prosess

                console.log("ID:", app.id)
                console.log("Name:", app.nomComplet)
                console.log("City:", app.ville)
                console.log("Progression:", progress.toFixed(2) + "%")
                console.log("Days recorded:", app.resultats.length)
                console.log("--------------------------------")

            })

        }


    // 3 - Add learner
    } else if (choice === "3") {

        const id = Number(prompt("ID: "))
        const fullname = prompt("Full name: ")
        const city = prompt("City: ")

        ajouterApprenant(id, fullname, city)


    // 4 - Find learner by ID
    } else if (choice === "4") {

        const id = Number(prompt("Learner ID: "))

        const learner = searchLearner(id)

        if (learner) {

            console.log("\n===== LEARNER =====")
            console.log("ID:", learner.id)
            console.log("Name:", learner.nomComplet)
            console.log("City:", learner.ville)

            const progress = calculation(learner)

            console.log("Exercises:", progress.exercicesTermines)
            console.log("Total exercises:", progress.totalExercices)
            console.log("Progression:", progress.prosess.toFixed(2) + "%")
            console.log("Challenges completed:", progress.challengeTermine)
            console.log("Days recorded:", progress.jourtermine)

        }

    }
}