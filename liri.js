var token = require('./keys.js');
var Twitter = require('twitter');
 
var client = new Twitter(token.twitterKeys);
 
var params = {  screen_name: 'iRangy', 
                count: 20 
             }
client.get('statuses/user_timeline', params, function(error, tweets, response){
      console.log(tweets);
  if (!error) {
    console.log(error);
  }
});