'use strict';

const PORT = 5000;
const contactList = './contact.json';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var fs = require('fs');
var user = [];

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));


app.get('/', function (req, res) {
	var indexPath = path.join(__dirname, 'index.html');

	res.sendFile(indexPath);
});

app.post('/submit', function (req, res) {
  user.push(req.body);
  res.send(req.body)
});



var server = http.createServer(app);

server.listen(PORT, function () {
	console.log(`Server listening on port ${PORT}`);
});

