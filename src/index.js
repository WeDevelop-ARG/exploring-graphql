import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import gql from 'graphql-tag'

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  }
}

const app = express()
const server = new ApolloServer({ typeDefs, resolvers })

server.applyMiddleware({ app })

app.listen({ port: 3000 }, () => {
  console.log('Server running')
})
