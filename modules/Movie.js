const superagent = require('superagent');
require('dotenv').config();
const MOVIE_KEY = process.env.MOVIE_KEY;

class Movies {
  constructor(movieConst) {
    this.title = movieConst.title;
    this.poster = movieConst.poster_path;
    this.overview = movieConst.overview;
    this.vote_count = movieConst.vote_count;
    this.release_date = movieConst.release_date;
  }
}

const inMemory = {};

const movieFunc = (req, res) => {
let myKeyValue = req.query.query;
  myAPIObj = {
    api_key: MOVIE_KEY,
    query: req.query.query,
    limit: 8
  }
  const movie_URL = `https://api.themoviedb.org/3/search/movie`;
if(myKeyValue in inMemory){
   res.send(inMemory[req.query.query]);
}
else
superagent.get(movie_URL).query(myAPIObj).then(dataBitMovie => {
  const movieData = dataBitMovie.body.results.map(element => new Movies(element));
  inMemory[myKeyValue] = movieData;
  res.send(inMemory[myKeyValue]);
}).catch(console.error);

}


module.exports = movieFunc;