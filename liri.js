require("dotenv").config();
var fs = require("fs");
var Movie = require("./movie.js");
var Concert = require("./concert.js");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var query = process.argv[3];
var command = process.argv[2];
var queryMovie = new Movie(query);
var queryConcert = new Concert(query);
var separator = "\n\n-_-_-_-_-_-_-_-_-_-_-_-_-\n\n";
var spacer = "\n";

function findTrack() {
  spotify
    .search({ type: "track", query: query, limit: 5 })
    .then(function(response) {
      var artistArray = [];
      var spotifyStr;
      var artistStr;
      var trackData = response.tracks.items[0];
      var spotifyData = {
        trackName: trackData.name,
        trackAlbum: trackData.album.name,
        trackArtist: function() {
          var separator = "\n\n-_-_-_-_-_-_-_-_-_-_-_-_-\n\n";
          var artistText = "Artist: ";
          if (trackData.artists.length > 1) {
            for (var i = 0; i < trackData.artists.length; i++) {
              // console.log("inside for loop");
              artistArray.push(artistText + trackData.artists[i].name);
            }
            artistStr = artistArray.join("\n");
          } else {
            artistStr = artistText + trackData.artists[0].name;
          }
        },
        trackLink: trackData.external_urls.spotify,
        printData: function() {
          this.trackArtist();
          var name = "Name: " + this.trackName + spacer;
          var album = "Album: " + this.trackAlbum + spacer;
          var link = spacer + "Link: " + this.trackLink;
          spotifyStr = separator + name + album + artistStr + link + separator;
          console.log(spotifyStr);
        }
      };
      spotifyData.printData();
      fs.appendFile("log.txt", spotifyStr, function(err) {
        if (err) throw err;
        console.log("logged song");
      });
    })
    .catch(function(err) {
      console.log(err);
    });
}

if (command === "spotify-this-song") {
  findTrack();
} else if (command === "movie-this") {
  queryMovie.findMovie();
} else if (command === "concert-this") {
  queryConcert.findConcert();
} else if (command === "do-what-it-says") {
  console.log("inside do what it says");
  try {
    var randCommand;
    var data = fs.readFileSync("random.txt", "utf8");
    var dataStr = data.toString();
    var dataArray = dataStr.split(",");
    randCommand = dataArray[0];
    query = dataArray[1];
    if (randCommand) {
      findTrack();
    }
  } catch (err) {
    console.error(err);
  }
} else {
  console.log("invalid command");
}
