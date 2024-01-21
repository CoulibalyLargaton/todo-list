//récupérer les éléments
const form = document.querySelector("form")
const inputTache = document.getElementById("input-tache")
const conteneurTache = document.getElementById("conteneur-taches")

//identifiant des taches
let id = 0

//toutes les taches
const taches = [

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

        //afficher la nouvelle tache
        ajouterUneTache(nouvelleTache)

        inputTache.value = ""
    }
})

function ajouterUneTache(tache) {
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
    button.innerText = "X"

    //ajout de la tache au DOM
    li.appendChild(input)
    li.appendChild(label)
    li.appendChild(button)
    conteneurTache.appendChild(li)
}
