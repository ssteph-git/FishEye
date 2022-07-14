function photographerFactory(data) {
    const { name, city, country, tagline, price, portrait, id } = data;

    //Transfert vers le lien de la page du photograph---------------
    const picture = `assets/photographers/${portrait}`;
    const link = `photographer.html?id=${id}`;
    //Transfert vers le lien de la page du photograph---------------

    function getUserCardDOM() {

        const ahref = document.createElement('a');
        ahref.setAttribute("href",link)

        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt",name);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const pPlaces = document.createElement('p');
        pPlaces.textContent = city+" "+country;
        pPlaces.setAttribute("class","Places");

        const pTag = document.createElement('p');
        pTag.textContent = tagline;
        pTag.setAttribute("class","Tagline");

        const pPrice = document.createElement('p');
        pPrice.textContent = price+"€/jour";
        pPrice.setAttribute("class","Price");

        article.appendChild(ahref);
        ahref.appendChild(img);
        ahref.appendChild(h2);

        article.appendChild(pPlaces);
        article.appendChild(pTag);
        article.appendChild(pPrice);
        
        return (article);
    }
    // return { name, picture, getUserCardDOM }
    return {getUserCardDOM}
}