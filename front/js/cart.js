//creation of js elements corresponding to html elements
//let modifyQuantity = document.querySelector(".itemQuantity");

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

            console.table("contenu du local storage",cartItems);

            if (cartItems == null) {
                console.log("cartItems n'existe pas");

            } else {
                
                cartItems.sort(function(x, y){
                    let a = x.shoppedSofaId.toUpperCase(),
                        b = y.shoppedSofaId.toUpperCase();
                    return a == b ? 0 : a > b ? 1 : -1;
                });               
                
                let cartQuantities = [];
                let sumItems = 0;

                //création d'autant d'articles que de canapés
                /*Creation of a loop to create as many elements in the DOM as sofas*/
                for (let i = 0; i < cartItems.length; i++) {


                    let itemId = cartItems[i].shoppedSofaId;
                    let itemColor = cartItems[i].shoppedSofaColor;
                    let itemQuantity = cartItems[i].shoppedSofaQuantity;

                    const itemsFromCart = sofas.find(elt => elt._id == cartItems[i].shoppedSofaId);
                    let itemsImg = itemsFromCart.imageUrl;
                    let itemsName = itemsFromCart.name;
                    let itemsPrice = itemsFromCart.price;

                    cartQuantities.push(cartItems[i].shoppedSofaQuantity);


                    //Creation of the elements DOM
                    const cartItem = document.createElement("article");
                    cartItem.setAttribute("class", "cart__item");
                    cartItem.setAttribute("data-id", itemId);
                    cartItem.setAttribute("data-color", itemColor);
                    document.getElementById('cart__items').appendChild(cartItem);

                    const cartItemImg = document.createElement("div");
                    cartItemImg.setAttribute("class", "cart__item__img");
                    cartItem.appendChild(cartItemImg);

                    const itemImg = document.createElement("img");
                    itemImg.setAttribute("src", itemsImg);
                    itemImg.setAttribute("alt", "Photographie d'un canapé");
                    cartItemImg.appendChild(itemImg);


                    const cartItemContent = document.createElement("div");
                    cartItemContent.setAttribute("class", "cart__item__content");
                    cartItem.appendChild(cartItemContent);

                    const cartItemContentDescription = document.createElement("div");
                    cartItemContentDescription.setAttribute("class", "cart__item__content__description");
                    cartItemContent.appendChild(cartItemContentDescription);

                    const itemName = document.createElement("h2");
                    itemName.textContent = itemsName;
                    cartItemContentDescription.appendChild(itemName);

                    const itemColorPTag = document.createElement("p");
                    itemColorPTag.textContent = itemColor;
                    cartItemContentDescription.appendChild(itemColorPTag);

                    const itemPricePTag = document.createElement("p");
                    itemPricePTag.textContent = itemsPrice + " €";
                    cartItemContentDescription.appendChild(itemPricePTag);

                    const cartItemContentSettings = document.createElement("div");
                    cartItemContentSettings.setAttribute("class", "cart__item__content__settings");
                    cartItemContent.appendChild(cartItemContentSettings);

                    const cartItemContentSettingsQuantity = document.createElement("div");
                    cartItemContentSettingsQuantity.setAttribute("class", "cart__item__content__settings__quantity");
                    cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

                    const itemQuantityPTag = document.createElement("p");
                    itemQuantityPTag.textContent = "Qté : " + itemQuantity;
                    cartItemContentSettingsQuantity.appendChild(itemQuantityPTag);

                    const quantityInput = document.createElement("input");
                    quantityInput.setAttribute("type", "number");
                    quantityInput.setAttribute("class", "itemQuantity");
                    quantityInput.setAttribute("name", "itemQuantity");
                    quantityInput.setAttribute("min", "1");
                    quantityInput.setAttribute("max", "100");
                    quantityInput.setAttribute("value", itemQuantity);
                    cartItemContentSettingsQuantity.appendChild(quantityInput);

                    const cartItemContentSettingsDelete = document.createElement("div");
                    cartItemContentSettingsDelete.setAttribute("class", "cart__item,,content_settings__delete");
                    cartItemContentSettingsQuantity.appendChild(cartItemContentSettingsDelete);

                    const deletePTag = document.createElement("p");
                    deletePTag.setAttribute("class", "deleteItem");
                    deletePTag.textContent = "Supprimer";
                    cartItemContentSettingsDelete.appendChild(deletePTag);

                    let sofaArticle = document.querySelectorAll(".cart__item");
                    let itemModifyQuantity = document.querySelectorAll(".itemQuantity");
                    console.log(Number(itemModifyQuantity.value));
                    /*modifyQuantity.addEventListener("click", function () {

                } */   
                    

                }

                console.log(cartItems);


                

                for (let j = 0; j < cartQuantities.length; j++) {
                    cartQuantities
                    sumItems += cartQuantities[j];
                }

                document.getElementById('totalQuantity').textContent = sumItems;
            }
        })
        //Error message when the API has not been reached 
        .catch(function (err) {
            console.log("erreur connexion API");
            alert("Votre page web n'a pas pu charger correctement, merci de vérifier votre connexion et de réessayer plus tard");
        });
}

apiRecovery();