var express = require('express');
var app = express();
var request = require('request');
var url = require('url');

app.get('/tweets/:username', function(req, response){
    var username = req.params.username;

    options = {
        protocol: "http:",
        host: 'api.twitter.com',
        pathname: '/1/statuses/user_time.json',
        query: { screen_name: username, count:10 }

    }
    var twitterUrl = url.format(options);
    request(twitterUrl).pipe(response);
});
app.listen(8000, function(){
    console.log("Listening to port 8000");
});
///curl -s http://localhost:8000/tweets/eallam