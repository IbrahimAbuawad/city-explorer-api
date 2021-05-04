const express = require('express');
const data = require('./data/weather.json');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.get('/', function (req, res) {
 
  res.send('Hello world');
});

app.get('/weather', function (req, res) {
  const weather = data.data.map(element => new Weather(element));
  res.send(weather);
});

class Weather {
  constructor(weatherData) {
    this.date = weatherData.valid_date;
    this.description = weatherData.weather.description;
  }
}
app.listen(PORT);


