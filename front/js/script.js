/*API call on 3000 port*/
function apiRecovery() {
    fetch("http://localhost:3000/api/products")
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (sofas) {
            /*display of the datas from the API in a table*/
            
            /*Creation of a loop to create as many elements in the DOM as sofas*/
            for (let i = 0; i < sofas.length; i++) {
                let kanapName = sofas[i].name;
                let kanapDescription = sofas[i].description;
                let kanapImg = sofas[i].imageUrl;
                //Creation of an a tag in the items section
                const card = document.createElement("a");
                card.setAttribute("href", "product.html?id=" + sofas[i]._id);
                //console.log(card);
                //Creation of an article in the card
                const cardArticle = document.createElement("article");
                //Creation of an img in the card
                const cardImg = document.createElement("img");
                cardImg.setAttribute("alt", sofas[i].altTxt);
                cardImg.setAttribute("src", kanapImg);
                //console.log(cardImg);
                //Creation of a h3 in the card
                const cardTitle = document.createElement("h3");
                //cardTitle.setAttribute("class", kanapName);
                cardTitle.setAttribute("id", sofas[i]._id);
                //console.log(cardTitle);
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
            alert("Votre page web n'a pas pu charger correctement, merci de vérifier votre connexion et de réessayer plus tard");
        });
}

apiRecovery();