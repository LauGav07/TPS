var contenuto_tabella;

function leggi() {
    const file = document.getElementById('fileInput').files[0];
    const fileURL = URL.createObjectURL(file); // cercato

    const req = new XMLHttpRequest();
    req.open("GET", fileURL, true);
    req.send();

    req.onload = function () {
            const json = JSON.parse(req.responseText);
            contenuto_tabella = json;
            popola();       
    }

}


function popola() {
    const tabella = document.getElementById('tabella');
    tabella.innerHTML = '';


    for (let i = 0; i < contenuto_tabella.length; i++) {
        const persona = contenuto_tabella[i];
        const row = tabella.insertRow();
        row.insertCell(0).textContent = persona.nome;
        row.insertCell(1).textContent = persona.cognome;
        row.insertCell(2).textContent = persona.indirizzo;
        row.insertCell(3).textContent = persona.citta;
        row.insertCell(4).textContent = persona.cap;
    }
}