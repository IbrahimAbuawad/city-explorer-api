const superagent = require('superagent');
require('dotenv').config();
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;

class Weather {
    constructor(weatherData) {
        this.date = weatherData.valid_date;
        this.description = weatherData.weather.description;
    }
}

const inMemory = {};

const weatherFunc = (req, res) => {

    myAPIObj = {
        key: WEATHER_BIT_KEY,
        lat: req.query.lat,
        lon: req.query.lon
    }
    const weatherBit = `https://api.weatherbit.io/v2.0/forecast/daily`;

    if (inMemory[`${req.query.lat}-${req.query.lon}`]) {
        console.log('cache hit');

        res.send(inMemory[`${req.query.lat}-${req.query.lon}`]);

    }
    else {
        console.log('cache miss');
        superagent.get(weatherBit).query(myAPIObj).then(dataBit => {
            const weatherBitData = dataBit.body.data.map(element => new Weather(element));
            inMemory[`${req.query.lat}-${req.query.lon}`] = weatherBitData;
            res.send(weatherBitData);
        }).catch(console.error);
    }


}


module.exports = weatherFunc;