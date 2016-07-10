var keys = require("./keys.js");
var Twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");          
var fs = require("fs");

var client = new Twitter(keys.twitterKeys);

var action = process.argv[2];
var result = process.argv[3];

if (action == "my-tweets") {
  twitter();
}
if (action == "spotify-this-song") {
  spotify();
}
if (action == "movie-this") {
  movie();
}
if (action == "do-what-it-says") {
  doIt();
}

//This will show the last 20 tweets.
function twitter() {

  var params = {screen_name: "iRangy", count: 20};

  client.get("statuses/user_timeline", params, function(error, tweets, response) {

    if (!error && response.statusCode == 200) {

      fs.appendFile("log.txt", "\n");
      for (var i = 0; i < tweets.length; i++) {
        console.log("=========================================================");
        console.log("Created at: " + tweets[i].created_at);
        console.log("Tweet: " + tweets[i].text);
        console.log("=========================================================");
        fs.appendFile("log.txt", tweets[i].text + "\n");
      }
    }
  });
}

//This shows the information about the song.
function spotify() {

  if (!result) {
    result = "what's my age again"; //default song if song is not provided.
  }

  spotify.search({ type: "track", query: result }, function(error, data) {
      
      if (!error) {
      
      fs.appendFile("log.txt", "\n");
      console.log("Album Name: " + data.tracks.items[0].album.name);
      console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
      console.log("Track Name: " + data.tracks.items[0].name);
      console.log("Preview URL: " + data.tracks.items[0].preview_url);
      fs.appendFile("log.txt",  "Album Name: " + data.tracks.items[0].album.name);
      fs.appendFile("log.txt",  "Artist Name: " + data.tracks.items[0].artists[0].name);
      fs.appendFile("log.txt",  "Track Name: " + data.tracks.items[0].name);
      fs.appendFile("log.txt",  "Preview URL: " + data.tracks.items[0].preview_url);
    }
  });
}

//This shoes the movie information.
function movie() {

  if (!result) {
    result = "Mr. Nobody"; //default movie if movie is not provided.
  }
  
  var queryUrl = "http://www.omdbapi.com/?t=" + result +"&y=&plot=short&tomatoes=true&r=json";

  request(queryUrl, function(error, response, body) {

    if(!error && response.statusCode == 200 && JSON.parse(body)["Response"] == "True") {

      console.log("Title: " + JSON.parse(body)["Title"]);
      console.log("Year: " + JSON.parse(body)["Year"]);
      console.log("IMDB RatingL " + JSON.parse(body)["imdbRating"]);
      console.log("Country: " + JSON.parse(body)["Country"]);
      console.log("Language: " + JSON.parse(body)["Language"]);
      console.log("Plot: " + JSON.parse(body)["Plot"]);
      console.log("Actors: " + JSON.parse(body)["Actors"]);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);

      fs.appendFile("log.txt", "\n");
      fs.appendFile("log.txt", "Title: " + JSON.parse(body)["Title"]);
      fs.appendFile("log.txt", "Year: " + JSON.parse(body)["Year"]);
      fs.appendFile("log.txt", "IMDB RatingL " + JSON.parse(body)["imdbRating"]);
      fs.appendFile("log.txt", "Country: " + JSON.parse(body)["Country"]);
      fs.appendFile("log.txt", "Language: " + JSON.parse(body)["Language"]);
      fs.appendFile("log.txt", "Plot: " + JSON.parse(body)["Plot"]);
      fs.appendFile("log.txt", "Actors: " + JSON.parse(body)["Actors"]);
      fs.appendFile("log.txt", "Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);

    }
    else if (!error && response.statusCode == 200) {
      console.log(JSON.parse(body)["Error"]);
    }
    else {
      console.log(error);
    }
  });
}

function doIt() {
  fs.readFile("random.txt", "utf8", function(error, data) {

    dataArr = data.split("\n");

    action = dataArr[0];
    result = dataArr[1];

     if (action == "my-tweets") {
      twitter();
    }

    if (action == "spotify-this-song") {
      spot();
    }
    if (action == "movie-this") {
      movie();
    }
  });
}
