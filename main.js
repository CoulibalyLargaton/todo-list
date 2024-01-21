//récupérer les éléments
const form = document.querySelector("form")
const inputTache = document.getElementById("input-tache")
const conteneurTache = document.getElementById("conteneur-taches")


form.addEventListener("submit", (e) => {
    //empêcher la soumission du form
    e.preventDefault()

    if(inputTache.value == "") {
        alert("Veuillez renseigner ce champ")
    }else {
        inputTache.value = ""
    }
})
