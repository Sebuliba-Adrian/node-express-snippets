var http = require('http');
var EventEmmiter = require('events').EventEmitter;

var logger = new EventEmmiter();

logger.on('error', function(message){
    console.log('ERR: ' + message);
})

logger.emit('error', 'Spilled Milk');
////for server code
var server = http.createServer();

server.on('request', function(request, response){
})
//server is an event emmiter in disguize
//The above is how you would add event listener to node
//Create an echo server

http.createServer(function(request, response) {
    response.writeHead(200);
    request.pipe(response);

}).listen(8080);

//$curl -d 'hello' http://localhost:8080

var fs = require('fs');

var file = fs.createReadStream("readme.md");
var newFile = fs.createWriteStream("readme_copy.md");
file.pipe(newFile);

///Uplaod a file

var fs = require('fs');
var http = require('http');

http.createServer(function(request, response) {

    var newFile = fs.createWriteStream("readme_copy.md");
    request.pipe(newFile);

    request.on('end', function(){
        response.end('uploaded!');
    })
 // curl --upload-file readme.md http://localhost:8080
}).listen(8080);


http.createServer(function(request, response){
    response.writeHead(200);
    response.write("Hello, this is dog");
    response.end();
}).listen(8080);

console.log('listening on port 8080...');
//Known registered events
//request
//connection
//close
//checking for events


