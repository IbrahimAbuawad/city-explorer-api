const express = require('express');
// const data = require('./data/weather.json');
const superagent = require('superagent');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT;
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const MOVIE_KEY = process.env.MOVIE_KEY;
app.use(cors());
app.get('/', function (req, res) {

  res.send('Hello world');
});

app.get('/weather', function (req, res) {

  const weatherBit = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;

  superagent.get(weatherBit).then(dataBit => {
    const weatherBitData = dataBit.body.data.map(element => new Weather(element));
    res.send(weatherBitData);
  }).catch(console.error);

});

app.get('/movie', function (req, res) {

  const movie_URL = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_KEY}&query=${req.query.query}&limit=8`;

  superagent.get(movie_URL).then(dataBitMovie => {
    const movieData = dataBitMovie.body.results.map(element => new Movies(element));
    res.send(movieData);
  }).catch(console.error);

});

class Weather {
  constructor(weatherData) {
    this.date = weatherData.valid_date;
    this.description = weatherData.weather.description;
  }
}


class Movies {
  constructor(movieConst) {
    this.title = movieConst.title;
    this.poster = movieConst.poster_path;
    this.overview = movieConst.overview;
    this.vote_count = movieConst.vote_count;
    this.release_date = movieConst.release_date;
  }
}
app.listen(PORT);


