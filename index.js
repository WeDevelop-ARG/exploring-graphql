import express from 'express'

const app = express()

app.get('/test', (req, res) => res.send('works'))

app.listen({ port: 3000 }, () => {
  console.log('Server running')
})
