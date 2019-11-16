var axios = require("axios");
var fs = require("fs");

function Movie(movie){
    var separator = "\n\n-_-_-_-_-_-_-_-_-_-_-_-_-\n\n";
    var spacer = "\n";
    this.findMovie = function(){
        var URL = "http://www.omdbapi.com/?i=tt3896198&apikey=52d3690&t="+movie;
        axios.get(URL).then(function(response){
            var movieData = response.data;
            var movieStr = "";
            var movieObj = {
                Title: movieData.Title,
                Year: movieData.Year,
                Ratings: movieData.Ratings,
                Plot: movieData.Plot,
                Actors: movieData.Actors,
                printData: function(){
                    if(this.Ratings.length > 1){ //validates if there is a Rotten Tomatoes Review
                    movieStr = separator + "Title: " + this.Title + spacer + "Year: " + this.Year + spacer + "IMDB Rating: " + this.Ratings[0].Value + spacer + "Rotten Tomatoes: " + this.Ratings[1].Value + spacer + "Plot: " + this.Plot + spacer + "Actors: " + this.Actors + separator;
                    console.log(movieStr);
                }else {
                        movieStr = separator + "Title: " + this.Title + spacer + "Year: " + this.Year + spacer + "IMDB Rating: " + this.Ratings[0].Value + spacer + "Rotten Tomatoes : None" + spacer + "Plot: " + this.Plot + spacer + "Actors: " + this.Actors + separator;
                        console.log(movieStr);
                    };
                }
            };
            movieObj.printData();
            fs.appendFile("log.txt", movieStr , function(err) {
                if (err) throw err;
                console.log("logged movie");
              });
        
        }).catch(function(error){
            console.log(error);
        });
    };
};

module.exports = Movie;