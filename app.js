var express = require('express');
var app = express();

app.get('/', function(request, response){
    var blocks = ['Fixed', 'Movable', 'Rotating'];
    response.send(blocks);

});
app.get('/blocks', function (request, response) {
    response.redirect(301, '/parts');
});

app.get('/public1', function(request, response) {
      response.sendFile(__dirname + '/public/index.html');
});
app.use(express.static('public')); // defaults to serving the index.html file

app.get('/blocksz', function (request, response) {

    var blocks = ['Fixed', 'Movable', 'Rotating'];
    response.send(blocks);
});

app.delete('/blocks/:name', function(){
    delete blocks[request.blockName]; // removes entry from block object
    response.sendStatus(200);
});

/////////////NOTE THE DUPLICATION ABOVE////
//delete request <---> get single: post <----> get all
app.get('/blocks', function(request, response) {
    
});

app.get('/blocks/:name', function (request, response) {

});

app.post('/blocks', parseUrlencoded, function(request, response){

});

app.delete('/blocks/:name', function(request, response){})

////Replacing repetition with a route instance
// using app.route is recommended approach for avoiding duplicate route names

var blockRoute = app.route('/blocks'); //handle all requests to the /blocks path

blockRoute.get(function(request, response) {})
blockRoute.post(parseUrlencoded, function (request, response) { })

//Chaining function - Imagine file starts here

var app = express();

app.route('/blocks')
   .get(function(request, response) {

   })
   .post(parseUrlencoded, function(){

   });

   //And for the second set of routes

   app.route('/blocks/:name')
    .get(function(request, response) {
        
    })
    .delete(function(request, response) {

    });

    ////Extracting routes to modules since file is getting too long hence code smells

    var express = require('express');
    var app = express();

    app.use(express.static('public'));

    var blocks = require('./route/blocks');

    app.use('/blocks', blocks);




app.listen(3000, function() {
    console.log('Listening on port 3000');
});
