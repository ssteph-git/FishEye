let likesGlobal;

function mediaFactory(name, data,index,openLightbox) {

    let { title, image, video, likes } = data;

    //Positionnement sur la balise: all_medias
    let divMedias = document.querySelector(".all_medias");
    
    let div, imgdiv, divDetails, divName, divLike, pName, pLike, iLike;

    let multimedia = "";

    //---------------------Récupération des données multimédias du photograph en question--------------------------------
    function getMediaCardDOM() {

        //Création des div contenants tout les médias
        div = document.createElement('div');
        // div.setAttribute("tabindex",0);
        div.setAttribute("class","My_medias");
        divMedias.appendChild(div);
 
    
        //Si nous trouvons des medias videos
         if(image === undefined)
         {
             multimedia = `assets/media/${name}/${video}`;
             video = document.createElement('video');
             video.setAttribute("src", multimedia);
             video.setAttribute("controls","");
             video.setAttribute("tabindex",0);
              div.appendChild(video);

              video.addEventListener('click',()=>{//Ouverture de la lightbox à la souris
                let whiteScreen = document.getElementById('white-screen');
                whiteScreen.style.position="fixed";
                openLightbox(index);
                // video.blur();//Permet d'enlever le focus à l'image, pour que l'on ne puisse pas dupliquer l'image de la Lightbox en appuyant sur la touche: Entré (si celle ci à le focus)
            })
            video.addEventListener('keydown',function (event) {//Ouverture de la lightbox au clavier
                if(event.key=="Enter"){
                    let whiteScreen = document.getElementById('white-screen');
                    whiteScreen.style.position="fixed";
                    openLightbox(index);
                    // video.blur();//Permet d'enlever le focus à l'image, pour que l'on ne puisse pas dupliquer l'image de la Lightbox en appuyant sur la touche: Entré (si celle ci à le focus)
                }
            })
              
         }
         else{
         //Si nous trouvons des medias photos
         multimedia = `assets/media/${name}/${image}`;
         imgdiv = document.createElement('img');
         imgdiv.setAttribute("src", multimedia);
         imgdiv.setAttribute("tabindex",0);
          div.appendChild(imgdiv);

          imgdiv.addEventListener('click',()=>{//Ouverture de la lightbox au clic de la souris
            let whiteScreen = document.getElementById('white-screen');
            whiteScreen.style.position="fixed";
            openLightbox(index);
            // imgdiv.blur();//Permet d'enlever le focus à l'image, pour que l'on ne puisse pas dupliquer l'image de la Lightbox en appuyant sur la touche: Entré (si celle si à le focus)
        })

        imgdiv.addEventListener('keydown',function (event) {//Ouverture de la lightbox au clavier
            // document.getElementById('.My_medias>img').blur();
            
            if(event.key=="Enter"){
                let whiteScreen = document.getElementById('white-screen');
                whiteScreen.style.position="fixed";
                
                openLightbox(index);
                // imgdiv.blur();//Permet d'enlever le focus à l'image, pour que l'on ne puisse pas dupliquer l'image de la Lightbox en appuyant sur la touche: Entré (si celle ci à le focus)
                
                // close=true;
                
            }
            
        })

         }

         divDetails = document.createElement('div');
         divDetails.setAttribute("class","details");
         div.appendChild(divDetails);

         divName = document.createElement('div');
         divName.setAttribute("class","namePhoto");
         divDetails.appendChild(divName);

         pName = document.createElement('p');
         pName.textContent = title;
         divName.appendChild(pName);

         divLike = document.createElement('div');
         divLike.setAttribute("class","mylike");
         divDetails.appendChild(divLike);

         pLike = document.createElement('p');
         pLike.textContent = likes;
         divLike.appendChild(pLike);

         iLike = document.createElement('i');
         iLike.setAttribute("class","fa-solid fa-heart");
         iLike.setAttribute("tabindex",0);
         divLike.appendChild(iLike);
         iLike.addEventListener('click',()=>{
             pLike.textContent = likes+1;
             getLikesCount();//modification du total des likes en temps réel: si on en ajoute "un" de plus pour un média
         })

         iLike.addEventListener('keydown',function (event) {//Ajout de +1 au compteur de like de la photo
            if(event.key=="Enter"){
                pLike.textContent = likes+1;
             getLikesCount();//modification du total des likes en temps réel: si on en ajoute "un" de plus pour un média
            }
        })

        return (div);
    }
    // return { name, picture, getUserCardDOM }
    return {getMediaCardDOM}
}
