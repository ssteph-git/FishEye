//Mettre le code JavaScript lié à la page photographer.html
const form =document.getElementById('form');
form.addEventListener('submit',function(e){
    e.preventDefault();
    alert('succes')
})

var mediaPhgraph;
var nameGlobal;

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

        // Tri par date
        // console.log(mediaPhgraph.slice().sort((a, b) => {
        //    return  a.date - b.date;
        // }));
        // console.log(mediaPhgraph.sort((b, a) => {
        //       a.date - b.date;
        //  }));
        //       console.log(mediaPhgraph.sort((b, a) => {
        //         if (b.valueOf() < a.valueOf()) return -1;
        //         if (b.valueOf() > a.valueOf()) return 1;
        //         return 0;
        //  }));

        //Récupération des données du photograqphe en question---------------
       let photoTrouvé = photo.find(element => element.id == idphotograph);
       let { name, city, country, tagline, portrait} = photoTrouvé;
       //Récupération des données du photograqphe en question---------------
        nameGlobal = name;

       displayDataMedia(name, mediaPhgraph);
    //    .then((rep) => {
    //     console.log(`Voici le retour de la fonction: ${rep}`);
    //     let heart = document.getElementsByClassName('fa-solid');
    
    //     heart.addEventListener("click", function() { 
    //     let nb = document.getElementsByClassName('mylike');
  
    // })
    // }).catch((error)=>{
    //     console.log(`Voici l'erreur reçu: ${error}`);
    // });
    

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
    //    titre.textContent = titre.textContent +"\r\n" + name;
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
                // return Date.parse(b.date) < Date.parse(a.date);  });
                return a.date.localeCompare(b.date);
                  });
                console.log(mediaPhgraph);
            break;
    }
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
    media.forEach((medias) => {
        const mediaModel = mediaFactory(name, medias);
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
initData();


