//récupérer les éléments
const form = document.querySelector("form")
const inputTache = document.getElementById("input-tache")
const conteneurTache = document.getElementById("conteneur-taches")

//identifiant des taches
let id = 0

/**
 * @typedef tache
 * @property {number} id identifiant de la tache
 * @property {string} texte description de la tache
 * @property {boolean} termine tache accompli ou non
 */

//toutes les taches
/**
 * @type {Array<tache>}
 */
let taches = []

form.addEventListener("submit", (e) => {
	//empêcher la soumission du form
	e.preventDefault()

	if (inputTache.value == "") {
		alert("Veuillez renseigner ce champ")
	} else {
		//créer la structure d'une tache
		id++
		/**
         * @type {tache}
         */
		const nouvelleTache = {
			id: id,
			texte: inputTache.value,
			termine: false,
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

/**
 * crée la structure nécessaire pour afficher correctement une tache
 *
 * @param {tache} tache
 */
function afficherUneTache(tache) {
	const li = document.createElement("li")

	const input = document.createElement("input")
	input.type = "checkbox"
	input.id = tache.id
	input.checked = tache.termine
	input.setAttribute("name", "tache")

	const label = document.createElement("label")
	label.innerText = tache.texte
	label.setAttribute("contenteditable", "true")

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
	if (baliseCible === "INPUT") {
		// console.log("input")

		//récupérer l'id de la tache à modifier
		const idTache = e.target.getAttribute("id")
		changerEtatTache(idTache)
	} else if (baliseCible === "BUTTON") {
		console.log("X")
		//récupérer l'id de la tache à supprimer
		const idTache = e.target.getAttribute("data-id")
		supprimerTache(idTache)
	} else if (baliseCible === "LABEL") {
		//récupérer l'id de la tache à éditer
		const idTache = e.target.previousSibling.id
		// console.log(e.target)
		editerUneTache(e.target, idTache)
	}
})

/**
 * modife l'etat d'une tache au niveau du tableau des taches
 * @param {number} idTache identifiant de la tache
 */
function changerEtatTache(idTache) {
	//modifier la tache concernée dans le tableau
	const tachesMAJ = taches.map((tache) => {
		if (tache.id === Number(idTache)) {
			tache.termine = !tache.termine
		}
		return tache
	})

	// console.log(tachesMAJ)
	//MAJ le tableau des taches
	taches = tachesMAJ
	sauvegarderDonnees()
}

/**
 * modifie le texte d'une tache déjà enregistré
 *
 * @param {Element} label description de la tache
 * @param {number} idTache identifiant de la tache
 */
function editerUneTache(label, idTache) {
	// console.log(label, idTache)
	label.addEventListener("input", () => {
		// console.log("changement")
		// récupérer le contenu du label
		const contenuLabel = label.innerText

		//modifier le texte de la tache concernée dans le tableau
		const tachesMAJ = taches.map((tache) => {
			if (tache.id === Number(idTache)) {
				tache.texte = contenuLabel
			}
			return tache
		})

		//MAJ le tableau des taches
		taches = tachesMAJ
		sauvegarderDonnees()
	})
}

/**
 * supprime une tache en fonction de son id
 * @param {number} idTache identifiant de la tache
 */
function supprimerTache(idTache) {
	//supprimer la tache concernée dans le tableau
	const tachesMAJ = taches.filter((tache) => tache.id !== Number(idTache))
	//MAJ le tableau des taches
	// console.log(tachesMAJ)
	taches = tachesMAJ
	sauvegarderDonnees()

	//retirer la tache du DOM
	const tacheASupp = document.getElementById(idTache)
	tacheASupp.parentElement.remove(tacheASupp)
}

/**
 * sauvegarde en mémoire toutes les taches éditées ainsi que l'id de la dernière tache
 */
function sauvegarderDonnees() {
	localStorage.setItem("taches", JSON.stringify(taches))
	localStorage.setItem("id", JSON.stringify(id))
}

/**
 * récupére le tableau des taches ainsi que l'id de la dernière tache en mémoire
 */
function chargerDonnees() {
	const donneesExistes = localStorage.getItem("taches")
	if (donneesExistes) {
		taches = JSON.parse(donneesExistes)
		id = JSON.parse(localStorage.getItem("id"))
		afficherTaches(taches)
	}
}

/**
 * affiche toutes les taches
 * @param {Array<tache>} taches
 */
function afficherTaches(taches) {
	taches.forEach((tache) => {
		afficherUneTache(tache)
	})
}

chargerDonnees()
