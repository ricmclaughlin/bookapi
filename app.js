var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var dbConnectionString;

if (process.env.ENV == 'Test') {
  dbConnectionString = 'mongodb://localhost/bookAPI_test';
} else if (process.env.ENV == 'Dev') {
  dbConnectionString = 'mongodb://localhost/bookAPI';
}
var dbConnectionString = process.env.dbConnectionString || dbConnectionString;

var db = mongoose.connect(dbConnectionString);

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var Book = require('./models/bookModel');
var bookRouter = require('./routes/bookRoute')(Book);

app.use('/api/books', bookRouter);

app.get('/', function (req, res) {
  res.send('welcome to my api');
});

app.listen(PORT, function () {
  console.log('Running on PORT: ' + PORT);
});

module.exports = app;
