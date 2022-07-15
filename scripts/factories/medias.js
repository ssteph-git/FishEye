let likesGlobal;


function mediaFactory(name, data, index, openLightbox) {//Permet l'affichage des medias d'un photographe: sur la page du photographe et le lancement de ces derniers dans la lightbox

    let { title, image, video, likes } = data;
    //Positionnement sur la balise: all_medias
    let divMedias = document.querySelector(".all_medias");
    let div, imgdiv, divDetails, divName, divLike, pName, pLike, iLike;
    let multimedia = "";

    //---------------------Affiche la Card d'un media d'un photographe en question--------------------------------
    function getMediaCardDOM() {

        //Création des div contenants tout les médias
        div = document.createElement('div');
        div.setAttribute("class", "My_medias");
        divMedias.appendChild(div);

        //Lancement de la lightbox: à partir du clavier ou de la souris-----------------------------------------------------
        function initLightbox(eventClick, enventKeydown) {
            switch (eventClick) {

                case "click":
                    let whiteScreen = document.getElementById('white-screen');
                    whiteScreen.style.position = "fixed";
                    openLightbox(index); break;

                case "keydown":
                    if ((enventKeydown.key == "Enter") & (open == false)) {
                        let whiteScreen = document.getElementById('white-screen');
                        whiteScreen.style.position = "fixed";
                        openLightbox(index); break;
                    }
            }
        }
        //Lancement de la lightbox: à partir du clavier ou de la souris-----------------------------------------------------

        //Si nous trouvons des medias videos
        if (image === undefined) {
            multimedia = `assets/media/${name}/${video}`;
            video = document.createElement('video');
            video.setAttribute("src", multimedia);
            video.setAttribute("controls", "");
            video.setAttribute("tabindex", 0);
            video.setAttribute("alt", title);
            video.setAttribute("role", "button");
            video.setAttribute("aria-label", "Ouvrir video en plein écran");
            div.appendChild(video);

            video.addEventListener('click', () => {//Ouverture de la lightbox à la souris
                initLightbox('click', null);
            })
            video.addEventListener('keydown', function (event) {//Ouverture de la lightbox au clavier
                initLightbox('keydown', event);
            })

        }
        else {
            //Si nous trouvons des medias photos
            multimedia = `assets/media/${name}/${image}`;
            imgdiv = document.createElement('img');
            imgdiv.setAttribute("src", multimedia);
            imgdiv.setAttribute("tabindex", 0);
            imgdiv.setAttribute('alt', title);
            imgdiv.setAttribute('role', "button");
            imgdiv.setAttribute("aria-label", "Ouvrir photo en plein écran");
            div.appendChild(imgdiv);

            imgdiv.addEventListener('click', () => {//Ouverture de la lightbox au clic de la souris
                initLightbox('click', null);
            })

            imgdiv.addEventListener('keydown', function (event) {//Ouverture de la lightbox au clavier
                initLightbox('keydown', event);
            })

        }

        divDetails = document.createElement('div');
        divDetails.setAttribute("class", "details");
        div.appendChild(divDetails);

        divName = document.createElement('div');
        divName.setAttribute("class", "namePhoto");
        divDetails.appendChild(divName);

        pName = document.createElement('p');
        pName.textContent = title;
        divName.appendChild(pName);

        divLike = document.createElement('div');
        divLike.setAttribute("class", "mylike");
        divDetails.appendChild(divLike);

        pLike = document.createElement('p');
        pLike.textContent = likes;
        divLike.appendChild(pLike);

        iLike = document.createElement('i');
        iLike.setAttribute("class", "fa-solid fa-heart");
        iLike.setAttribute("tabindex", 0);
        iLike.setAttribute("role", "button");
        iLike.setAttribute("aria-label", "Likes")
        divLike.appendChild(iLike);
        iLike.addEventListener('click', () => {
        pLike.textContent = likes + 1;
        getLikesCount();//modification du total des likes en temps réel: si on en ajoute "un" de plus pour un média
        })

        iLike.addEventListener('keydown', function (event) {//Ajout de +1 au compteur de like de la photo
            if (event.key == "Enter") {
                pLike.textContent = likes + 1;
                getLikesCount();//modification du total des likes en temps réel: si on en ajoute "un" de plus pour un média
            }
        })

        return (div);
    }
    // return { name, picture, getUserCardDOM }
    return { getMediaCardDOM }
}
