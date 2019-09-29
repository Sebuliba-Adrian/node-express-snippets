var express = require('express');
var app = express();

var server = require('http').createServer(app); //Here create an http server and allow it to dispatch requests to express
var io = require('socket.io')(server);//allow socket.io module to use http server to listen to request
//So now both express module and socket.io are sharing the same http server 

//Listening for connection events inside the socket io . And when the client connects we are simply going to log out client conected to the console
io.on('connection', function(client) {
    console.log('Client connected...'); 
    //emit messages event on the client
    client.emit('messages', { hello: 'world'});
});

/// #2 -- server receiving messages from a client after connection
io.on('connection', function (client) {
    console.log('Client connected...');
    //Listen to messages event on the client
    client.on('messages', function(data){
       console.log(data); //listen for message events
    });
});

/// #3 -- server receiving and broadcasting messages to all other clients connected
io.on('connection', function (client) {
    console.log('Client connected...');
    //Listen to messages event on the client
    client.on('messages', function (data) {
        console.log(data); //listen for message events
        client.broadcast.emit('messages', data); //broadcast the recieved messages to all connected clients
    });
});

/// #4 -- server receiving and broadcasting ninckname and messages to all other clients connected and alo include
io.on('connection', function (client) {
    console.log('Client connected...');
   // recieve nickname of sender form the client
    client.on('join', function (name) {
        client.nickname = name;// set nickname associated with client
    });

    //before broad casting message prepend nickname. Listen to messages event on the client
    client.on('messages', function (data) {

        var nickname = client.nickname;

        client.broadcast.emit('messages', nickname + ": " + data); //broadcast the recieved messages with user name to all connected clients
        // send the message back to the sending client as well
        client.emit("messages", nickname + ": " + data);
    });
});

var messages = []; //store messages in array
var storeMessage = function(name, data) {
    messages.push({name: name, data: data}); //add message to end of array
    if(messages.lenght > 10) {
        messages.shift(); //If more than 10 messages long, remove first one
    }
}

/// #5 -- Cleaned up message #4: server receiving and broadcasting ninckname and messages to all other clients connected and alo include
io.on('connection', function (client) {
    console.log('Client connected...');
    // recieve nickname of sender form the client
    client.on('join', function (name) { // This join listener is run when a new client joins
        client.set("nickname", name);
        client.broadcast.emit("chat", name + " joined the chat");
        //client.nickname = name;// set nickname associated with client
    });

    //before broad casting message prepend nickname. Listen to messages event on the client
    client.on('messages', function (message) {
      client.get("nickname", function(error, nickname) {
          client.broadcast.emit('messages', nickname + ": " + message); //broadcast the recieved messages with user name to all connected clients
          // send the message back to the sending client as well
          client.emit("messages", nickname + ": " + message);
    });
  });
});


/// #6 -- Cleaned up and add storage of message #4: server receiving and broadcasting ninckname and messages to all other clients connected and alo include
io.on('connection', function (client) {
    console.log('Client connected...');
    // recieve nickname of sender form the client
    client.on('join', function (name) { // This join listener is run when a new client joins
        messages.forEach(function(message) {
            client.emit("messages", message.name + ": " + message.data);
        }); // iterate through messages array and emit a message on the connecting client for each one
        client.set("nickname", name);
        client.broadcast.emit("chat", name + " joined the chat");
        //client.nickname = name;// set nickname associated with client
    });

    //before broad casting message prepend nickname. Listen to messages event on the client
    client.on('messages', function (message) {
        client.get("nickname", function (error, nickname) {
            client.broadcast.emit('messages', nickname + ": " + message); //broadcast the recieved messages with user name to all connected clients
            // send the message back to the sending client as well
            client.emit("messages", nickname + ": " + message);
            storeMessage(name, message); //When client sends a message, call storeMessage: Step #1 - to add persistance
        });
    });
});

/// 
app.get('/', function(req, request) {
    res.sendFile(__dirname + '/index.html');
});
app.use(express.static('index'));
//The html we are sending through express we needs to include socket.io library

server.listen(8080);