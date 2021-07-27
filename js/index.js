"use strict";
console.log("test");
/*
fetch('https://thecrew.cc/news/read.php')
    .then(response => response.json())
    .then(data => console.log("jen", data));
*/
class Artikels {
    constructor(artikelTitel, artikelFoto, artikelTekst, artikelLikes) {
        this.artikelTitel = artikelTitel;
        this.artikelFoto = artikelFoto;
        //this.artikelIntro = artikelIntro;
        this.artikelTekst = artikelTekst;
        this.artikelLikes = artikelLikes;
    }
}

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
        let artikel = new Artikels(data.news[i].title, data.news[i].imageURI, data.news[i].content, data.news[i].likes);
        arrayArtikels.push(artikel);
    }

    displayHTML(arrayArtikels);
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
            <h1 class="titel">${element.artikelTitel}</h1>
            <img src='${element.artikelFoto}' class="artikelFoto">
             <p class="artikelTekst">${element.artikelTekst}</p>
             </div>
             `;

    });

    containerElement.innerHTML = htmlInhoud;



}