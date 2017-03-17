

/**
 * Base Setup In our base setup, 
 * we pull in all the packages we pulled in using npm.
 * We’ll grab express, define our app, get bodyParser and configure our app to use it.
 * We can also set the port for our application.
 */
var express = require('express');

var app = express();

var bodyparser = require('body-parser');


// configure app to use bodyParser()
// this will let us get the data from a POST

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

var port = process.env.PORT || 8180; 

// ROUTES FOR OUR API
var router = express.Router();

router.get('/', function(req,res) {
    res.json({message: 'Welcome To Express Router'});
});

router.get('/new', function(req,res) {
    res.json({message: 'Welcome To New Router'});
});



app.use('/api',router);

app.use('/api/new',router);

app.listen(port);

console.log('Server is listen on' + port);