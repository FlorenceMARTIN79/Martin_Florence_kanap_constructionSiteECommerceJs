//recovery of the id contained in the URL via UrlSearchParams
console.log(window.location.href);

let str = window.location.href;
let url = new URL(str);
let productId = url.searchParams.get("id");
console.log(productId);

//creation of js elements corresponding to html elements
selectColor = document.querySelector("#colors");
enterQuantity = document.querySelector("#quantity");

/*API call on 3000 port*/
function apiRecovery() {
    fetch("http://localhost:3000/api/products/" + productId)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (selectedSofa) {
            console.table(selectedSofa);


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
            class ShoppedSofa {
                constructor(id, color, quantity) {
                    this.id = id;
                    this.color = color;
                    this.quantity = quantity;
                }
            }

            let firstShoppedSofa = new ShoppedSofa ("TEST", "arcenciel", 20)

            //Listen of the click event with action setting off
            selectColor.addEventListener("change", function () {

                enterQuantity.addEventListener("change", function() {
                    console.log(enterQuantity.value);

                    let newShoppedSofa = new ShoppedSofa( productId, selectColor.options[selectColor.selectedIndex].value, enterQuantity.value)
                
                let shoppedSofas = [];        
                shoppedSofas.push(firstShoppedSofa, newShoppedSofa);
            
                console.table(shoppedSofas);
                });

                
            });
        
        })
        //Error message when the API has not been reached 
        .catch(function (err) {
            console.log("erreur connexion API");
        });
}

apiRecovery();