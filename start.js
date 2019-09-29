var express = require('express');
var app = express();

app.use(express.static('public')); // loads htl in browser 

//javascript from loaded browser html does its ajax work below here
var blocks = require('./routes/blocks');// all requests to the /blocks url are dispatched to the blocks router
var buildings = require('./routes/buildings');
var users = require('./routes/users');


app.use('/blocks', blocks); // all requests to the /blocks url 
app.use('/buildings', buildings);
app.use('/users', users);
// additional route mounting 

app.listen(3000, function() {
  console.log('Listening on port 3000 \n');
})