"use strict";
console.log("test");
let arrayKnoppenLikes = [];

/*
fetch('https://thecrew.cc/news/read.php')
    .then(response => response.json())
    .then(data => console.log("jen", data));
*/
class Artikels {
    constructor(artikelUUID, artikelTitel, artikelFoto, artikelTekst, artikelLikes) {
        this.artikelUUID = artikelUUID;
        this.artikelTitel = artikelTitel;
        this.artikelFoto = artikelFoto;
        //this.artikelIntro = artikelIntro;
        this.artikelTekst = artikelTekst;
        this.artikelLikes = artikelLikes;
    }
}
let arraySorted = [];
let arrayArtikels = [];
async function getData() {
    const response = await fetch('https://thecrew.cc/news/read.php');
    const data = await response.json();
    //console.log("zwei", data);
    //console.log(data.news[0].imageURI);
    //console.log("lengte", data.news.length);

    //De gegevens uit de API uitlezen.
    //Vervolgens alle gegevens in een klasse plaatsen en deze klassen verzamelen in een array
    let arrayLengte = data.news.length;
    arrayArtikels = [];

    for (let i = 0; i < arrayLengte; i++) {
        let artikel = new Artikels(data.news[i].UUID, data.news[i].title, data.news[i].imageURI, data.news[i].content, data.news[i].likes);
        arrayArtikels.push(artikel);
        arraySorted.push(artikel);
    }

    //Een extra array voor de sorted zaken
    arraySorted.sort((a, b) => b.artikelLikes - a.artikelLikes);
    displayHTML(arrayArtikels);


    /*Filter knoppen, aanpassen HTLM na klik op knop*/
    document.getElementById('btnNoFilter').addEventListener('click', function () {
        displayHTML(arrayArtikels);

    });
    document.getElementById('btnFilterLikes').addEventListener('click', function () {
        displayHTML(arraySorted);

    });
    return await data;
}
getData();

function displayHTML(dataArtikels) {
    //Gegevens uit de array halen en in een html variabele stoppen
    //Vervolgens de HTML toevoegen aan de container
    let containerElement = document.getElementById('container');
    let htmlInhoud = "";
    dataArtikels.forEach((element) => {
        htmlInhoud += `
            <div class="flexboxItem">
            <img src='./Icons/1200px-Heart_corazón.svg.png' class='iconHeart'>
            <p class="likesTekst">${element.artikelLikes}</p>
            <p class="likesTekst">${element.artikelUUID}</p>
            <button class="likeKnop">Like</button>
            <h1 class="titel">${element.artikelTitel}</h1>
            <img src='${element.artikelFoto}' class="artikelFoto">
             <p class="artikelTekst">${element.artikelTekst}</p>
             </div>
             `;

    });

    containerElement.innerHTML = "";
    containerElement.innerHTML = htmlInhoud;
    let likeKnoppen = document.getElementsByClassName('likeKnop');

    for (let i = 0; i < likeKnoppen.length; i++) {
        likeKnoppen[i].addEventListener('click', function () {
            console.log("Hallo", dataArtikels[i].artikelUUID);
            likeBlogPost(dataArtikels[i].artikelUUID);
        });
    }

}


function likeBlogPost(id) {
    console.log(id);
    fetch(`https://thecrew.cc/news/create.php`, {
            method: 'POST',
            body: JSON.stringify({
                /*message: `{ "UUID": ${id}}`*/
                id
            })
        })

        .then(data => {
            console.log("test", data);
        });
}