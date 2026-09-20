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


    // 5 - Add / Update result
    } else if (choice === "5") {

        const id = Number(prompt("Learner ID: "))
        const day = Number(prompt("Day (1-7): "))
        const exercicesfin = Number(prompt("Exercises completed: "))
        const totalexercices = Number(prompt("Total exercises: "))

        const challenge = prompt("Challenge completed? (true/false): ")

        let challengefin

        if (challenge.toLowerCase() === "true") {

            challengefin = true

        } else if (challenge.toLowerCase() === "false") {

            challengefin = false

        } else {

            console.log("Challenge must be true or false")
            continue

        }

        enregistrerResultat(
            id,
            day,
            exercicesfin,
            totalexercices,
            challengefin
        )


    // 6 - Search by name
    } else if (choice === "6") {

        const name = prompt("Search name: ")

        const results = searchwithname(name)

        if (results.length === 0) {

            console.log("No learner found")

        } else {

            console.log("\n===== SEARCH RESULTS =====")

            results.forEach(function(app) {

                const progress = calculation(app).prosess

                console.log("ID:", app.id)
                console.log("Name:", app.nomComplet)
                console.log("City:", app.ville)
                console.log("Progression:", progress.toFixed(2) + "%")
                console.log("--------------------------------")

            })

        }


    // 7 - Filter by level
    } else if (choice === "7") {

        console.log("\n===== LEVELS =====")
        console.log("1. Solide")
        console.log("2. En progression")
        console.log("3. À renforcer")

        const levelChoice = prompt("Choose level: ")

        let level

        if (levelChoice === "1") {

            level = "Solide"

        } else if (levelChoice === "2") {

            level = "En progression"

        } else if (levelChoice === "3") {

            level = "À renforcer"

        } else {

            console.log("Invalid level")
            continue

        }

        const results = filterbylevels(level)

        console.log("\n===== " + level + " =====")

        if (results.length === 0) {

            console.log("No learner found")

        } else {

            results.forEach(function(app) {

                const progress = calculation(app).prosess

                console.log(
                    app.nomComplet,
                    "→",
                    progress.toFixed(2) + "%"
                )

            })

        }
    }
}