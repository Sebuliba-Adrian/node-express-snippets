var express = require('express');
var router = express.Router(); //returns a router instance which can be be mounted as a middleware
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its centre'
};

router.route('/') //the root path relative to the spthwhrw ots mounted , app.use('/blocks', ...), mounted on the /blocks path
  .get(function (request, response) {

  })
  .post(parseUrlencoded, function(response, request) {
  })

  //For dynamic routes
  router.route('/:name')
     .all(function (request, response, next){ // equivalent to app.param('name/', ...)
         var name = request.param.name;
         var block = name[0].toUpperCase() + name.slice(1).toLocaleLowerCase();
         request.blockName = block;
         next();
     }).get(function(request, response){

     })
     .delete(function(){

     });

module.exports = router; //exports the router as a Node module