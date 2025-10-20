var contenuto_tabella = [];
var filtrati = []; 

function leggi() {
    const file = document.getElementById('fileInput').files[0];

    const fileURL = URL.createObjectURL(file);
    const req = new XMLHttpRequest();
    req.open("GET", fileURL, true);
    req.send();
    req.onload = function () {
        contenuto_tabella = JSON.parse(req.responseText);
        popola(contenuto_tabella);
    };
}

function popola(dati) {
    const tabella = document.getElementById('tabella');
    tabella.innerHTML = '';

    for (let i = 0; i < dati.length; i++) {
        const persona = dati[i];
        const row = tabella.insertRow();

        row.insertCell(0).textContent = persona.nome;
        row.insertCell(1).textContent = persona.cognome;
        row.insertCell(2).textContent = persona.dataNascita;
        row.insertCell(3).textContent = persona.indirizzo;
        row.insertCell(4).textContent = persona.citta;
        row.insertCell(5).textContent = persona.cap;
    }
}


function cerca() {
    filtrati = [];
    cancellaGenerazioni(); 
    const lettera = document.getElementById('lettera').value;

    if (lettera === "0") {
        popola(contenuto_tabella);
        filtrati = contenuto_tabella;
        return;
    }
   
    for (let i = 0; i < contenuto_tabella.length; i++) {
        const persona = contenuto_tabella[i];
        if (persona.cognome.toUpperCase().startsWith(lettera.toUpperCase())) {  // trovato metodo online
            filtrati.push(persona);
        }
    }

    if (filtrati.length === 0) {
        alert("Nessun cognome trovato per la lettera " + lettera);
    }

    popola(filtrati);
}


function dividiGenerazioni() {
    cerca();
    
    const cont_generazioni = document.getElementById('tabelleGenerazioni');
    cont_generazioni.innerHTML = '';

    const gruppi = {};

    for (let i = 0; i < filtrati.length; i++) {
        const persona = filtrati[i];
        const generazione = calcolaGenerazione(persona.dataNascita);

        if (!gruppi[generazione]) {
            gruppi[generazione] = [];
        }

        gruppi[generazione].push(persona);
    }

    for (let gen in gruppi) {
        const titolo = document.createElement('h3');
        titolo.textContent = gen;
        cont_generazioni.appendChild(titolo);

        const tab = document.createElement('table');
        tab.innerHTML = `
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Cognome</th>
                    <th>Data Nascita</th>
                    <th>Indirizzo</th>
                    <th>Città</th>
                    <th>CAP</th>
                </tr>
            </thead>
        `;

        const body = document.createElement('tbody');
        const persone = gruppi[gen];

        for (let i = 0; i < persone.length; i++) {
            const persona = persone[i];
            const row = body.insertRow();
            row.insertCell(0).textContent = persona.nome;
            row.insertCell(1).textContent = persona.cognome;
            row.insertCell(2).textContent = persona.dataNascita;
            row.insertCell(3).textContent = persona.indirizzo;
            row.insertCell(4).textContent = persona.citta;
            row.insertCell(5).textContent = persona.cap;
        }

        tab.appendChild(body);
        cont_generazioni.appendChild(tab);
    }
}


function calcolaGenerazione(dataStr) {
    const anno = parseInt(dataStr.split("-")[0]); // prende solo l'anno, il primo numero, 1985-06-12 dal json
    if (anno >= 2013) return "Generazione Alpha";
    if (anno >= 1997) return "Generazione Z";
    if (anno >= 1981) return "Millennials";
    if (anno >= 1965) return "Generazione X";
    if (anno >= 1946) return "Baby Boomers";
    if (anno >= 1928) return "Generazione Silenziosa";
    if (anno >= 1901) return "Greatest Generation";
    return "Errore";
}

function cancellaGenerazioni() {
    const container = document.getElementById('tabelleGenerazioni');
    container.innerHTML = '';
}
