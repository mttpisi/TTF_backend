//richiedi pacchetti e definisci porta e server
var qs = require('querystring');
/* var qs = require('qs');*/
const uuidv1 = require('uuid/v1');
var mongoClient = require('mongodb').MongoClient;
var express = require('express');
var path = require('path');

//richiamando le variabili d'ambiente nel file .env
var dotenv = require('dotenv');
dotenv.config();

var app = express();


//definisci i percorsi delle risorse statiche
app.use('/assets', express.static(__dirname + '/../assets'));
app.use('/css', express.static(__dirname + '/../css'));
app.use('/js', express.static(__dirname + '/../js'));

//routing di base
app.get('/', function(req,res){
    res.sendFile(path.resolve(__dirname + "/../index.html"));
});
app.get('/index.html', function(req,res){
    res.sendFile(path.resolve(__dirname + "/../index.html"));
});
app.get('/landing.html', function(req,res){
	res.sendFile(path.resolve(__dirname + "/../landing.html"));
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
        let userData = qs.parse(item);
        console.log(userData);
        //crea un token univoco in base al timestamp tramite uuidv1
        userData.token = uuidv1();
        /* console.log(userData); */
        //il server prova a connettersi al server mongodb(locale)
        mongoClient.connect("mongodb://" + process.env.MONGODB_URL + ":" + process.env.MONGODB_PORT + "/backofficeDB",function(err,client){
            //se non ci sono errori procede, se no risponde con un errore
            if(!err){
                //ricava il database
                let db = client.db('backofficeDB');
                //inserisci un documento nella collezione 'regOpenDay'
                db.collection('regOpenDay').insertOne(userData,{w:1},function(err,result){
                    //se non ci sono errori procede, se no risponde con un errore
                    if(!err){
                        //chiudi la connessione e reindirizza il client alla landing
                        client.close();
                        res.redirect('landing.html');
                    }else{
                        //chiudi la connessione e mostra un errore
                        client.close();
                        res.send('Si è verificato un errore inaspettato');
                    }
                });
            }else{
                //chiudi la connessione e mostra un errore
                console.log(err);
                res.send('Si è verificato un errore inaspettato');
            }
        });
	});
});

//Dichiara il server in ascolto sulla porta(definita in precedenza)
app.listen(process.env.PORT, function () {
  console.log('Server in ascolto su ' + process.env.PORT);
});