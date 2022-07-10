//Mettre le code JavaScript lié à la page photographer.html
const form =document.getElementById('form');
form.addEventListener('submit',function(e){
    e.preventDefault();
    alert('succes')
})

let mediaPhgraph;
let nameGlobal;
let allMedia=[];
let lightboxIndex;
let open =false; 

async function getData() {

    //Récupération d' l'id du photographe----------------------------
    let url = document.location.href; 
    let indexPhotograf = url.indexOf('?id=');
    let idphotograph = url.slice(indexPhotograf+4);
    //Récupération d' l'id du photographe----------------------------

    // Penser à remplacer par les données récupérées dans le json
    let photo = [];
    let media = [];
        
    getAPIData(data => {
            
        photo = data.photographers;
        media = data.media;

        mediaPhgraph = media.filter(media => media.photographerId == idphotograph);

        allMedia=mediaPhgraph;
        //Récupération des données du photograqphe en question---------------
       let photoTrouvé = photo.find(element => element.id == idphotograph);
       let { name, city, country, tagline, portrait} = photoTrouvé;
       //Récupération des données du photograqphe en question---------------
        nameGlobal = name;

       displayDataMedia(name, mediaPhgraph);

       //**Affichage du header du photographe-----------------------------------------
       const photographerHeader = document.querySelector(".photograph-header");
       //Nom de l'artiste
       const photographerName = document.querySelector(".name");
       const h1 = document.createElement( 'h1' );
       h1.textContent = name;
       photographerName.appendChild(h1);
        //Pays + ville de l'artiste
       const pPlaces = document.createElement('p');
        pPlaces.textContent = city+" "+country;
        pPlaces.setAttribute("class","Places2");
        photographerName.appendChild(pPlaces);

        const pTag = document.createElement('p');
        pTag.textContent = tagline;
        pTag.setAttribute("class","Tagline2");
        photographerName.appendChild(pTag);

        const picture = `assets/photographers/${portrait}`;
        const photographerPhoto = document.querySelector(".photo");
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        photographerPhoto.appendChild(img);
       //**Affichage du header du photographe-----------------------------------------

       //**Modification de la modale-----------------------------------------
       const titre = document.querySelector(".titre");
        const p = document.createElement('p');
        p.textContent = name;
        titre.appendChild(p);

       //**Modification de la modale-----------------------------------------

        })

    return ({photographers: [...photo]});
}

async function initData() {
    // Récupère les datas des photographes
    let { myData } = await getData();

    let tri = document.querySelector(".select_tri");
    tri.addEventListener("change", function() {
        if(tri.value == "Popularité")
        {
            classement("likes");
        }

        if(tri.value == "Titre")
        {
            classement("titre");
        }

        if(tri.value == "Date")
        {
            classement("date");
        }
    });

};

function classement(e) {
    let allMedias, main, div2;
    switch (e) {
        
        case "likes":
            mediaPhgraph.sort((a, b) => {
            return b.likes - a.likes;  });
            break;

        case "titre":
            mediaPhgraph.sort((a, b) => {
                      return a.title.localeCompare(b.title);
                  });
            break;

        case "date":
            mediaPhgraph.sort((a, b) => {
                return a.date.localeCompare(b.date);
                  });
                console.log(mediaPhgraph);
            break;
    }
    allMedia=mediaPhgraph;

            allMedias = document.querySelector('.all_medias');
            allMedias.remove();
            main = document.querySelector("#main");

            div2 = document.createElement("p");
            div2.setAttribute("class","all_medias");
            main.appendChild(div2);
            displayDataMedia(nameGlobal,mediaPhgraph);
}


