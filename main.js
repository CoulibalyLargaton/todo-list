//récupérer les éléments
const form = document.querySelector("form")
const inputTache = document.getElementById("input-tache")
const conteneurTache = document.getElementById("conteneur-taches")

//identifiant des taches
let id = 0

//toutes les taches
let taches = [

]

form.addEventListener("submit", (e) => {
    //empêcher la soumission du form
    e.preventDefault()

    if(inputTache.value == "") {
        alert("Veuillez renseigner ce champ")
    }else {

        //créer la structure d'une tache
        id++
        const nouvelleTache = {
            id: id,
            texte : inputTache.value, 
            termine : false
        }

        //ajout de la tache au tableau de toutes les taches
        taches.push(nouvelleTache)

        //sauvegarder la tache
        sauvegarderDonnees()

        //afficher la nouvelle tache
        afficherUneTache(nouvelleTache)
        

        inputTache.value = ""
    }
})

function afficherUneTache(tache) {
    const li = document.createElement("li")

    const input = document.createElement("input")
    input.type = "checkbox"
    input.id = tache.id
    input.checked = tache.termine
    input.setAttribute("name", "tache")

    const label = document.createElement("label")
    label.innerText = tache.texte
    label.setAttribute("for", tache.id)

    const button = document.createElement("button")
    button.dataset.id = tache.id
    button.innerText = "X"

    //ajout de la tache au DOM
    li.appendChild(input)
    li.appendChild(label)
    li.appendChild(button)
    conteneurTache.appendChild(li)
}

conteneurTache.addEventListener("click", (e) => {
    const baliseCible = e.target.tagName
    if(baliseCible === "INPUT") {
        // console.log("input")

        //récupérer l'id de la tache à modifier
        const idTache = e.target.getAttribute("id")
        changerEtatTache(idTache)
    }else if(baliseCible === "BUTTON") {
        console.log("X")
    }
})

function changerEtatTache(idTache) {
    //modifier la tache concernée dans le tableau
    const tachesMAJ = taches.map(tache => {
        if(tache.id === Number(idTache)) {
            tache.termine =!tache.termine
        }
        return tache
    })
    
    // console.log(tachesMAJ)
    //MAJ le tableau des taches
    taches = tachesMAJ
    sauvegarderDonnees()
}


function sauvegarderDonnees() {
    localStorage.setItem("taches", JSON.stringify(taches))
    localStorage.setItem("id", JSON.stringify(id))
}

function chargerDonnees() {
    const donneesExistes = localStorage.getItem("taches")
    if(donneesExistes) {
        taches = JSON.parse(donneesExistes)
        id = JSON.parse(localStorage.getItem("id"))
        afficherTaches(taches)
    }
}

function afficherTaches(taches) {
    taches.forEach((tache) => {
        afficherUneTache(tache)
    })
}

chargerDonnees()