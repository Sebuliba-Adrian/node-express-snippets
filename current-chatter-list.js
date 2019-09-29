//here we shall use redis sets
//sets are lists of unique data
// add and remove members of the names set
client.sadd("name", "Dog");
client.sadd("name", "Spider");
client.sadd("name", "Gregg");

client.srem("names", "Spider"); //removes

//reply with all members of set
client.smembers("names", function(){
    console.log(names)
} );
//Returns list of unique names


