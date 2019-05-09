//fetch del db.json(fetch ha per forza bisogno di un server, anche per risorse locali)
var getDbUtenti = fetch("http://localhost:3000/js/db.json",{headers:{'content-type':'application/json'}})
.then(function(response){
    //se si verifica un errore stampa in console il codice e la stringa relativa all'errore
    if(!response.ok){
        throw new Error(response.status + " : " + response.statusText)
    }
    //ritorna il body della risposta come json
    return response.json();
}).then(function(data){
    //riempi le card con i relativi dati dei contatti ottenuti
    console.log(data);
    fillContacts(data.preiscritti);
});

function fillContacts(users){
    let divContacts = document.getElementById("contacts");
    for(i=0;i<users.length;i++){
        //controllo se sto inserendo il 4 elemento in una riga. Se si, creo una nuova riga
        if(i%3 == 0){
            let row = document.createElement("div");
            row.className = "row mb-2";
    
            let col = document.createElement("div");
            col.className = "col-md-4";
    
            col.appendChild(createContact(users[i]));
    
            row.appendChild(col);
            divContacts.appendChild(row);
        }else{
            let lastRow = divContacts.lastChild;
            let col = document.createElement("div");
            col.className = "col-md-4";
            
            col.appendChild(createContact(users[i]));
            lastRow.appendChild(col);
        }
    }
}

function createContact(userData){
    let card = document.createElement("div");
    card.className = "card";
    let cardBody = document.createElement("div")
    cardBody.className = "card-body";

    let cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.innerHTML = userData.nome + " " + userData.cognome;
    let cardText = document.createElement("p");
    cardText.className = "card-text";

    let lTel = document.createElement("label");
    lTel.innerHTML = "Telefono : " + userData.telefono;
    let br = document.createElement("br");
    let lEmail = document.createElement("label");
    lEmail.innerHTML = "Email : " + userData.email;

    let cardBtn = document.createElement("a");
    cardBtn.className = "btn btn-primary";
    cardBtn.innerHTML = "Dettagli";

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardText.appendChild(lTel);
    cardText.appendChild(br);
    cardText.appendChild(lEmail);
    cardBody.appendChild(cardBtn);
    card.appendChild(cardBody);
    document.body.appendChild(card);

    return card;
}