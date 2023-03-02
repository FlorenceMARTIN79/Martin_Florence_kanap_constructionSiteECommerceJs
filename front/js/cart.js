/*function apiRecovery() {
    fetch("http://localhost:3000/api/products")
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })

        .then(function (sofas) {
            let clicSofa = localStorage.getItem("clicSofa");
            console.table(clicSofa);
        })

        //Error message when the API has not been reached 
        .catch(function (err) {
            console.log("erreur connexion API");
            alert("Votre page web n'a pas pu charger correctement, merci de vérifier votre connexion et de réessayer plus tard");
        });
}

apiRecovery();*/

console.log(localStorage.length);


let cart = [];
class cartElt {
    constructor (id, color, quantity) {
        this.id = id;
        this.color = color;
        this.quantity = quantity;
    }
}
let ex1 = new cartElt("id", "color", "quantity");
cart.push(ex1);

    for (let i = 0; i < localStorage.length; i++) {
        x = localStorage.key(i);
        let Elt = localStorage.getItem(x);
        console.table(x);
        cart.push(x+Elt);
console.table(cart);

    }

    






