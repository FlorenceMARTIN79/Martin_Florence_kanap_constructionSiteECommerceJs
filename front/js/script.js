/*appel des éléments de l'API sur port3000*/
fetch("http://localhost:3000/api/products")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (canapes) {
        console.log(canapes);
    })
    .catch(function (err) {
        console.log("erreur connexion API");
    });




/*Création d'un élément <a> enfant de l'élément dont l'ID est items via le DOM*/
const newElt = document.createElement("a");
let elt = document.getElementById("items");
elt.appendChild(newElt);

