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
app.use((req, res) => res.status(404).send({ error: 'unknown endpoint' }))

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})