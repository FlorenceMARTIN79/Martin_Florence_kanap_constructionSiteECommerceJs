/*API call on 3000 port*/
function apiRecovery() {
    fetch("http://localhost:3000/api/products")
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (cartArray) {

            let shoppedSofas = JSON.parse(localStorage.getItem("cartArray"));
            
            console.table(shoppedSofas);

            //création d'autant d'articles que de canapés
            /*Creation of a loop to create as many elements in the DOM as sofas*/
            for (let i = 0; i < shoppedSofas.length; i++) {
                let kanapId = shoppedSofas[i].shoppedSofaId;
                let kanapColor = shoppedSofas[i].shoppedSofaColor;
                let kanapImg = shoppedSofas[i].imageUrl;
                
                //Creation of an a tag in the items section
                const article = document.createElement("article");
                article.setAttribute("class", "cart__item");
                article.setAttribute("data-id", kanapId);
                article.setAttribute("data-color", kanapColor);
                document.getElementById('cart__items').appendChild(article);

                const articleImg = document.createElement("div");
                articleImg.setAttribute("class", "cart__item__img");
                article.appendChild(articleImg);

                const sofaImg = document.createElement("img");
                sofaImg.setAttribute("src", kanapImg);
                articleImg.appendChild(sofaImg);
            }
            



        })
        //Error message when the API has not been reached 
        .catch(function (err) {
            console.log("erreur connexion API");
            alert("Votre page web n'a pas pu charger correctement, merci de vérifier votre connexion et de réessayer plus tard");
        });
}

apiRecovery();