function closeLightbox() {
    let modalLightbox = document.querySelector('#modal_lightbox');
    modalLightbox.remove();
    
    let whiteScreen = document.getElementById('white-screen');
    whiteScreen.style.position="initial";

    let modalLightboxNew = document.createElement('div');
    modalLightboxNew.setAttribute("id","modal_lightbox");
    whiteScreen.appendChild(modalLightboxNew);

    // return false;
}