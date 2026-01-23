const personer = [
    { navn: "Ola", alder: 25 },
    { navn: "Kari", alder: 30 },
    { navn: "Per", alder: 20 },
    { navn: "Lise", alder: 35 },
    { navn: "Nina", alder: 15 },
    { navn: "Morten", alder: 17 }
];

//Filtrerer etter bestemt betingelse. Her: over eller lik 18 år
const voksne = personer.filter(person => person.alder >= 18);
console.table(voksne);

//Første element som oppfyller betingelsen
const personOver30 = personer.find(person => person.alder > 30);
console.table(personOver30);

//Omformer hvert element i et array til verdien. Her: element blir til kun navnet sitt
const navnArray = personer.map(person => person.navn);
console.table(navnArray);

//Reduserer alle elementer til én verdi
//Teknisk: sum er returverdien av funksjonen. Ved den første kjørelsen er dette lik initialverdien, her: 0
const totalAlder = personer.reduce((sum, person) => sum + person.alder, 0);
console.log(totalAlder);

//Sjekker om hvertfall ett element oppfyller kravet i hele listen
const harVoksen = personer.some(person => person.alder >= 18);
console.log(harVoksen);

//Sjekker om alle elementene oppfyller kravet
const alleVoksne = personer.every(person => person.alder >= 18);
console.log(alleVoksne);

//Sorterer elementene basert på kriterier
//Teknisk: bruker variabler a og b for å representere to elementer som sammenlignes
//  Om resultatet er positivt, vil b kommer foran a. Om det er negativt, vil a komme foran b
//  Ved en (a - b)-callback vil det skape en liste fra lav til høy
const sortertEtterAlder = personer.slice().sort((a, b) => a.alder - b.alder);
console.table(sortertEtterAlder);