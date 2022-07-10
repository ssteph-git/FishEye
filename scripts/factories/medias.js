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
        div.setAttribute("class","My_medias");
        divMedias.appendChild(div);
 
        //Si nous trouvons des medias videos
         if(image === undefined)
         {
             multimedia = `assets/media/${name}/${video}`;
             video = document.createElement('video');
             video.setAttribute("src", multimedia);
             video.setAttribute("controls","");
              div.appendChild(video);

              video.addEventListener('click',()=>{
                let whiteScreen = document.getElementById('white-screen');
                whiteScreen.style.position="fixed";
    
                openLightbox(index);
    
            })
              
         }
         else{
         //Si nous trouvons des medias photos
         multimedia = `assets/media/${name}/${image}`;
         imgdiv = document.createElement('img');
         imgdiv.setAttribute("src", multimedia);
          div.appendChild(imgdiv);

          imgdiv.addEventListener('click',()=>{
            // console.log('image:'+index);

            let whiteScreen = document.getElementById('white-screen');
            whiteScreen.style.position="fixed";

            openLightbox(index);

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
         divLike.appendChild(iLike);
         iLike.addEventListener('click',()=>{
             console.log(pLike.textContent);
             pLike.textContent = likes+1;
         })
        return (div);
    }
    // return { name, picture, getUserCardDOM }
    return {getMediaCardDOM}
}
