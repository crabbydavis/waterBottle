var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); // Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/glucoseDB'); // Connects to a mongo database called "commentDB"

var glucoseSchema = mongoose.Schema({ // Defines the Schema for this database
  Amount: String
});

var Glucose = mongoose.model('Glucose', glucoseSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { // Lets us know when we're connected
  console.log('Connected');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: 'public' });
});

router.post('/glucoseAmount',function(req,res,next) {
  console.log("POST glucose route");
  console.log(req.body);

  var newglucose = new Glucose(req.body);
  console.log(newglucose);
  newglucose.save(function(err, post) {
    if (err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  });
});

router.get('/glucoseAmount',function(req,res,next) {
  console.log("In the GET route");
  Glucose.find(function(err,glucoseList) { //Calls the find() method on db
    if (err) return console.error(err); //If there's an error, print it out
    else {
      console.log(glucoseList); //Otherwise console log the comments you found
      res.json(glucoseList);
    }
  })
});

router.delete('/glucoseAmount',function(req,res,next) {
  Glucose.collection.remove({});
  res.sendStatus(200);
});

module.exports = router;
