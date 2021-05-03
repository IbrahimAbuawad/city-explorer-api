const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.get('/about', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3001)