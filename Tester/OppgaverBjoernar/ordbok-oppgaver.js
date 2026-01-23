// ORDBOK DATASETT
// Dette datasettet inneholder noen ord med ulike bruksområder (ordklasser), og definisjoner

const ordbok = [
    {
        ord: "tre",
        ordklasser: [
            {
                type: "substantiv",
                definisjon: "en stor plante med stamme og greiner",
                eksempel: "De klatret opp i et høyt tre."
            },
            {
                type: "tallord",
                definisjon: "tallet som kommer etter to og før fire",
                eksempel: "Jeg har tre søstre."
            },
            {
                type: "verb",
                definisjon: "å føre noe gjennom en åpning, eller å sette foten ned",
                eksempel: "Du må tre tråden gjennom nåløyet."
            }
        ],
        popularitet: 98,
        antallBokstaver: 3
    },
    {
        ord: "rett",
        ordklasser: [
            {
                type: "adjektiv",
                definisjon: "som ikke er bøyd, som går den korteste veien",
                eksempel: "Du må tegne en rett linje."
            },
            {
                type: "substantiv",
                definisjon: "en tilberedt porsjon mat",
                eksempel: "Vi fikk servert en deilig rett til middag."
            },
            {
                type: "substantiv",
                definisjon: "lov og domstol, eller det man har krav på",
                eksempel: "Saken skal opp i retten neste uke."
            }
        ],
        popularitet: 92,
        antallBokstaver: 4
    },
    {
        ord: "sky",
        ordklasser: [
            {
                type: "substantiv",
                definisjon: "synlig masse av vanndamp som svever i luften",
                eksempel: "Det var ikke en eneste sky på himmelen."
            },
            {
                type: "adjektiv",
                definisjon: "engstelig, reservert eller redd for mennesker",
                eksempel: "Katten var veldig sky og gjemte seg under sofaen."
            },
            {
                type: "verb",
                definisjon: "å unngå noe eller noen bevisst",
                eksempel: "Han pleier å sky unna vanskelige oppgaver."
            }
        ],
        popularitet: 75,
        antallBokstaver: 3
    },
    {
        ord: "fast",
        ordklasser: [
            {
                type: "adjektiv",
                definisjon: "ikke løs, solid, stabil",
                eksempel: "Bordet står fast på gulvet."
            },
            {
                type: "adjektiv",
                definisjon: "regelmessig, permanent",
                eksempel: "Han har fast jobb."
            }
        ],
        popularitet: 72,
        antallBokstaver: 4
    },
    {
        ord: "løpe",
        ordklasser: [
            {
                type: "verb",
                definisjon: "å bevege seg raskt ved å sette det ene beinet foran det andre i rask rekkefølge",
                eksempel: "Han må løpe for å rekke bussen."
            }
        ],
        popularitet: 95,
        antallBokstaver: 4
    }
];

// Skriv ut det opprinnelige datasettet
console.log("=== ORDBOK DATASETT ===");
console.table(ordbok);

console.log("\n=== OPPGAVER ===");
console.log("Løs oppgavene under ved å bruke array-funksjoner som filter, find, map, reduce, some, every og sort.\n");

// =====================================
// OPPGAVE 1: filter
// =====================================
// Filtrer ut alle ord som har 3 eller flere ordklasser
console.log("--- OPPGAVE 1 ---");
console.log("Oppgave: Filtrer ut alle ord som har 3 eller flere ordklasser");
// Skriv koden din her:
const nyListe = ordbok.filter(orddict => orddict.ordklasser.length >= 3);
console.log(nyListe);


// =====================================
// OPPGAVE 2: find
// =====================================
// Finn det første ordet som har en popularitet over 85
console.log("\n--- OPPGAVE 2 ---");
console.log("Oppgave: Finn det første ordet som har en popularitet over 85");
// Skriv koden din her:
const ord = ordbok.find(orddict => orddict.popularitet > 85);
console.log(ord.ord);


