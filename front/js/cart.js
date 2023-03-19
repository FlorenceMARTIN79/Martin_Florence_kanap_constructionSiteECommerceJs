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

            console.table("contenu du local storage", cartItems);

            if (cartItems == null) {
                console.log("cartItems n'existe pas");

            } else {

                cartItems.sort(function (x, y) {
                    let a = x.shoppedSofaId.toUpperCase(),
                        b = y.shoppedSofaId.toUpperCase();
                    return a == b ? 0 : a > b ? 1 : -1;
                });

                let cartQuantities = [];
                let sumItems = 0;
                let cartSubtotals = [];
                let subTotals = 0;

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

                    //Check if the quantity for each item is between 1 and 100
                    let minItemQuantity = quantityInput.value < 1;
                    let maxItemQuantity = quantityInput.value > 100;
                    if (minItemQuantity) {
                        alert("la quantité minimum pour un article est 1. La quantité de " + itemsName + " a été mise à jour en conséquence. Merci de renseigner une quantité comprise entre 1 et 100");
                        cartItems[i].shoppedSofaQuantity = 1;
                        localStorage.setItem("cartArray", JSON.stringify(cartItems));
                        location.reload();
                    } else if (maxItemQuantity) {
                        alert("la quantité maximum pour un article est 100. La quantité de " + itemsName + " a été mise à jour en conséquence. Merci de renseigner une quantité comprise entre 1 et 100");
                        cartItems[i].shoppedSofaQuantity = 100;
                        localStorage.setItem("cartArray", JSON.stringify(cartItems));
                        location.reload();
                    } else {
                        quantityInput.addEventListener("change", function () {
                            console.log([i], quantityInput.value);
                            cartItems[i].shoppedSofaQuantity = Number(quantityInput.value);
                            localStorage.setItem("cartArray", JSON.stringify(cartItems));
                            location.reload();
                        });
                    }
                    cartItemContentSettingsQuantity.appendChild(quantityInput);

                    const cartItemContentSettingsDelete = document.createElement("div");
                    cartItemContentSettingsDelete.setAttribute("class", "cart__item,,content_settings__delete");
                    cartItemContentSettingsQuantity.appendChild(cartItemContentSettingsDelete);

                    const deletePTag = document.createElement("input");
                    deletePTag.setAttribute("class", "deleteItem");
                    deletePTag.setAttribute("type", "button");
                    deletePTag.setAttribute("value", "Supprimer");
                    cartItemContentSettingsDelete.appendChild(deletePTag);

                    //deletion of a sofa when the user clicks on supprimer
                    deletePTag.addEventListener("click", function () {
                        cartItems.splice([i], 1);
                        localStorage.setItem("cartArray", JSON.stringify(cartItems));
                        JSON.parse(localStorage.getItem("cartArray"));
                        location.reload();
                    })

                    //calculates the subtotal for each kind of item
                    let itemSubtotalCalcul = (unitPrice, quantity) => {
                        return unitPrice * quantity;
                    }

                    let itemSubtotal = itemSubtotalCalcul(itemsFromCart.price, cartQuantities[i]);
                    cartSubtotals.push(itemSubtotal);

                }

                console.log("contenu du panier", cartItems);

                //calculates the total quantity of items in the cart
                for (let j = 0; j < cartQuantities.length; j++) {
                    cartQuantities
                    sumItems += cartQuantities[j];
                }

                document.getElementById('totalQuantity').textContent = sumItems;

                //calcultes the total in € of the items in the cart   
                for (let k = 0; k < cartSubtotals.length; k++) {
                    cartSubtotals
                    subTotals += cartSubtotals[k];
                }

                document.getElementById('totalPrice').textContent = subTotals;

                //Form control and sending

                let onlyWordRegex = /^[a-z\s\-]+$/gi;
                let lastNameRegex = /^[a-z\s\-]+$/gi;
                //let firtNameRegex = /[a-z\s\-]+/gi;
                let emailRegex = /^([\w-_#\.]+)@{1}([\w-_#\/]+)\.{1}([a-z]{2,10})$/; //first a letter, number, - or . as long as needed ; then @ ; then letter, number or - as long as needed ; then . ; then from 2 to 10 letters only at the end of the address
                let addressRegex = /[\w\-\.,\s]{2,30}$/; 
                let cityRegex = /^[a-z\s\-]+$/gi;

                let contact = {
                };

                //let form = document.querySelector("cart__order__form_question");

                let firstName = document.getElementById("firstName");
                let lastName = document.getElementById("lastName");
                let address = document.getElementById("address");
                let city = document.getElementById("city");
                let eMail = document.getElementById("email");

                //let test = onlyWordRegex.test(firstNameElt.value);
                //console.log(test);
                /*firstName.addEventListener("change", function() {
                    validfirstName(this);
                });

                const validfirstName = function(valeurFirstName) {
                    let testFirstName = onlyWordRegex.test(firstName.value);
                    if (testFirstName) {
                        document.querySelector("p[id$=ErrorMsg]").textContent = "";
                        console.log("le champ "+firstName.id+" est renseigné correctement");
                        contact[firstName.name] = firstName.value;
                        console.log(contact);
                    } else {
                        document.querySelector("p[id*=ErrorMsg").textContent = "format incorrect";
                        firstName.value = "";
                        console.log(firstName.value);
                        console.log("regex false");
                        //delete contact.firstName;
                    }

                    console.log(contact);
                };

                lastName.addEventListener("change", function() {
                    validlastName(this);
                });

                const validlastName = function(valeurLastName) {
                    let testLastName = lastNameRegex.test(lastName.value);
                    if (testLastName) {
                        document.querySelector("p[id$=ErrorMsg]").textContent = "";
                        console.log("le champ "+lastName.id+" est renseigné correctement");
                        contact[lastName.name] = lastName.value;
                        console.log(contact);
                    } else {
                        document.querySelector("p[id*=ErrorMsg").textContent = "format incorrect";
                        lastN.value = "";
                        console.log(lastName.value);
                        console.log("regex false");
                        //delete contact.lastName;
                    }
                
                    console.log(contact);
                };*/

                /*lastName.addEventListener("change", function() {
                    console.log(lastName.value);
                });

                address.addEventListener("change", function() {
                    console.log(address.value);
                });
                
                city.addEventListener("change", function() {
                    console.log(city.value);
                });

                eMail.addEventListener("change", function() {
                    console.log(eMail.value);
                });*/

                const ajouterLeChampDsContact = (champ, regex) => {
                    if (regex.test(champ.value)) {
                        //document.querySelector("p[id$=ErrorMsg]").textContent = "";
                        champ.nextElementSibling.textContent = "";
                        console.log("le champ " + champ.id + " est renseigné correctement");
                        contact[champ.name] = champ.value;
                        console.log(contact);
                    } else {
                        //document.querySelector("p[id$=ErrorMsg").textContent = "format incorrect";
                        champ.nextElementSibling.textContent = "format incorrect";
                        champ.value = "";
                        console.log(champ.value);
                        console.log("regex false");
                        delete contact.champ;
                    }
                };

                const validerForm = (elt, regex) => {
                    elt.addEventListener("change", function () {
                        ajouterLeChampDsContact(elt, regex);
                    })
                };
                validerForm(firstName, onlyWordRegex);
                validerForm(lastName, lastNameRegex);
                validerForm(address, addressRegex);
                validerForm(city, cityRegex);
                validerForm(eMail, emailRegex);                  

                /*let orderBtn = document.getElementById("order");

                orderBtn.addEventListener("click", function() {
                    if(onlyWordRegex.test(firstName.value) && onlyWordRegex.test(lastName.value) && emailRegex.test(eMail.value)) {
                        contact[firstName.name] = firstName.value;
                        contact[lastName.name] = lastName.value;
                        //contact[email.name] = eMail.value;
                    } else {
                        console.log("regex faux");
                    }
                });*/

                /*let validField = (elt, regex) => {
                    return regex.test(elt.value);
                }

                firstName.addEventListener("change", function () {
                    //let firstNameOk = validField(onlyWordRegex, firstName);
                    //console.log(validField(onlyWordRegex, firstName));                    
                    //let firstNameValue = firstName.value;
                    if (onlyWordRegex.test(firstName.value)) {
                        document.getElementById("firstNameErrorMsg").textContent = "";
                    console.log("le champ "+firstName.id+" est renseigné correctement");
                    contact[firstName.name] = firstName.value;
                    console.log(contact);
                    } else {
                        document.getElementById("firstNameErrorMsg").textContent = "format incorrect";
                    firstName.value = "";
                    console.log(firstName.value);
                    console.log("regex false");
                    delete contact.firstName;
                    console.log(contact);
                    }
                    //console.log(contact);
                });

                address.addEventListener("change", function () {
                    //let firstNameOk = validField(onlyWordRegex, firstName);
                    //console.log(validField(onlyWordRegex, firstName));                    
                    //let firstNameValue = firstName.value;
                    if (addressRegex.test(address.value)) {
                        document.getElementById("addressErrorMsg").textContent = "";
                    console.log("le champ "+address.id+" est renseigné correctement");
                    contact[address.name] = address.value;
                    console.log(contact);
                    } else {
                        document.getElementById("addressErrorMsg").textContent = "format incorrect";
                        address.value = "";
                    console.log(address.value);
                    console.log("regex false");
                    delete contact.address;
                    console.log(contact);
                    }
                    //console.log(contact);
                });*/


                /*lastNameElt.addEventListener("change", function () {
                    let lastNameOk = validField(onlyWordRegex, lastNameElt);
                    let lastName = lastNameElt.value;
                    if (lastNameOk) {
                        document.getElementById("lastNameErrorMsg").textContent = "valeur non valide";
                        lastName = "";
                    } else {
                        document.getElementById("lastNameErrorMsg").textContent = "";
                        console.log("le champ nom est renseigné correctement");
                    }
                    console.log(contact);
                });

                addressElt.addEventListener("change", function () {
                    let addressOk = validField(addressRegex, addressElt);
                    let address = addressElt.value;
                    if (addressOk) {
                        document.getElementById("addressErrorMsg").textContent = "valeur non valide";
                        address = "";
                    } else {
                        document.getElementById("addressErrorMsg").textContent = "";
                        console.log("le champ adresse est renseigné correctement");
                    }
                });

                cityElt.addEventListener("change", function () {
                    let cityOk = validField(onlyWordRegex, cityElt);
                    let city = cityElt.value;
                    if (cityOk) {
                        document.getElementById("cityErrorMsg").textContent = "valeur non valide";
                        city = "";
                    } else {
                        document.getElementById("cityErrorMsg").textContent = "";
                        console.log("le champ ville est renseigné correctement");
                    }
                });

                eMailElt.addEventListener("change", function () {
                    let eMailOk = validField(emailRegex, eMailElt);
                    let email = eMailElt.value;
                    if (eMailOk) {
                        document.getElementById("emailErrorMsg").textContent = "";
                        console.log("le champ email est renseigné correctement");
                    } else {
                        document.getElementById("emailErrorMsg").textContent = "adresse email non valide";
                        email = "";
                    }
                });

                console.log(contact);*/


            }


        })
        //Error message when the API has not been reached 
        .catch(function (err) {
            console.log("erreur connexion API");
            alert("Votre page web n'a pas pu charger correctement, merci de vérifier votre connexion et de réessayer plus tard");
        });
}

apiRecovery();