function photographerFactory(data) {
    const { name, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
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

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pPlaces);
        article.appendChild(pTag);
        article.appendChild(pPrice);
        
        return (article);
    }
    return {getUserCardDOM}
}