//Mettre le code JavaScript lié à la page photographer.html
const form =document.getElementById('form');
form.addEventListener('submit',function(e){
    e.preventDefault();
    alert('succes')
})
async function getData() {

    //Récupération d' l'id du photographe----------------------------
    let url = document.location.href; 
    let indexPhotograf = url.indexOf('?id=');
    let idphotograph = url.slice(indexPhotograf+4);
    //Récupération d' l'id du photographe----------------------------

    // Penser à remplacer par les données récupérées dans le json
    let photo = [];
    let media = [];
    fetch("./../data/photographers.json")
    .then(reponse => reponse.json())

    .then(data => {
        photo = data.photographers;
        

        //Récupération des données du photograqphe en question---------------
       let photoTrouvé = photo.find(element => element.id == idphotograph);
       console.log(photoTrouvé);
       const { name, city, country, tagline, portrait} = photoTrouvé;
       //Récupération des données du photograqphe en question---------------

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



       //Récupération des données multimédias du photograph en question--------------------------------
        media = data.media;

        let mediaPhgraph = media.filter(media => media.photographerId == idphotograph);
        console.log(mediaPhgraph);
        //Récupération des données multimédias du photograph en question--------------------------------

    });
    return ({photographers: [...photo]});
}

async function initData() {
    // Récupère les datas des photographes
    let { myData } = await getData();
};

initData();
