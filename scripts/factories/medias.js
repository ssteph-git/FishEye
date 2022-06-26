var likesGlobal;

function mediaFactory(name, data) {

    let { title, image, video, likes, date, price } = data;

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
             // video.setAttribute("width", "600");
             video.setAttribute("controls","");
              div.appendChild(video);
         }
         else{
         //Si nous trouvons des medias photos
         multimedia = `assets/media/${name}/${image}`;
         imgdiv = document.createElement('img');
         imgdiv.setAttribute("src", multimedia);
          div.appendChild(imgdiv);
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

         })
        return (div);
    }
    // return { name, picture, getUserCardDOM }
    return {getMediaCardDOM}
}
