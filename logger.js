//We assign our logger function to module.exports in order to export it as a Node module and make it accessibe from other files 
//This is the CommonJS specification
module.exports = function(request, response, next) {
 var start = +new Date();
 var stream = process.stdout;
 var url = request.url;
 var method = request.method;

 response.on('finish', function() { //finish event is emitted when the response has been handed off of the OS 
    var duration = +new Date() - start;
    var message = method + 'to' + url +
        '\ntook' + duration + 'ms \nn';
        stream.write(message);

 });

 next();
}