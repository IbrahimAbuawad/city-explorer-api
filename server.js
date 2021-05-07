const express = require('express');
const cors = require('cors');
require('dotenv').config();

const movieFunc = require('./modules/Movie');
const weatherFunc = require('./modules/Weather');

const PORT = process.env.PORT;

const app = express();
app.use(cors());



app.get('/weather', weatherFunc);


app.get('/movie', movieFunc);



app.listen(PORT);


