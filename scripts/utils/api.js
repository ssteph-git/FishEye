function getAPIData(callback) {//Récupération des données du JSON
    fetch("./../data/photographers.json")
        .then(reponse => reponse.json())
        .catch(error => { alert('une erreur est survenue dans le chargement des données des photographes!!') })
        .then(callback)
        .catch(error => { alert('une erreur est survenue dans le chargement des données des photographes!!') })

}