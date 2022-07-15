function closeLightbox() {

    //Suppréssion de la Lightbox
    let modalLightbox = document.querySelector('#modal_lightbox');
    modalLightbox.remove();

    //Retrait du fond blanc de la lightbox que l'on quitte
    let whiteScreen = document.getElementById('white-screen');
    whiteScreen.style.position = "initial";

    //Réaffectation d'une Lightbox: si l'utilisateur veut en ouvrir une autre
    let modalLightboxNew = document.createElement('div');
    modalLightboxNew.setAttribute("id", "modal_lightbox");
    whiteScreen.appendChild(modalLightboxNew);

}