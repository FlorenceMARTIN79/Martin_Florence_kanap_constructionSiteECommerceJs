//recovery of the id contained in the URL via UrlSearchParams

let str = window.location.href;
let url = new URL(str);
let productId = url.searchParams.get("id");

//creation of js elements corresponding to html elements
let selectColor = document.querySelector("#colors");
let enterQuantity = document.querySelector("#quantity");
let addItem = document.querySelector("#addToCart");


/*API call on 3000 port*/
function apiRecovery() {
    fetch("http://localhost:3000/api/products/" + productId)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (selectedSofa) {

            //Creation of an img in the card
            const productImg = document.createElement("img");
            let imgDiv = document.querySelector(".item__img");
            imgDiv.appendChild(productImg);
            productImg.setAttribute("alt", selectedSofa.altTxt);
            productImg.setAttribute("src", selectedSofa.imageUrl);

            //Display of the name of the selected sofa
            document.getElementById("title").textContent = selectedSofa.name;

            //Display of the price of the selected sofa
            document.getElementById("price").textContent = selectedSofa.price;

            //Display of the description in the paragraph with "description" id
            document.getElementById("description").textContent = selectedSofa.description;

            //Display of the colors options for the selected sofa
            for (let i = 0; i < selectedSofa.colors.length; i++) {
                const colorOption = document.createElement("option");
                colorOption.setAttribute("value", selectedSofa.colors[i]);
                colorOption.textContent = selectedSofa.colors[i];
                document.getElementById("colors").appendChild(colorOption);

            }

            //Creation of the cart containing the selected sofa(s)
            let shoppedSofas = [];

            addItem.addEventListener("click", function () {

                let newKanap = {
                    shoppedSofaId: productId,
                    shoppedSofaColor: selectColor.options[selectColor.selectedIndex].value,
                    shoppedSofaQuantity: enterQuantity.value,
                }

                //variables helping to control the correct filling of the options (quantity and color)
                let colorControl = newKanap.shoppedSofaColor != "";
                let quantityControl = newKanap.shoppedSofaQuantity > 0 && newKanap.shoppedSofaQuantity < 101;


                //condition controlling the adding of the sofa in the array
                if (colorControl && quantityControl) {
                    /*if the color and quantity fields are filled correctly*/

                    //push of the newKanap if the local storage is empty


                    if (localStorage.length < 1) {
                        /*si le panier du local storage est vide, on pousse le nouveau kanap dans le tableau des sofas PUIS on sauvegarde ce nouveeau panier dans le local storage*/
                        //creation of the new sofa in the array shoppedSofas
                        shoppedSofas.push(newKanap);
                        console.table('Tableau shoppedSofas pour les sofas sélectionnés', shoppedSofas);

                        //push of the selected sofa(s) in the localStorage as an array under the name cartArray
                        localStorage.setItem("cartArray", JSON.stringify(shoppedSofas));

                    } else {

                        //on récupère le contenu du local storage et on le nomme localStoragecontent;
                        let shoppedSofas = JSON.parse(localStorage.getItem("cartArray"));
                        //let localStorageContent = JSON.parse(shoppedSofas);

                        console.log('local storage avant filtres', shoppedSofas);

                        //utilisation de la méthode filter pour retourner un nouveau tableau localStorageContent dont les éléments ont un id identique à celui du newKanap
                        const deleteProductId = (shoppedSofaId) => {
                            localStorageContentById = shoppedSofas.filter(elt => elt.shoppedSofaId == shoppedSofaId);
                        }
                        deleteProductId(newKanap.shoppedSofaId);

                        console.table(/*'local storage filtré par Id', */localStorageContentById);

                        const deleteProductColor = (shoppedSofaColor) => {
                            localStorageContentByColor = localStorageContentById.filter(elt => elt.shoppedSofaColor == shoppedSofaColor);
                        }
                        deleteProductColor(newKanap.shoppedSofaColor);

                        console.log('local storage déjà préfiltré, filtré par couleur', localStorageContentByColor);
                        console.log(localStorageContentByColor.length);

                        //console.table(shoppedSofas);

                        //localStorageContent.push(newKanap);
                        
                     

                        if (localStorageContentByColor.length == 0) {
                            shoppedSofas.push(newKanap);
                            localStorage.setItem("cartArray", JSON.stringify(shoppedSofas));
                        } else if (localStorageContentByColor.length > 0 ) {
                            //localStorageContentByColor.forEach(elt => elt.shoppedSofaQuantity + newKanap.shoppedSofaQuantity);
                            const sameSofaToAdd = localStorageContentByColor.find(elt => elt.shoppedSofaId == newKanap.shoppedSofaId);

                           sameSofaToAdd.shoppedSofaQuantity = (Number(sameSofaToAdd.shoppedSofaQuantity) + Number(newKanap.shoppedSofaQuantity));

                           localStorage.setItem("cartArray", JSON.stringify(shoppedSofas));
                        }

                        console.table(shoppedSofas);

                        //localStorage.setItem("cartArray", JSON.stringify(localStorageContent));



                        //console.log("tableau shoppedSofas de la page product.js ", shoppedSofas);


                    }


                } else if (colorControl) {
                    alert("Merci de renseigner la quantité");
                } else if (quantityControl) {
                    alert("Merci de choisir une couleur");
                } else {
                    alert("Merci de renseigner la couleur et la quantité");
                }


            });



        })
        //Error message when the API has not been reached 
        .catch(function (err) {
            console.log("erreur connexion API");
            alert("Votre page web n'a pas pu charger correctement, merci de vérifier votre connexion et de réessayer plus tard");
        });
}

apiRecovery();