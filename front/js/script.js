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
        }

//Functions creating the DOM elements needed for the index page
        function creationDomAIndex () {
            //Creation of an a tag in the items section
            let card = document.createElement("a");
            document.getElementById("items").appendChild(card);
            card.setAttribute("href", "TO BE DETERMINED")
        }
        
        function creationDomArticleIndex () {
            //Creation of an article in the card
            const cardArticle = document.createElement("article");
            document.querySelector("section > a").appendChild(cardArticle);
        }

        function creationDomImgIndex () {
            //Creation of an img in the card
            const cardImg = document.createElement("img");
            document.querySelector("a > article").appendChild(cardImg);
            cardImg.setAttribute("src", kanapImg);
            cardImg.setAttribute("alt", "photo of the sofa")
        }

        function creationDomNameIndex () {
            //Creation of a h3 in the card
            const cardTitle = document.createElement("h3");
            cardTitle.innerHTML = kanapName;
            document.querySelector("a > article").appendChild(cardTitle);
            cardTitle.setAttribute("class", kanapName);
            cardTitle.setAttribute("id", "Nom");
        }

        function creationDomDescriptionIndex () {
             //Creation of p in the card
             const cardDescription = document.createElement("p");
             cardDescription.innerHTML = kanapDescription;
             document.querySelector("a > article").appendChild(cardDescription);
             cardDescription.setAttribute("class", "productDescription");
             cardDescription.setAttribute("id", "description");
        }

        //Loop creating as many DOM elements as sofas
        for (let i = 0; i < sofas.length; i++) {
            creationDomAIndex (i);
        }

        for (let i = 0; i < sofas.length; i++) {
            creationDomArticleIndex (i);
        }

    })
    //Error message when the API has not been reached 
    .catch(function (err) {
        console.log("erreur connexion API");
    });

