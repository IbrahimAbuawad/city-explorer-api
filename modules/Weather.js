const superagent = require('superagent');
require('dotenv').config();
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;

class Weather {
    constructor(weatherData) {
        this.date = weatherData.valid_date;
        this.description = weatherData.weather.description;
    }
}

const weatherFunc = (req, res) => {

    const weatherBit = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;

    superagent.get(weatherBit).then(dataBit => {
        const weatherBitData = dataBit.body.data.map(element => new Weather(element));
        res.send(weatherBitData);
    }).catch(console.error);

}


module.exports = weatherFunc;