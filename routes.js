const Router = require('express')
const router = Router()

let persons = require('./db')

router.get('/info', (req, res) => {
  res.send(`<div>Phonebook has info for ${persons.length} people<br>${new Date()}</div>`)
})

router.get('/api/persons', (req, res) => {
  res.json(persons)
})

router.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

router.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

router.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  if (persons.some(person => person.name === body.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 999999),
  }

  persons = persons.concat(person)

  response.json(person)
})

module.exports = router