// =====================================
// OPPGAVE 3: map
// =====================================
// Lag et nytt array som inneholder bare ordene (strengene) fra ordbok-arrayet
console.log("\n--- OPPGAVE 3 ---");
console.log("Oppgave: Lag et nytt array med bare ordene");
// Skriv koden din her:
const nyListe2 = ordbok.map(orddict => orddict.ord);
console.log(nyListe2)


// =====================================
// OPPGAVE 4: map (avansert)
// =====================================
// Lag et nytt array med objekter som inneholder ord og antall ordklasser
// Formatet skal være: { ord: "løpe", antallOrdklasser: 2 }
console.log("\n--- OPPGAVE 4 ---");
console.log("Oppgave: Lag array med ord og antall ordklasser");
// Skriv koden din her:
function Ordscheiss(ord,antallOrdklasser) {
    this.ord = ord;
    this.antallOrdklasser = antallOrdklasser;
}
const nyListe3 = ordbok.map(orddict => new Ordscheiss(orddict.ord,orddict.ordklasser.length));
console.log(nyListe3)


// =====================================
// OPPGAVE 5: reduce
// =====================================
// Beregn totalt antall ordklasser for alle ord til sammen
console.log("\n--- OPPGAVE 5 ---");
console.log("Oppgave: Beregn totalt antall ordklasser");
// Skriv koden din her:
const totaltklasser = ordbok.reduce((sum,orddict) => sum + orddict.ordklasser.length,0);
console.log(totaltklasser);


// =====================================
// OPPGAVE 6: reduce (avansert)
// =====================================
// Beregn gjennomsnittlig popularitet for alle ord
console.log("\n--- OPPGAVE 6 ---");
console.log("Oppgave: Beregn gjennomsnittlig popularitet");
// Skriv koden din her:
const totpop = ordbok.reduce((sum, orddict) => sum + orddict.popularitet,0);
const gjpop = totpop/ordbok.length;
console.log(gjpop);


// =====================================
// OPPGAVE 7: some
// =====================================
// Sjekk om minst ett ord kan brukes som verb
console.log("\n--- OPPGAVE 7 ---");
console.log("Oppgave: Sjekk om minst ett ord kan brukes som verb");
// Skriv koden din her:
const alletyper = [];
ordbok.forEach(orddict => {
    orddict.ordklasser.forEach(klasse => {
        alletyper.push(klasse.type);
    })
});
const finsverb = alletyper.some(type => type == "verb");
console.log(finsverb);

// =====================================
// OPPGAVE 8: every
// =====================================
// Sjekk om alle ord har minst 2 ordklasser
console.log("\n--- OPPGAVE 8 ---");
console.log("Oppgave: Sjekk om alle ord har minst 2 ordklasser");
// Skriv koden din her:
console.log(ordbok.every(orddict => orddict.ordklasser.length >= 2));


// =====================================
// OPPGAVE 9: sort
// =====================================
// Sorter ordene etter popularitet (høyest først)
console.log("\n--- OPPGAVE 9 ---");
console.log("Oppgave: Sorter etter popularitet (høyest først)");
// Skriv koden din her:
const nyListe4 = ordbok.toSorted((a,b) => b.popularitet - a.popularitet);
console.log(nyListe4);


// =====================================
// OPPGAVE 10: Kombinasjon (filter + map)
// =====================================
// Filtrer ut ord som kan brukes som adjektiv, og lag et array med bare ordene
console.log("\n--- OPPGAVE 10 ---");
console.log("Oppgave: Finn ord som kan brukes som adjektiv");
// Skriv koden din her:


// =====================================
// OPPGAVE 11: Kombinasjon (filter + reduce)
// =====================================
// Finn totalt antall bokstaver i alle ord som har popularitet over 80
console.log("\n--- OPPGAVE 11 ---");
console.log("Oppgave: Tell bokstaver i populære ord (>80)");
// Skriv koden din her:


// =====================================
// OPPGAVE 12: Avansert (flatMap eller map + flat)
// =====================================
// Lag et array med alle definisjoner fra alle ord
// Tips: Du må kanskje bruke map og flat, eller flatMap
console.log("\n--- OPPGAVE 12 ---");
console.log("Oppgave: Lag array med alle definisjoner");
// Skriv koden din her: