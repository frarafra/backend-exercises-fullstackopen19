const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes')

const PORT = 3001

const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use('/', routes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})