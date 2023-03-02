//on récupère le tableau cartArray du local storage
let cartArray = localStorage.getItem("cartArray");
console.log(cartArray);
/*Maintenant : créer tableau pour le panier, puis pusher le contenu du localStorage dans le panier ?
*/

//recovery of the content of the local storage
//transcription du contenu du tableau cartArray pour qu'il soit exploitable par js
let localStorageContent = JSON.parse(cartArray);
console.log("contenu du local storage récupéré : ");
console.table(localStorageContent);

//addition of the shopped sofas in the cart
//création du tableau vide cart qui est le panier de l'utilisateur
let cart = [];

//creation of a loop to add each line of the local storage content into the cart array
//console.log(localStorageContent[0]);
//cart.push(localStorageContent[0]);
//cart.push(localStorageContent[1]);
//console.log(localStorageContent.length);
if (localStorageContent == null) {//si le contenu du local storage est vide
    
    for (let i = 0 ; i < localStorageContent.length ; i++) {
        cart.push(localStorageContent[i]);//pour chaque élément du tableau du local storage, on ajoute l'élément au panier de l'utilisateur
    }

    localStorage.clear();//on vide le local storage
    console.table(cart);
    let cart_json = JSON.stringify(cart);//on transcrit le panier utilisateur pour qu'il soit au format exploitable par le local storage
    localStorage.setItem("cartContent",cart_json);//on ajoute le panier au local storage en le nommant différemment du tableau cartArray
}
else {//si le local storage n'est pas vide
    localStorage.clear();
    for (let i = 0 ; i < localStorageContent.length ; i++) {
        cart.push(localStorageContent[i]);//pour chaque élément du tableau du local storage, on ajoute l'élément au panier de l'utilisateur
    }
    //cart.push(localStorageContent);//on ajoute 
    cart.push("test");
    let cart_json = JSON.stringify(cart);
    localStorage.setItem("cartContent",cart_json);

}


console.table(cart);
