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

            addItem.addEventListener("click", function () {

                
                let newShoppedSofa = {
                    shoppedSofaId: productId,
                    shoppedSofaColor: selectColor.options[selectColor.selectedIndex].value,
                    shoppedSofaQuantity: enterQuantity.value,
                }
            

                let shoppedSofas = [];

                //variables helping to control the correct filling of the options (quantity and color)
                let colorControl = newShoppedSofa.shoppedSofaColor != "";
                let quantityControl = newShoppedSofa.shoppedSofaQuantity > 0 && newShoppedSofa.shoppedSofaQuantity < 101;


                //condition controlling the adding of the sofa in the array
                if (colorControl && quantityControl) {
                   
                    shoppedSofas.push(newShoppedSofa);

                } else if (colorControl) {
                    alert("Merci de renseigner la quantité");
                } else if (quantityControl) {
                    alert("Merci de choisir une couleur");
                } else {
                    alert("Merci de renseigner la couleur et la quantité");
                }

                localStorage.setItem("tableau", JSON.stringify((shoppedSofas)));
                    console.log("nombre paires clé/valeur du localStorage : " + localStorage.length);
                    console.log("tableau des canapés dans le panier :" + JSON.stringify(shoppedSofas));
                    console.log("nombre entrées tableau des canapés dans le panier :" + shoppedSofas.length);
            });

                //condition controlling the adding of the shopped sofa(s) in the array in the local storage checking if the sofa already exists
                //si id et couleur = new alors nouvelle ligne dans le tableau, sinon si id et couleur déjà présents alors ajouter quantité





        })
        //Error message when the API has not been reached 
        .catch(function (err) {
            console.log("erreur connexion API");
        });
}

apiRecovery();

//dans le localStorage il faudra surement utilier une conditiond de type switch pour vérifier dans le tableau si le canapé est déjà présent ou non