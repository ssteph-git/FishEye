/* global getAPIData,closeLightbox,mediaFactory,submitModalContact */
/* eslint no-undef: "error" */
/* eslint-disable no-unused-vars */

let mediaPhotograph// Tous les medias du photographe (apèrs avoir effectué un filtre, à partir de son identifiant, et de toutes les données du fichier JSON)
let nameGlobal// Nom du photographe: util pour créer l'adresse des medias du photographes, et de les afficher: pour les card medias: et la lightbox
let allMediaLightbox = []// Tableau des medias du photographe: pour la lightbox
let lightboxIndex// Index des medias, dans le tableau "allMediaLightbox"
let open = false// Permet de savoir si la lightbox est lancé: et ainsi: activer ou désactiver: les commandes du clavier
let priceGlobal// Prix de prestation du photographe (pour le bas de page)

async function getData () { // Récupère les datas d'un photographe en question
  // Récupération d' l'id du photographe----------------------------
  const url = document.location.href
  const indexPhotograf = url.indexOf('?id=')
  const idphotograph = url.slice(indexPhotograf + 4)
  // Récupération d' l'id du photographe----------------------------

  let photo = []
  let media = []

  getAPIData(data => { // Récupération des données du fichier JSON
    photo = data.photographers// données d'identités des photographes
    media = data.media// données: medias des photographes (le travail qu'il ont fait)

    // Récupération des medias du photograqphe en question---------------
    // eslint-disable-next-line eqeqeq
    mediaPhotograph = media.filter(media => media.photographerId == idphotograph)

    allMediaLightbox = mediaPhotograph
    // Récupération des données du photograqphe en question---------------
    // eslint-disable-next-line eqeqeq
    const photoTrouvé = photo.find(element => element.id == idphotograph)
    const { name, city, country, tagline, portrait, price } = photoTrouvé
    // Récupération des données du photograqphe en question---------------

    nameGlobal = name
    priceGlobal = price

    displayDataMedia(name, mediaPhotograph)

    //* *Affichage du header du photographe-----------------------------------------
    // const photographerHeader = document.querySelector(".photograph-header");

    // Nom de l'artiste
    const photographerName = document.querySelector('.name')
    const h1 = document.createElement('h1')
    h1.textContent = name
    photographerName.appendChild(h1)

    // Pays + ville de l'artiste
    const pPlaces = document.createElement('p')
    pPlaces.textContent = city + ' ' + country
    pPlaces.setAttribute('class', 'Places2')
    photographerName.appendChild(pPlaces)

    // Phrase d'accroche de l'artiste
    const pTag = document.createElement('p')
    pTag.textContent = tagline
    pTag.setAttribute('class', 'Tagline2')
    photographerName.appendChild(pTag)

    // Photo portrait de l'artiste
    const picture = `assets/photographers/${portrait}`
    const photographerPhoto = document.querySelector('.photo')
    const img = document.createElement('img')
    img.setAttribute('src', picture)
    img.setAttribute('alt', name)
    photographerPhoto.appendChild(img)
    //* *Affichage du header du photographe-----------------------------------------

    //* *Modification de la modale-----------------------------------------
    const titre = document.querySelector('.titre')
    titre.textContent = titre.textContent + ' ' + name
    //* *Modification de la modale-----------------------------------------
  })

  return ({ photographers: [...photo] })
}

async function initData () { // Récupère les datas des photographes
  const { myData } = await getData()
};

function classement (e) { // Tri des medias lorsque l'on clic sur son menu, et que l'on choisis une option entre: le tire, la date, et la popularité
  switch (e) {
    case 'likes':
      mediaPhotograph.sort((a, b) => {
        return b.likes - a.likes
      })
      break

    case 'titre':
      mediaPhotograph.sort((a, b) => {
        return a.title.localeCompare(b.title)
      })
      break

    case 'date':
      mediaPhotograph.sort((a, b) => {
        return a.date.localeCompare(b.date)
      })
      break
  }
  allMediaLightbox = mediaPhotograph// Les données pour la lightbox: sont aussi triés

  const allMedias = document.querySelector('.all_medias')
  allMedias.remove()// Suppression des medias affiché: pour les ré-afficher: une fois trié
  const main = document.querySelector('#main')

  const div2 = document.createElement('p')
  div2.setAttribute('class', 'all_medias')
  main.appendChild(div2)
  displayDataMedia(nameGlobal, mediaPhotograph)// Affichage des medias: en fonction du tri effectué
}

