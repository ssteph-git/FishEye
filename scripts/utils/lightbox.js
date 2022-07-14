function closeLightbox() {
    //Permet d'eviter que l'utilisateur puisse ouvrir une autre image (avec la touche entré du clavier) avec le focus qui est resté sur l'image avant l'ouverture de la lightbox (idem dans la fonction: "openLightbox")
    // main = document.querySelector("#main");
    // main.style.display = "block";
    //Permet d'eviter que l'utilisateur puisse ouvrir une autre image (avec la touche entré du clavier) avec le focus qui est resté sur l'image avant l'ouverture de la lightbox (idem dans la fonction: "openLightbox")

    let modalLightbox = document.querySelector('#modal_lightbox');
    modalLightbox.remove();
    
    let whiteScreen = document.getElementById('white-screen');
    whiteScreen.style.position="initial";

    let modalLightboxNew = document.createElement('div');
    modalLightboxNew.setAttribute("id","modal_lightbox");
    whiteScreen.appendChild(modalLightboxNew);

    // firstOpen=false;

    // return false;
}