/* global getAPIData, photographerFactory */
/* eslint no-undef: "error" */
/* eslint-disable no-unused-vars */

async function getPhotographers () {
  let photograph = []
  getAPIData(data => {
    photograph = data.photographers
    // const media = data.media
    displayData(photograph)
  })
  // Transmission des données des photographes
  return ({ photographers: [...photograph] })
}

async function displayData (photographers) {
  const photographersSection = document.querySelector('.photographer_section')

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
};

async function init () {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers()
};

init()
