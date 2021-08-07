"use strict";
console.log("test");
let arrayKnoppenLikes = [];

class Artikels {
    constructor(artikelUUID, artikelTitel, artikelFoto, artikelTekst, artikelLikes, artikelDatum) {
        this.artikelUUID = artikelUUID;
        this.artikelTitel = artikelTitel;
        this.artikelFoto = artikelFoto;
        //this.artikelIntro = artikelIntro;
        this.artikelTekst = artikelTekst;
        this.artikelLikes = artikelLikes;
        this.artikelDatum = artikelDatum;
    }
}


let arraySorted = [];
let arrayArtikels = [];
async function getData() {
    const response = await fetch('https://thecrew.cc/news/read.php');
    const data = await response.json();
    //console.log("zwei", data);


    //De gegevens uit de API uitlezen.
    //Vervolgens alle gegevens in een klasse plaatsen en deze klassen verzamelen in een array
    let arrayLengte = data.news.length;
    arrayArtikels = [];

    for (let i = 0; i < arrayLengte; i++) {
        let artikel = new Artikels(data.news[i].UUID, data.news[i].title, data.news[i].imageURI, data.news[i].content, data.news[i].likes);
        arrayArtikels.push(artikel);
        arraySorted.push(artikel);
    }

    //Een extra array voor de sorted array
    arraySorted.sort((a, b) => b.artikelLikes - a.artikelLikes);
    displayHTML(arrayArtikels);


    /*Filter knoppen, aanpassen HTLM na klik op knop*/
    let btnNofilter = document.getElementById('btnNoFilter');
    let btnFilter = document.getElementById('btnFilterLikes');
    btnNofilter.addEventListener('click', function () {
        displayHTML(arrayArtikels);

    });
    btnFilter.addEventListener('click', function () {
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

    //Like knoppen functie
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
                "UUID": id
            })
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        });
}



//Searchbar knoppen - hier wordt aan de verschillende knoppen naargelang de manier van filteren een eventlistener toegevoegd.
//De variabele FilterKeuze wordt gebruikt voor aan te geven op welke manier de gebruiker wilt filteren.
let searchInputButton = document.getElementById("searchInput");
let zoekFilterKeuze = "zoekTitel";
let zoekFilterKnoppen = document.getElementsByClassName('buttonSearchFilter');
for (let i = 0; i < zoekFilterKnoppen.length; i++) {
    zoekFilterKnoppen[i].addEventListener('click', function (e) {
        zoekFilterKeuze = e.target.id;
        searchBar();
    });
}

//Event listener toevoegen aan de searchbar
searchInputButton.addEventListener("keyup", function () {
    searchBar();
});


//De searchbar functie die wordt aangeroepen na elke toets
function searchBar() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    /*
    Filter functie. Hier wordt de array gefilterd, en het gefilterd resultaat in filteredVariabelen array gestopt.
    Eerst kijkt de functie naar de variabele 'zoekFilterKeuze'. Deze variabelen wordt aangepast naargelang de keuze van
    filter manier.
    */
    const filteredVariablen = arrayArtikels.filter(character => {
        if (zoekFilterKeuze == "zoekTitelContent") {
            return character.artikelTitel.toLowerCase().includes(input) || character.artikelTekst.toLowerCase().includes(input);
        } else if (zoekFilterKeuze == "zoekContent") {
            return character.artikelTekst.toLowerCase().includes(input);
        } else {
            return character.artikelTitel.toLowerCase().includes(input);
        }
    });
    displayHTML(filteredVariablen);
}