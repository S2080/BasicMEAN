/**
 * This is the file where we will:
----------- Configure our application
----------- Connect to our database
----------- Create our Mongoose models
----------- Define routes for our RESTful API
----------- Define routes for our frontend Angular application
----------- Set the app to listen on a port so we can view it in our browser
 */

var express = require('express');
var app = express(); // Create our app express
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var shortid = require('shortid');

// configuration =================

mongoose.connect('mongodb://localhost:27017/ToDo');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on local host dat port 8080");


// Define ToDo Model ===========

var ToDo = mongoose.model('ToDo', {
    text: String,
    id: String
});

/**
 *  -----------|---------------------|-------------------------
 *  HTTP Verb  |   URL               |  Description
    -----------|---------------------|-------------------------
    GET	       | /api/todos	         | Get all of the todos
    POST	   | /api/todos	         | Create a single todo
    DELETE	   | /api/todos/:todo_id | Delete a single todo
    -----------------------------------------------------------
 */
// http://localhost:8080/api/todos/B1c1tcMcg
// http://localhost:8080/api/todos
// routes
app.get('*', function (req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
app.get('/api/todos', function (request, response) {
    //use mongoose to get all the todos
    ToDo.find(function (err, todos) {
        if (err) {
            response.send(err);
        } else {
            response.json(todos);
        }
    });
});

// create todo and send back all todos after creation
app.post('/api/todos', function (request, response) {
    var id = shortid.generate();
    ToDo.create({
        text: request.body.text,
        id: id,
        done: false
    }, function (err, todo) {
        if (err) {
            response.send(err);
        } else {
            ToDo.find(function (err, todos) {
                if (err) {
                    response.send(err)
                } else {
                    response.json(todos);
                }
            });
        }
    });
});


// delete API
app.delete('/api/todos/:id', function (request, response) {
    ToDo.remove({
        id: request.params.id
    }, function (err, todos) {
        if (err) {
            response.send(err);
        } else {
            ToDo.find(function (err, todos) {
                if (err) {
                    response.send(err)
                } else {
                    response.json(todos);
                }
            });
        }
    });
});