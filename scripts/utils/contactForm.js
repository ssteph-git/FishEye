//Gestion de la fermeture de la modale de contact au clavier------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const modal = document.querySelector('#close');
modal.setAttribute("tabindex", 0);//on insère un index au boutton de fermeture: pour qu'il prenne le focus si besoin
modal.addEventListener('keydown', function (event) {//Fermeture de la modale au clavier si le focus, est bien placé sur la croix (en appuyant sur le boutton "entré" ou "Echap")

    if ((event.key == "Enter") || (event.key == "Escape")) {
        closeModal();
    }

})
//Gestion de la fermeture de la modale de contact au clavier------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Ouverture de la modale de contact------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function displayModal() {

    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    document.getElementById("first").focus();//On met le focus, sur le premier element de la modale, une fois qu'elle s'ouvre
}
//Ouverture de la modale de contact------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Fermeture de la modale de contact------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
//Fermeture de la modale de contact------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Validation du formulaire de la modale de contact------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function submitModalContact() {
    const form = document.getElementById('form');
    form.addEventListener('submit', function (e) {
        
        e.preventDefault();//N'envoie pas les données du formulaire
        console.log("Prénom: " + form.first.value);
        console.log("Nom: " + form.last.value);
        console.log("Email: " + form.email.value);
        console.log("Message: " + form.message.value);
        closeModal();
    })
}
//Validation du formulaire de la modale de contact------------------------------------------------------------------------------------------------------------------------------------------------------------------------