async function displayDataMedia (name, medias) { // Affichage des données medias de chaque potographe, en fonction: de son nom, et de ses medias qui lui sont attribués
  const photographerMediaSection = document.querySelector('.all_medias')

  medias.forEach((media, index) => {
    const mediaModel = mediaFactory(name, media, index, openLightbox)
    const mediaCardDOM = mediaModel.getMediaCardDOM()
    photographerMediaSection.appendChild(mediaCardDOM)
  })
  getLikesCount()
}

function getLikesCount () { // Permet de compter: tous les likes des medias, de la page d'un photographe + l'afficher en bas de page
  const divTotalLikeP = document.querySelector('.total-like-p')
  let total = 0
  const likesTags = [...document.querySelectorAll('.mylike>p')]
  likesTags.forEach(tags => { total += parseInt(tags.textContent) })
  divTotalLikeP.textContent = total // affichage des likes total
  const pArgentDuJour = document.querySelector('.total-argent-p')
  pArgentDuJour.textContent = priceGlobal + '€ / jour'
}

function openLightbox (index) { // Permet d'ouvrir la lightbox par rapport à l'image que l'on choisis pour la lancer
  open = true// permet de savoir si la lightbox est lancée: pour la gestion des touches au clavier
  lightboxIndex = index// position de l'image dans le tableau "allMediaLightbox": pour afficher le bon media dans la lightbox: lorsque l'on click sur l'image précédente ou suivante

  const { title, video, image } = allMediaLightbox[index]

  let img, multimedia
  if (image === undefined) { // Si nous avons, des medias videos
    multimedia = `assets/media/${nameGlobal}/${video}`
    img = document.createElement('video')
    img.setAttribute('src', multimedia)
    img.setAttribute('class', 'videoLightbox')
    img.setAttribute('controls', '')
    img.setAttribute('id', 'videoId')
  } else {
    // Si nous trouvons des medias photos
    img = document.createElement('img')

    multimedia = `assets/media/${nameGlobal}/${image}`
    img.setAttribute('src', multimedia)
    img.setAttribute('class', 'imgLightbox')
    img.setAttribute('alt', title)
  }

  // Création de la card de la lightbox-----------------------------------------
  const mediaModal = document.getElementById('modal_lightbox')
  mediaModal.setAttribute('aria-label', 'image closeup view')

  const left = document.createElement('div')
  left.setAttribute('class', 'left')
  mediaModal.appendChild(left)

  const ileft = document.createElement('i')
  ileft.setAttribute('class', 'fa-solid fa-angle-left')
  ileft.setAttribute('role', 'button')
  ileft.setAttribute('aria-label', 'image ou vidéo précédente')
  ileft.setAttribute('alt', 'Previous image')
  left.appendChild(ileft)

  const middle = document.createElement('div')
  middle.setAttribute('class', 'middle')
  middle.appendChild(img)

  const p = document.createElement('p')
  p.setAttribute('class', 'title')
  p.textContent = title
  middle.appendChild(p)
  mediaModal.appendChild(middle)

  const right = document.createElement('div')
  right.setAttribute('class', 'right')
  mediaModal.appendChild(right)

  const iclose = document.createElement('i')
  iclose.setAttribute('class', 'fa-solid fa-xmark')
  iclose.setAttribute('role', 'button')
  iclose.setAttribute('aria-label', 'Fermer la fenêtre')
  iclose.setAttribute('alt', 'Close dialog')
  right.appendChild(iclose)

  iclose.addEventListener('click', function () {
    closeLightbox()
    open = false
  })

  const iright = document.createElement('i')
  iright.setAttribute('class', 'fa-solid fa-angle-right')
  iright.setAttribute('role', 'button')
  iright.setAttribute('aria-label', 'image ou video suivante')
  iright.setAttribute('alt', 'Next image')
  right.appendChild(iright)

  ileft.addEventListener('click', function () {
    lightboxLeft()
  })

  iright.addEventListener('click', function () {
    lightboxRight()
  })

  if (image === undefined) { // Permet de mettre le focus sur la video de la lightbox: pour pouvoir la lancer si l'utilisateur veut utilisateur son clavier pour faire cette action
    document.getElementById('videoId').focus()
  }
  // Création de la card de la lightbox-----------------------------------------
}

