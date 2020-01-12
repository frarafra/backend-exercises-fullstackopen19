const Person = require('../models/person')

const getPersons = async (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
}

const getPersonById = async (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person.toJSON())
  })
}

const createPerson = async (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ 
      error: 'content missing' 
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON())
  })
}

const deletePerson = async (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
}

const infoPersons = async (req, res) => {
  Person.find({}).then(persons => {
    res.send(`<div>Phonebook has info for ${persons.length} people<br>${new Date()}</div>`)
  })
}

module.exports = {
  getPersons,
  getPersonById,
  createPerson,
  deletePerson,
  infoPersons,
}