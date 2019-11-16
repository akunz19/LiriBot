var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

function Concert(artist){
    var separator = "\n\n-_-_-_-_-_-_-_-_-_-_-_-_-\n\n";
    var spacer = "\n";
    this.findConcert = function(){
        var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        axios.get(URL).then(function(response){
            var concertData = response.data;
            var concertStr = "";
            var concertObj = {
                venueName: concertData[0].venue.name,
                venueCountry: concertData[0].venue.country,
                venueRegion: concertData[0].venue.region,
                venueCity: concertData[0].venue.city,
                date: concertData[0].venue.datetime,
                printData: function(){
                    if(this.venueCountry=== "United States"){
                    var venueLocation = this.venueCity + ", " + this.venueRegion + ", " + this.venueCountry;
                    console.log(separator,"Venue:", this.venueName, spacer, "Location:", venueLocation, spacer, "Date:", moment(this.date).format("MM/DD/YYYY"), separator);
                    concertStr = separator + "Venue:" + this.venueName + spacer + "Location:" + venueLocation + spacer + "Date:" + moment(this.date).format("MM/DD/YYYY") + separator;
                    } else {
                        var venueLocation = this.venueCity + ", " + this.venueCountry;
                        concertStr = separator + "Venue: " + this.venueName + spacer + "Location: " + venueLocation + spacer + "Date: " + moment(this.date).format("MM/DD/YYYY") + separator;
                        console.log(concertStr);
                    };
                }
            };
            concertObj.printData();
            fs.appendFile("log.txt", concertStr , function(err) {
                if (err) throw err;
                console.log("logged concert");
              });
        
        }).catch(function(error){
            console.log(error);
        });
    };
};


module.exports = Concert;