function lightboxLeft () { // Permet d'afficher l'image précédente de la lightbox: une fois que l'on clic ou appuie sur le boutton correspondant (souris et clavier)
  lightboxIndex--// changement de multimédia

  if (lightboxIndex === -1) { // si nous somme au premier fichier multimédia, et que nous appuyons pour voir l'image précedente: nous retournons au premier fichier multimedia
    lightboxIndex = allMediaLightbox.length - 1
  }

  const modalLightbox = document.querySelector('#modal_lightbox')
  modalLightbox.remove()
  const whiteScreen = document.getElementById('white-screen')
  whiteScreen.style.position = 'fixed'

  const modalLightboxNew = document.createElement('div')
  modalLightboxNew.setAttribute('id', 'modal_lightbox')
  whiteScreen.appendChild(modalLightboxNew)
  openLightbox(lightboxIndex)
}

function lightboxRight () { // Permet d'afficher l'image suivante de la lightbox: une fois que l'on clic ou appuie sur le boutton correspondant (souris et clavier)
  lightboxIndex++// changement de multimédia

  if (lightboxIndex === allMediaLightbox.length) { // si nous somme au dernier fichier multimédia, et que nous appuyons pour voir l'image suivante: nous retournons au premier fichier multimedia
    lightboxIndex = 0
  }

  const modalLightbox = document.querySelector('#modal_lightbox')
  modalLightbox.remove()
  const whiteScreen = document.getElementById('white-screen')
  whiteScreen.style.position = 'fixed'

  const modalLightboxNew = document.createElement('div')
  modalLightboxNew.setAttribute('id', 'modal_lightbox')
  whiteScreen.appendChild(modalLightboxNew)
  openLightbox(lightboxIndex)
}

window.addEventListener('keydown', function (event) { // Gestion des touches du clavier: pour la lightbox
  if ((event.key === 'Escape') & (open === true)) {
    closeLightbox()
    open = false
  }

  if ((event.key === 'ArrowLeft') & (open === true)) {
    lightboxLeft()
  }

  if ((event.key === 'ArrowRight') & (open === true)) {
    lightboxRight()
  }
})

function menuTri () { // Gestion du menu de tri
  const selector = document.getElementById('selector')
  selector.setAttribute('tabindex', 0)
  const menu = document.getElementById('menu')

  const options = document.querySelectorAll('.option')
  menu.style.display = 'none'

  // Gestion de la div de selection du menu déroulant à la souris et au clavier-----------------------------------
  initSelector('click')
  initSelector('keydown')

  function initSelector (event) {
    selector.addEventListener(event, () => {
      selector.style.display = 'none'
      menu.style.display = 'flex'

      const option = document.getElementById('option')
      const i = document.createElement('i')
      i.setAttribute('class', 'fa-solid fa-angle-up')
      option.appendChild(i)
    })
  }
  // Gestion de la div de selection du menu déroulant à la souris et au clavier-----------------------------------

  // Gestion des options du menu déroulant, à la souris, et au clavier-----------------------------------------------------
  initMenu('click')
  initMenu('keydown')
  function initMenu (event) {
    for (const option of options) {
      option.setAttribute('tabindex', 0)

      option.addEventListener(event, (e) => {
        if ((event === 'click') || ((event === 'keydown') && (e.key === 'Enter'))) {
          if (e.target.innerText === 'Popularité') {
            classement('likes')
          }

          if (e.target.innerText === 'Titre') {
            classement('titre')
          }

          if (e.target.innerText === 'Date') {
            classement('date')
          }

          selector.style.display = 'flex'
          menu.style.display = 'none'
          if (e.target.innerText === '') { // Permet que l'on est le texte 'Popularité' à coté de la coche: si l'on click sur la coche, au lieu de cliquer le texte
            selector.innerText = 'Popularité'
          } else {
            selector.innerText = e.target.innerText
          }

          const i = document.createElement('i')
          i.setAttribute('class', 'fa-solid fa-angle-up')
          selector.appendChild(i)

          const option = document.querySelector('#option>i')
          option.remove()
        }
      })
    }
  }
  // Gestion des options du menu déroulant, à la souris, et au clavier-----------------------------------------------------
}

initData()// Activation de la récupération des datas des photographes
menuTri()// Activation de la gestion du menu de tri
submitModalContact()// Récupération des données de la modal de contact: puis affichage des données dans la console
