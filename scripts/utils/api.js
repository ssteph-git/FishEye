/* eslint-disable no-unused-vars */

function getAPIData (callback) { // Récupération des données du JSON
  fetch('./../data/photographers.json')
    .then(reponse => reponse.json())
    .catch(() => { alert('une erreur est survenue dans le chargement des données des photographes!!') })
    .then(callback)
    .catch(() => { alert('une erreur est survenue dans le chargement des données des photographes!!') })
}
