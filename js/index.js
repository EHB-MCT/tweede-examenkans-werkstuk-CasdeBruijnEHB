"use strict";
let arrayKnoppenLikes = [];

class Artikels {
    constructor(artikelUUID, artikelTitel, artikelFoto, artikelTekst, artikelLikes, artikelDatum) {
        this.artikelUUID = artikelUUID;
        this.artikelTitel = artikelTitel;
        this.artikelFoto = artikelFoto;
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


    //De gegevens uit de API uitlezen.
    //Vervolgens alle gegevens in een klasse plaatsen en deze klassen verzamelen in een array
    let arrayLengte = data.news.length;
    arrayArtikels = [];

    for (let i = 0; i < arrayLengte; i++) {
        let artikel = new Artikels(data.news[i].UUID, data.news[i].title, data.news[i].imageURI, data.news[i].content, data.news[i].likes, data.news[i].publicationDate);
        arrayArtikels.push(artikel);
        arraySorted.push(artikel);
    }

    //Een extra array voor de sorted array
    arraySorted.sort((a, b) => b.artikelLikes - a.artikelLikes);
    displayHTML(arrayArtikels);

    /*Filter knoppen, aanpassen HTLM na klik op knop*/
    let btnNoFilter = document.getElementById('btnNoFilter');
    let btnFilter = document.getElementById('btnFilterLikes');
    btnNoFilter.addEventListener('click', function () {
        document.getElementById("searchInput").value = "";
        btnNoFilter.setAttribute('class', 'buttonsHeader classButtonActive');
        btnFilter.setAttribute('class', 'buttonsHeader classButtonNotActive');
        displayHTML(arrayArtikels);

    });
    btnFilter.addEventListener('click', function () {
        document.getElementById("searchInput").value = "";
        btnFilter.setAttribute('class', 'buttonsHeader classButtonActive');
        btnNoFilter.setAttribute('class', 'buttonsHeader classButtonNotActive');
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
        //Dit is voor de inleiding uit de tekst te halen
        let inleidingStart = "<strong>";
        let inleidingStop = "</strong>";
        let inleiding = element.artikelTekst.slice(element.artikelTekst.indexOf(inleidingStart), element.artikelTekst.indexOf(inleidingStop) + inleidingStop.length);
        /*
        Niet elke tekst heeft een inleiding. Voor niet gewoon enkel een foto te laten zien, pakken we indien er niks staat 
        de eerste paragraaf als inleiding
        */
        if (inleiding.length < 100) {
            inleidingStart = "<p>";
            inleidingStop = "</p>";
            inleiding = element.artikelTekst.slice(element.artikelTekst.indexOf(inleidingStart), element.artikelTekst.indexOf(inleidingStop) + inleidingStop.length);
        }
        inleiding += `<small class="leesMeer">Lees meer...</small>`;
        htmlInhoud += `
            <div class="flexboxItem">
            <div id="favorietenContainer">
            <div id="favoHeartDiv">
            <img src='./Icons/1200px-Heart_corazón.svg.png' class='iconHeart'>
            <p class="likesTekst">${element.artikelLikes}</p>
            </div>
            <div class="likeDiv">
            <img id="thumbsUpIcon" src="Icons/ThumbsUp1.png">
            <p class="likeKnop"> Like</p>
            </div>
            </div>
            <h1 class="titel">${element.artikelTitel}</h1>
            <img src='${element.artikelFoto}' class="artikelFoto">
             <p class="artikelTekst">${inleiding}</p>
             </div>
             `;

    });

    containerElement.innerHTML = "";
    containerElement.innerHTML = htmlInhoud;
    let likeKnoppen = document.getElementsByClassName('likeDiv');

    //Een array voor na te kijken of er al op de like knop geklikt was
    let arrayKnoppenGeklikt = [];
    //Like knoppen functie
    for (let i = 0; i < likeKnoppen.length; i++) {
        likeKnoppen[i].addEventListener('click', function (event) {
            if (arrayKnoppenGeklikt.includes(i)) {
                alert("Je hebt deze post al geliked!");
            } else {
                likeBlogPost(dataArtikels[i].artikelUUID);
                likeKnoppen[i].innerHTML = `
            <img id="thumbsUpIcon" src="Icons/ThumbsUp2.png">
            <p class="likeKnop"> Liked!</p>`;
                arrayKnoppenGeklikt.push(i);
            }
        });
    }

    //Een leesmeer knopje voor als het hele artikel gezien moet worden
    let leesMeerKnoppen = document.getElementsByClassName("leesMeer");
    let artikelTekstDivs = document.getElementsByClassName("artikelTekst");
    for (let i = 0; i < leesMeerKnoppen.length; i++) {
        leesMeerKnoppen[i].addEventListener('click', function (event) {
            artikelTekstDivs[i].innerHTML = dataArtikels[i].artikelTekst;
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
//De variabele FilterKeuze wordt gebruikt voor aan te geven op welke manier de gebruiker wilt filteren. Dus op titel, content of beide.
let searchInputButton = document.getElementById("searchInput");
let zoekFilterKeuze = "zoekTitel"; //Dit is de standaard manier van zoeken - op titel
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

    //Edit CSS on click 
    if (zoekFilterKeuze == "zoekTitelContent") {
        document.getElementById('zoekTitelContent').setAttribute('class', 'buttonSearchFilter classButtonActive');
        document.getElementById('zoekContent').setAttribute('class', 'buttonSearchFilter classButtonNotActive');
        document.getElementById('zoekTitel').setAttribute('class', 'buttonSearchFilter classButtonNotActive');
    } else if (zoekFilterKeuze == "zoekContent") {
        document.getElementById('zoekTitelContent').setAttribute('class', 'buttonSearchFilter classButtonNotActive');
        document.getElementById('zoekContent').setAttribute('class', 'buttonSearchFilter classButtonActive');
        document.getElementById('zoekTitel').setAttribute('class', 'buttonSearchFilter classButtonNotActive');
    } else {
        document.getElementById('zoekTitelContent').setAttribute('class', 'buttonSearchFilter classButtonNotActive');
        document.getElementById('zoekContent').setAttribute('class', 'buttonSearchFilter classButtonNotActive');
        document.getElementById('zoekTitel').setAttribute('class', 'buttonSearchFilter classButtonActive');
    }
}