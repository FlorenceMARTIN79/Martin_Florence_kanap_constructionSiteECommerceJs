//Functions creating the DOM elements needed for the index page
/*function creationDomElementsIndex() {
    
}*/


/*appel des éléments de l'API sur port3000*/
function apiRecovery() {
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
            console.log(sofas[1]._id);


            /*Pour chaque objet du tableau on créé une carte DOM
            Une carte contient le nom, l'image et la description de l'objet*/

            for (let i = 0; i < sofas.length; i++) {
                var kanapName = sofas[i].name;
                var kanapDescription = sofas[i].description;
                var kanapImg = sofas[i].imageUrl;
                //creationDomElementsIndex (i);
                //Creation of an a tag in the items section
                const card = document.createElement("a");
                card.setAttribute("href", "product.html");
                //Creation of an article in the card
                const cardArticle = document.createElement("article");
                //Creation of an img in the card
                const cardImg = document.createElement("img");
                //cardImg.setAttribute("src", kanapImg);
                cardImg.setAttribute("alt", sofas[i].altTxt);
                cardImg.setAttribute("src", kanapImg);
                console.log(cardImg);
                //Creation of a h3 in the card
                const cardTitle = document.createElement("h3");
                //cardTitle.setAttribute("class", kanapName);
                cardTitle.setAttribute("id", sofas[i]._id);
                console.log(cardTitle);
                cardTitle.textContent = kanapName;
                //Creation of p in the card
                const cardDescription = document.createElement("p");
                cardDescription.setAttribute("class", "productDescription");
                cardDescription.setAttribute("id", "Description" + [i]);
                cardDescription.textContent = kanapDescription;
                document.getElementById("items").appendChild(card);
                card.appendChild(cardArticle);
                cardArticle.appendChild(cardImg);
                cardArticle.appendChild(cardTitle);
                cardArticle.appendChild(cardDescription);
            }

        })
        //Error message when the API has not been reached 
        .catch(function (err) {
            console.log("erreur connexion API");
        });
}

apiRecovery();