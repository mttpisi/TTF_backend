//richiedi pacchetti e definisci porta e server
/* var qs = require('querystring'); */
var qs = require('qs');
const uuidv1 = require('uuid/v1');
var mongoClient = require('mongodb').MongoClient;
var express = require('express');
var path = require('path');

//richiamando le variabili d'ambiente nel file .env
var dotenv = require('dotenv');
dotenv.config();

var app = express();


//definisci i percorsi delle risorse statiche
app.use('/assets', express.static(__dirname + '/../../TTF_preiscrizione/public/assets'));
app.use('/css', express.static(__dirname + '/../../TTF_preiscrizione/public/css'));
app.use('/js', express.static(__dirname + '/../../TTF_preiscrizione/public/js'));

//routing di base
app.get('/', function(req,res){
    res.sendFile(path.resolve(__dirname + "/../../TTF_preiscrizione/public/index.html"));
});
app.get('/index.html', function(req,res){
    res.sendFile(path.resolve(__dirname + "/../../TTF_preiscrizione/public/index.html"));
});
app.get('/anagrafica.html', function(req,res){
	res.sendFile(path.resolve(__dirname + "/../../TTF_preiscrizione/public/anagrafica.html"));
});
app.get('/creaAccount.html', function(req,res){
	res.sendFile(path.resolve(__dirname + "/../../TTF_preiscrizione/public/creaAccount.html"));
});
app.get('/landing1.html', function(req,res){
	res.sendFile(path.resolve(__dirname + "/../../TTF_preiscrizione/public/landing1.html"));
});
app.get('/landing2.html', function(req,res){
	res.sendFile(path.resolve(__dirname + "/../../TTF_preiscrizione/public/landing2.html"));
});
app.get('/landing3.html', function(req,res){
	res.sendFile(path.resolve(__dirname + "/../../TTF_preiscrizione/public/landing3.html"));
});
app.get('/landingEmail.html', function(req,res){
	res.sendFile(path.resolve(__dirname + "/../../TTF_preiscrizione/public/landingEmail.html"));
});
//gestione delle richieste POST

///////////////////////////////////////////////////////PREREGISTER
app.post('/preregister',function(req,res){
    let item = "";
    //finchè riceve dati, il server ricostruisce il contenuto ricevuto dal post all'interno di una variabile item
	req.on('data', function (chunk) {
        item += chunk;
    });
    //quando finisce di ricevere i dati, esegui i seguente codice
    req.on('end', function () {
        //inserisce in userData i dati, sottoforma (parse) di JSON
        let userData = JSON.parse(item);
        //let userData = qs.parse(item);
        console.log(userData.nome);
        //crea un token univoco in base al timestamp tramite uuidv1
        userData.token = uuidv1();
        /* console.log(userData); */
        //il server prova a connettersi al server mongodb(locale)
       res.json({token:userData.token});
	});
});

//Dichiara il server in ascolto sulla porta(definita in precedenza)
app.listen(process.env.PORT, function () {
  console.log('Server in ascolto su ' + process.env.PORT);
});