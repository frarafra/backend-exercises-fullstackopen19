const Router = require('express')
const { getPersons, getPersonById, createPerson, updatePerson, deletePerson, infoPersons } = require('./controllers/personController')

const router = Router()

router.get('/info', infoPersons)

router.get('/api/persons', getPersons)

router.get('/api/persons/:id',getPersonById)

router.delete('/api/persons/:id', deletePerson)

router.post('/api/persons', createPerson)

router.put('/api/persons/:id', updatePerson)

module.exports = router