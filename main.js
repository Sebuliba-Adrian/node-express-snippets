var express = require('express');

var app = express();
var logger = require('./logger');
//More a more complete logging system use morgan 
app.use(logger);
app.use(express.static('public'));
app.get('/blocks', function (request, response) {

    var blocks = ['Fixed', 'Movable', 'Rotating'];
    response.json(blocks);
});



//Reading query string parameters
//use request.query to access query strings 
app.get('/blocks', function (request, response) {
    var blocks = ['Fixed', 'Movable', 'Rotating'];
    if(request.query.limit >= 0) {
        response.json(blocks.slice(0,request.query.limit))
    } else {
        response.json(blocks);
    }
});

// $curl http://localhost:3000/blocks?limit=1  returns -> ['fixed']
// $curl http://localhost:3000/blocks?limit=2  returns -> ['fixed', 'movable']
// $curl http://localhost:3000/blocks          returns -> ['fixed', 'movable', 'rotating']

//Returning description for a specific block
//We can use meaningful URLs to return the description for specific types of Blocks
//GET to /blocks/Fixed ---->
//response: <---- "fastened securely in position"
//In order to store additional info on blocks, 
//well move from an Array to a Javascript object
var blocks = {
    'Fixed': 'Fastened securely in postion',
    'Movable': 'Capable of being moved',
    'Rotating': 'moving in a circle around its center'
};
app.get('/blocks/:name', function(request, response) {
  var description = blocks[request.params.name];
  if(!description) { // returns undefined if item specified  in dynamic param does not exist
      response.status(404).json('No description found for ' + request.params.name);
  }
    response.json(description); //defaults to 200 success
})

// $curl -i http://localhost:300/blocks/Fixed
// HTTP/1.1 200 OK
// "Fastened securely in position"
//
// $curl -i http://localhost:300/blocks/Movable
// HTTP/1.1 200 OK
// "Capable of being moved"
//
// $curl -i http://localhost:300/blocks/Banana
// HTTP/1.1 404 Not Found
// "No description found for Banana"

app.get('/blocks/:name', function (request, response) {
    var name = request.params.name;
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
    var description = blocks[block];
    var description = blocks[request.params.name];
    if (!description) { // returns undefined if item specified  in dynamic param does not exist
        response.status(404).json('No description found for ' + request.params.name);
    }
    response.json(description); //defaults to 200 success
})

// $curl -i http://localhost:300/blocks/Fixed
// HTTP/1.1 200 OK
// "Fastened securely in position"
//
// $curl -i http://localhost:300/blocks/Movable
// HTTP/1.1 200 OK
// "Capable of being moved"
//
// $curl -i http://localhost:300/blocks/Banana
// HTTP/1.1 404 Not Found
// "No description found for Banana"

var locations = {
    'Fixed': 'Fisrt floor', 'Movable': 'Second floor', 'Rotating': 'Penthouse'
}

app.param('name', function(request, response, next) {
    var name = request.params.name;
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
    request.blockName = block; // this makes it so that block name can be accessed by all routes in the application
    next();
})

app.get('/blocks/:name', function (request, response) {
    var description = blocks[request.blockName];

    if (!description) { // returns undefined if item specified  in dynamic param does not exist
        response.status(404).json('No description found for ' + request.params.name);
    }
    response.json(description); //defaults to 200 success
})

app.get('/locations/:name', function (request, response) {
    var location = locations[request.blockName];

    if (!location) { // returns undefined if item specified  in dynamic param does not exist
        response.status(404).json('No description found for ' + request.params.name);
    }
    response.json(location); //defaults to 200 success
});

// $curl -i http://localhost:300/blocks/Fixed
// HTTP/1.1 200 OK
// "Fastened securely in position"
//
// $curl -i http://localhost:300/locations/Movable
// HTTP/1.1 200 OK
// "first floor"
//
// $curl -i http://localhost:300/blocks/Banana
// HTTP/1.1 404 Not Found
// "No description found for Banana"

app.get('/blocks', function(){
    response.json(Object.keys(blocks));
});

//parsing depends on a middleware not shpped with Express
//$npm install body-parser
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

var blocks = { ... };

app.post('/blocks', parseUrlencoded, function(request, response) {
    var newBlock = request.body;
    blocks[newBlock.name] = newBlock.description;
    response.status(201).json(newBlock.name); //responds with new block name and 201 status code
})


app.listen(3000, function(){
    console.log('Listening on port 3000');
});