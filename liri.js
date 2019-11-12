require("dotenv").config();
var axios = require("axios");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var fs = require("fs");
var moment = require("moment");

var nodeArgs = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

switch (nodeArgs) {

  case "concert-this":
    bandsInTown(userInput);
    break;

  case "spotify-this-song":
    spotify(userInput);
    break;

  case "movie-this":
    omdb(userInput);
    break;

  case "do-what-it-says":
    random(userInput);
    break;

  default:
    console.log("Try one of these commands: 'concert-this', 'spotify-this-song', 'movie-this', or 'do-what-it-says'.")
}

function bandsInTown(artist) {

  var artist = userInput;

  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
 
    .then(function (response) {
      console.log("Venue: " + response.data[0].venue.name);
      console.log("City: " + response.data[0].venue.city);
      console.log("Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
    });
}

function spotify(song) {
  
  var spotify = new Spotify(keys.spotify);

  if(!song) {
    song = "The Sign by Ace of Base";
  };

  spotify.search({type: "track", query: song}, function(err, data){

    if(err) {
      return console.log("Error occurred: " + err);
    }

    console.log("Name: " + data.tracks.items[0].album.artists[0].name);
    console.log("Song: " + data.tracks.items[0].name);
    console.log("Preview: " + data.tracks.items[0].href);
    console.log("Album: " + data.tracks.items[0].album.name);
  });
}

function omdb(movie) {

  if(!movie) {
    movie = "Mr. Nobody";
  }

  var movieQueryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

  axios.request(movieQueryURL).then(function (response) {

    console.log("Title: " + response.data.Title);
    console.log("Year Released: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("Country Where Produced: " + response.data.Country);
    console.log("Movie Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
  });
}
