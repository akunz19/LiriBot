# LiriBot
## Lanuage Interpretation Recognition Interface

This CLI app uses the Spotify node module, OMDB API, and bandsintown API to enable users to get information on movies, songs, and upcoming concerts.

Technologies Used:

Spotify NPM module
axios NPM module
FS module
moment.js module
OMDB API
bandsintown API

Commands:

spotify-this-song: This command uses the findTrack() function and the Spotify Search method and queries the top result for a song based on the title. This command returns the song title, the album the track is from, the artists on the track, and the Spotify link.


ex: node liri spotify-this-song "Under Pressure"

movie-this: This command uses Movie function inside of the the movie.js module to query the OMDB api using axios to find movie information based on the title. This command returns the movie title, year released, IMDB and Rotten Tomatoes ratings, plot, and the actors who starred in the movie. 

ex: node liri movie-this "The Lion King"

concert-this: This command uses the Concert function inside of the concert.js module to query the bandsintown api using axios to find the next upcoming concert based on the artist name searched. This will return the name of the venue, location, and the date in MM/DD/YYYY format using moment.js. 

ex: node liri concert-this "Lizzo"

do-what-it-says: This reads the string stored in random.txt and executes it, if it is not a valid command it will console log "Invalid Command".

ex: node liri do-what-it-says