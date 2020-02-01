const Person = require('../models/person')

const getPersons = async (req, res, next) => {
  try {
    const persons = await Person.find({})
    res.json(persons.map(person => person.toJSON()))
  } catch(error) {
    next(error)
  }
}

const getPersonById = async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id)
    if (person) {
      res.json(person.toJSON())
    } else {
      res.status(404).end()
    }
  } catch(error) {
    next(error)
  }
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

  try {
    const savedPerson = await person.save()
    res.json(savedPerson.toJSON())
  } catch(error) {
    next(error)
  }
}

const updatePerson = async (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  try {
    const updatedPerson = await Person.findByIdAndUpdate(req.params.id, person, { new: true })
    res.json(updatedPerson.toJSON())
  } catch(error) {
    next(error)
  }
}

const deletePerson = async (req, res, next) => {
  try {
    await Person.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch(error) {
    next(error)
  }
}

const infoPersons = async (req, res, next) => {
  try {
    const persons = await Person.find({})
    res.send(`<div>Phonebook has info for ${persons.length} people<br>${new Date()}</div>`)
  } catch(error) {
    next(error)
  }
}

module.exports = {
  getPersons,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson,
  infoPersons,
}