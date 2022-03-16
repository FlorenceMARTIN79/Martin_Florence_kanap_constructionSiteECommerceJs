//Functions creating the DOM elements needed for the index page
function creationDomElementsIndex() {
    //Creation of an a tag in the items section
    const card = document.createElement("a");
    card.setAttribute("href", "TO BE DETERMINED")
    //Creation of an article in the card
    const cardArticle = document.createElement("article");
    //Creation of an img in the card
    const cardImg = document.createElement("img");
    //cardImg.setAttribute("src", kanapImg);
    cardImg.setAttribute("alt", "photo of the sofa")
    //Creation of a h3 in the card
    const cardTitle = document.createElement("h3");
    //cardTitle.setAttribute("class", kanapName);
    cardTitle.setAttribute("id", "Nom");
    //Creation of p in the card
    const cardDescription = document.createElement("p");
    cardDescription.setAttribute("class", "productDescription");
    cardDescription.setAttribute("id", "description");
    document.getElementById("items").appendChild(card);
    card.appendChild(cardArticle);
    cardArticle.appendChild(cardImg);
    cardArticle.appendChild(cardTitle);
    cardArticle.appendChild(cardDescription);
}

/*document.getElementById("items").appendChild(card);
document.querySelector("section > a").appendChild(cardArticle);
document.querySelector("a > article").appendChild(cardImg);
document.querySelector("a > article").appendChild(cardTitle);
document.querySelector("a > article").appendChild(cardDescription);*/

/*appel des éléments de l'API sur port3000*/
fetch("http://localhost:3000/api/products")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (sofas) {
        /*affichage des données récupérées de l'API en tableau*/
        console.table(sofas);
        console.log(sofas[1]);
        console.log(sofas.length);


        /*Pour chaque objet du tableau on créé une carte DOM
        Une carte contient le nom, l'image et la description de l'objet*/

        for (let i = 0; i < sofas.length; i++) {
            var kanapName = sofas[i].name;
            var kanapDescription = sofas[i].description;
            var kanapImg = sofas[i].imageUrl;
            creationDomElementsIndex (i);
            
        }




    })
    //Error message when the API has not been reached 
    .catch(function (err) {
        console.log("erreur connexion API");
    });