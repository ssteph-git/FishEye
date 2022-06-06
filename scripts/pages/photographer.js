//Mettre le code JavaScript lié à la page photographer.html

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
       //Récupération des données du photograqphe en question---------------

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
