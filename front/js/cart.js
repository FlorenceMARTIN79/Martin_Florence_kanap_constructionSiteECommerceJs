/*API call on 3000 port*/
function apiRecovery() {
    fetch("http://localhost:3000/api/products")
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (sofas) {

            console.table(sofas);

            //recovery of the array in the local storage
            let cartItems = JSON.parse(localStorage.getItem("cartArray"));
            
            console.table(cartItems);

            

            //création d'autant d'articles que de canapés
            /*Creation of a loop to create as many elements in the DOM as sofas*/
            for (let i = 0; i < cartItems.length; i++) {

                
                let itemId = cartItems[i].shoppedSofaId;
                let itemColor = cartItems[i].shoppedSofaColor;

                const sofasFromCart = sofas.find (elt => elt._id == cartItems[i].shoppedSofaId);
                console.log (sofasFromCart);
                let itemImg = sofasFromCart.imageUrl;
                console.log(itemColor);
                
                //Creation of an a tag in the items section
                const article = document.createElement("article");
                article.setAttribute("class", "cart__item");
                article.setAttribute("data-id", itemId);
                article.setAttribute("data-color", itemColor);
                document.getElementById('cart__items').appendChild(article);

                const articleImg = document.createElement("div");
                articleImg.setAttribute("class", "cart__item__img");
                article.appendChild(articleImg);

                const sofaImg = document.createElement("img");
                sofaImg.setAttribute("src", itemImg);
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