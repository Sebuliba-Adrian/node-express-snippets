var hello = function() {
    console.log("hello!");
}

module.exports = hello;

//inside app.js

var hello = require('./module');

hello();

///Approach 2

exports.goodbye = function() {
    console.log("Bye!");
}

gb.goodbye();
