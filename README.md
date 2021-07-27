

## Introduction
Voor deze tweede examenkans maken jullie een werkstuk rond dezelfde API. deze API geeft het nieuws weer van EhB, vers van de pers. Jullie doel is om het toe te staan aan gebruikers om een artikel te liken, en artikels te sorteren op likes. Een gebruiker moet ook in staat zijn de lijst van artikels te kunnen filteren op een keyword (zoekterm).

## Features

* haal de artikels op van de endpoint
    * Zorg dat deze in een klasse worden opgeslagen (met volgende properties)
        * ID van het artikel
        * titel
        * content
        * imageURL
        * likes
        * datum
* De klasse "Artikels" heeft een "like" functie die als volgt werkt
    * Stuur een POST request naar een endpoint
    * Stuur in de body van deze request de ID van het artikel mee
* Geef de lijst van artikels overzichtelijk weer in de feed, met de titel, afbeelding en intro tekst.
    * Je zal hiervoor zelf de HTML en CSS moeten schrijven
* Zorg dat de user op de pagina een search field heeft waarmee deze op een keyword kunnen zoeken
    * filter op de titel en in de content
* Zorg dat de gebruiker de lijst van artikels kan sorteren op likes
* Zorg dat je minstens voor elke feature een commit doet (bij elke stap) zodat we kunnen zien hoe je het project aanpakte.

## Endpoints

### read
* method: GET
* URL: https://thecrew.cc/news/read.php
* returns: een array aan nieuwsartikels met het aantal likes

### create
* method: POST
* URL: https://thecrew.cc/news/create.php
* body: ```{
    "UUID": [UUID van de post]
}```
* returns: "created" (status 200) wanneer het invoegen gelukt is.

## Mogelijke errors
Indien je een error krijgt, probeer dan eerst de volledige error uit te lezen. Console.log is je vriend om te controlleren of een array effectief iets bevat, om te checken of een functie uitgevoerd wordt, etc.
Het endpoint om een artikel te "liken" kan een paar errors teruggeven. De belangrijkste is een error met statuscode "400", dat je laat weten dat de body van je request niet volledig is of slecht geformuleerd is. Controlleer in dat geval of je een artikel UUID meegaf, en deze met de juiste key meestuurde.

## Indienen
Indienen doe je vooral via GIT. Zorg er echter voor dat je repository op publiek staat, en dien de URL van je repository in via canvas, op deze opdracht.