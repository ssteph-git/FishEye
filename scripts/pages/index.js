    async function getPhotographers() {
        //Récupération des données du JSON
        let photograph = [];
        let media = [];
        // fetch("./../data/photographers.json")
        // .then(reponse => reponse.json())
        // .then(data => {
            
        //     photograph = data.photographers;
        //     media = data.media;

        //     displayData(photograph);
        // });
        getAPIData(data => {
            
                photograph = data.photographers;
                media = data.media;
    
                displayData(photograph);
            })
        //Transmission des données des photographes
        return ({photographers: [...photograph]});
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();

    };
    
    init();
    