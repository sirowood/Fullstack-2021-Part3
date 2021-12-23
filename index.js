const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (request, response) => {
    response.send(persons)
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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})