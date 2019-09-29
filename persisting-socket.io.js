
//Problem:
//currently we cannot see previous messages sent to us :(
//If some one communicates to us when we are offline we cannot see the messages that were sent in our 
//Solution:
//We need to persist these messages even when our server resstarts
//Persisting stores that have non blocking drivers include
//MongoDB
//CouchDB
//PostgresSQL
//Memcached
//Riak
//Redis -- is a key-value store

var redis = require('redis');
var client = redis.createClient();

client.set("message1", "hello, yes this is dog");
client.set("message2", "hello, no this is spider");

client.get('message1', function(){
    console.log(reply); //hello this is dog
});
//using lpush and ltrim
var message = "Hello, this is dog";
client.lpush("messages", message, function(err, reply){
    client.ltrim("messages", 0, 1); // keeps first two strings and removes the rest
});

//retriving from list
client.lrange('messages', 0, -1, function(error, messages){
    console.log(messages); //replies with all strings in list
})

///CONVERTING MESSAGES TO REDIS

var redisClient = redis.createClient();

//PERMANENTLY STORE A MESSAGE ALONG WITH NAME HERE IN REDIS EVERY AFTER A MESSAGE BROADCAST
var storeMessage = function(name, data) {
    var message = JSON.stringify({name: name, data: data}); // Need to turn object into sttring to stroe in redis

    redisClient.lpush("message", message, function() {
        redisClient.ltrim("messages", 0, 9); //keep newest 10 messages
    })
}

//OUTPUT FROM LIST WHEN USER JOINS FOR FIRST TIME

io.on('connection', function (client) {
    console.log('Client connected...');
    redisClient.lrange("messages", 0. -1, function(err, message) {
      messages = messages.reverse(); //reverse so they are emitted
        messages.forEach(function (message) {
            message = JSON.parse(message);
            client.emit("messages", message.name + ": " + message.data);

    })
    });

});

//ADDING CHATTERS

client.on('join', function(name) {
    //notify other clients a chatter has joined
    client.broadcast.emit("add chatter", name); // broadcast yourself
    redisClient.sadd("chatters", name) //add name to chatter set
}); // add name to chatter set, also add chatter listener to client

///Notify the currently logged in chatter of the already available chatters

client.on('join', function (name) {
    //notify other clients a chatter has joined
    client.broadcast.emit("add chatter", name); // broadcast yourself
   redisClient.smembers('names', function(err, name){
     names.forEach(function(name){
        client.emit('add chatter', name);
     }); //emit all currently logged in chatters to newly connected client
   });


    redisClient.sadd("chatters", name) //add name to chatter set
}); // add name to chatter set, also add chatter listener to client


///REMOVING CHTTERS zWHEN THEY DISCONNECT FROM SERVER 
client.on('disconnect', function(name){
    client.get('nickname', function(err, name){
        client.broadcast.emit("remove chatter",  name);
        redisClient.srem("chatters", name);
    }) // indicate in index.html

})
