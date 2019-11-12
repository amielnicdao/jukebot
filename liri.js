require("dotenv").config();
var axios = require("axios");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var fs = require("fs");
var moment = require("moment");

var nodeArgs = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

  switch (nodeArgs) {
    case "spotify-this-song":
      spotify(userInput);
      break;

    case "concert-this":
      bandsInTown(userInput);
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

 