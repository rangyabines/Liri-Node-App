var token = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
 
var client = new Twitter(token.twitterKeys);
 
var params = {  screen_name: 'iRangy'};

client.get('statuses/user_timeline', params, function(error, tweets, response){
      console.log(tweets);
  if (!error) {
    console.log(error);
  }
});



 
spotify.search({ type: 'artist', query: 'song' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
    // Do something with 'data' 
});