async function displayDataMedia(name, media) {
    const photographerMediaSection = document.querySelector(".all_medias");

    media.forEach((medias,index) => {
        const mediaModel = mediaFactory(name, medias,index,openLightbox);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        photographerMediaSection.appendChild(mediaCardDOM);
    });
    getLikesCount();
};
function getLikesCount(){
    let total = 0;
    const likesTags = [...document.querySelectorAll('.mylike>p')];
    likesTags.forEach(tags=>{total+=parseInt(tags.textContent)});
    console.log(total);
}
function openLightbox(index){
open = true;
    lightboxIndex=index;

const {title,video,image} = allMedia[index];

let img;
if(image === undefined)
         {
             multimedia = `assets/media/${nameGlobal}/${video}`;
             img = document.createElement('video');
             img.setAttribute("src", multimedia);
             img.setAttribute("class", 'videoLightbox');
             img.setAttribute("controls","");
         }
         else{
         //Si nous trouvons des medias photos
         img = document.createElement( 'img' );

         multimedia = `assets/media/${nameGlobal}/${image}`;
         img.setAttribute("src", multimedia);
         img.setAttribute("class", 'imgLightbox');
         }

//Création de la card de la lightbox-----------------------------------------
const mediaModal=document.getElementById('modal_lightbox');

let left = document.createElement('div');
left.setAttribute("class","left");
mediaModal.appendChild(left);

let ileft = document.createElement('i');
ileft.setAttribute("class","fa-solid fa-angle-left");
left.appendChild(ileft);

let middle = document.createElement('div');
middle.setAttribute("class","middle");
middle.appendChild(img);

let p = document.createElement('p');
p.setAttribute("class","title");
p.textContent = title; 
middle.appendChild(p);
mediaModal.appendChild(middle);

let right = document.createElement('div');
right.setAttribute("class","right");
mediaModal.appendChild(right);

iclose = document.createElement('i');
iclose.setAttribute("class","fa-solid fa-xmark");
right.appendChild(iclose);


iclose.addEventListener('click',function(){
    closeLightbox();
    open=false;
})

let iright = document.createElement('i');
iright.setAttribute("class","fa-solid fa-angle-right");
right.appendChild(iright);

ileft.addEventListener('click',function(){
    lightboxLeft();
})

iright.addEventListener('click',function(){
   lightboxRight();
})
//Création de la card de la lightbox-----------------------------------------


}

function lightboxLeft(){
    lightboxIndex--;//changement de multimédia

    if(lightboxIndex==-1){//si nous somme au premier fichier multimédia, et que nous appuyons pour voir l'image précedente: nous retournons au premier fichier multimedia
        lightboxIndex=allMedia.length-1;
    }

    let modalLightbox = document.querySelector('#modal_lightbox');
    modalLightbox.remove();
    let whiteScreen = document.getElementById('white-screen');
    whiteScreen.style.position="fixed";

    let modalLightboxNew = document.createElement('div');
    modalLightboxNew.setAttribute("id","modal_lightbox");
    whiteScreen.appendChild(modalLightboxNew);
    openLightbox(lightboxIndex);
}

function lightboxRight(){
    lightboxIndex++;//changement de multimédia

    if(lightboxIndex==allMedia.length){//si nous somme au dernier fichier multimédia, et que nous appuyons pour voir l'image suivante: nous retournons au premier fichier multimedia
        lightboxIndex=0;
    }

    let modalLightbox = document.querySelector('#modal_lightbox');
    modalLightbox.remove();
    let whiteScreen = document.getElementById('white-screen');
    whiteScreen.style.position="fixed";

    let modalLightboxNew = document.createElement('div');
    modalLightboxNew.setAttribute("id","modal_lightbox");
    whiteScreen.appendChild(modalLightboxNew);
    openLightbox(lightboxIndex);
}

window.addEventListener("keydown", function (event) {
    if ((event.key=="Escape") & (open==true)) {
        // if (event.key =="Escape") {
    //   alert("L'utilisateur a appuyé sur la touche " + event.key);
    closeLightbox();
    open=false;
    }

    if((event.key=="ArrowLeft") & (open==true)) {
        lightboxLeft();
        console.log('ok');
    }

    if((event.key=="ArrowRight") & (open==true)) {
        lightboxRight();
    }


    // if (event.key) {
    //     alert("L'utilisateur a appuyé sur la touche " + event.key);
    // }

  });

initData();


