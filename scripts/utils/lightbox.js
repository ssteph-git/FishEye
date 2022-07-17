/* eslint-disable no-unused-vars */

function closeLightbox () {
  // Suppréssion de la Lightbox
  const modalLightbox = document.querySelector('#modal_lightbox')
  modalLightbox.remove()

  // Retrait du fond blanc de la lightbox que l'on quitte
  const whiteScreen = document.getElementById('white-screen')
  whiteScreen.style.position = 'initial'

  // Réaffectation d'une Lightbox: si l'utilisateur veut en ouvrir une autre
  const modalLightboxNew = document.createElement('div')
  modalLightboxNew.setAttribute('id', 'modal_lightbox')
  whiteScreen.appendChild(modalLightboxNew)
}
