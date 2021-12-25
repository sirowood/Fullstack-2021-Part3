require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

morgan.token('data', (req) => {
    return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(cors())
app.use(express.static('build'))

app.get("/api/persons", (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.send(person)
    } else {
        response.status(404).end()
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const found = persons.find(person => person.id === id)

    if (found) {
        persons = persons.filter(person => person.id !== id)
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

app.post("/api/persons", (request, response) => {
    const id = Math.round(Math.random() * 10000000)
    const person = request.body
    if (!person.name || !person.number) {
        response.status(400).send({ error: 'The name or number is missing' })
        return
    }
    
    const found = persons.find(p => person.name === p.name)

    if (found) {
        response.status(400).send({ error: 'name must be unique'})
        return
    }

    person.id = id
    persons = persons.concat(person)

    response.json(person)
})

app.get("/info", (request, response) => {
    let text = `<p>Phonebook has info for ${persons.length} people</p>`
    text += `<p>${Date()}</p>`
    response.send(text)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
