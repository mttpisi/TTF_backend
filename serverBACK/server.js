
var express = require('express');
var path = require('path');

var app = express();
app.use('/assets', express.static(__dirname + '/../assets'));
app.use('/css', express.static(__dirname + '/../css'));
app.use('/js', express.static(__dirname + '/../js'));


app.get('/', function(req,res){
    res.sendFile(path.resolve('../index.html'));
});
app.get('/index.html', function(req,res){
    res.sendFile(path.resolve('../index.html'));
});

app.listen(3000, function () {
  console.log('Server in ascolto su 3000');
});