require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')

const PORT = process.env.PORT

const app = express()

morgan.token('req-body', req => {
  return JSON.stringify(req.body)
 })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))
app.use('/', routes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})