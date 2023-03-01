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

            /*let shoppedSofas = [];
            console.log(shoppedSofas);*/
            //Listening of the click on "ajouter au panier" button
            addItem.addEventListener("click", function () {

                //console.table(shoppedSofas);
                //creation of the object newKanap ; should rather create a class kanap and then create as many objects newKanap as sofas selected ?
                let newKanap = {
                    shoppedSofaId: productId,
                    shoppedSofaColor: selectColor.options[selectColor.selectedIndex].value,
                    shoppedSofaQuantity: enterQuantity.value,
                }

                //variables helping to control the correct filling of the options (quantity and color)
                let colorControl = newKanap.shoppedSofaColor != "";
                let quantityControl = newKanap.shoppedSofaQuantity > 0 && newKanap.shoppedSofaQuantity < 101;


                //condition controlling the adding of the sofa in the localStorage
                if (colorControl && quantityControl) {/*if the color and the quantity fields have been filled correctly*/

                    //push in the local storage of the sofa selected (id, color and quantity selected by the user) if the local storage is empty
                    //let clicSofa = localStorage.getItem("clicSofa");
                    //localStorage.setItem(clef, test1);
                    //console.log(localStorage.length);
                    /*recovery of the local storage*/

                    if (localStorage.length = 0) {/*si le panier du local storage est vide, on pousse le nouveau kanap dans le local storage */
                        /*shoppedSofas.push(newKanap);
                        console.log(newKanap);*/
                        localStorage.setItem(JSON.stringify(productId + selectColor.options[selectColor.selectedIndex].value), JSON.stringify(enterQuantity.value));
                        
                        
                    } else {

                        localStorage.setItem(JSON.stringify(productId + selectColor.options[selectColor.selectedIndex].value), JSON.stringify(enterQuantity.value));
                        console.log(localStorage.length);
                    /*console.log("Nombre de lignes de clicSofa : " + JSON.parse(clicSofa).length);*/

                    /*var newClicSofa = JSON.parse(clicSofa).filter(function(sofaFilter) {
                        return sofaFilter.shoppedSofaId != newKanap.shoppedSofaId;


                    /*ICI ajouter une fonction pour ajouter les quantités de sofas identiquescliqués*/
                        
                    /*});*/

                    /*shoppedSofas.push(newKanap);
                    localStorage.setItem("clicSofa", JSON.stringify(shoppedSofas));

                    
                    console.log(newClicSofa);
                    
                    console.log("Id du newKanap : " + newKanap.shoppedSofaId);
                    
                        
                        console.table(shoppedSofas);
                        console.table(JSON.parse(clicSofa));*/
                       
                        
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
