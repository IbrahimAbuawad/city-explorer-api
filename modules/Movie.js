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

  const movieFunc = (req, res)=> {

    const movie_URL = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_KEY}&query=${req.query.query}&limit=8`;
  
    superagent.get(movie_URL).then(dataBitMovie => {
      const movieData = dataBitMovie.body.results.map(element => new Movies(element));
      res.send(movieData);
    }).catch(console.error);
  
  }


module.exports = movieFunc;