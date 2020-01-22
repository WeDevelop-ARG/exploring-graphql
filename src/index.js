import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import gql from 'graphql-tag'

const typeDefs = gql`
  type Query {
    people: [Person]
  }

  type Mutation {
    createPerson(firstName: String!, lastName: String!): Person
  }

  type Person {
    id: Int!
    firstName: String!
    lastName: String!
    parent: Person
    age: Int
  }
`

const db = {
  people: [
    { id: 1, firstName: 'Abel', lastName: 'Osorio', parentId: 10, birthDate: '1989-04-07' },
    { id: 2, firstName: 'Marcela', lastName: 'Osorio', parentId: 10 },
    { id: 10, firstName: 'Mauri', lastName: 'Osorio', parentId: 4 },
    { id: 4, firstName: 'Eze', lastName: 'Osorio', parentId: null }
  ]
}

const getPeople = () => {
  return db.people
}

const createPerson = (person) => {
  db.people.push(person)

  return person
}

const getPersonById = (id) => {
  if (!id) return undefined

  return db.people.find((person) => person.id === id)
}

const resolvers = {
  Query: {
    people: () => getPeople()
  },
  Mutation: {
    createPerson: (_, input) => createPerson(input)
  },
  Person: {
    parent: (person) => getPersonById(person.parentId)
  }
}

const app = express()
const server = new ApolloServer({ typeDefs, resolvers })

server.applyMiddleware({ app })

app.listen({ port: 3000 }, () => {
  console.log('Server running')
})
