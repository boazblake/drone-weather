const jsonServer = require('json-server')
const jsonGraphqlExpress = require('json-graphql-server')
const data = require('./db.json')
const server = jsonServer.create()
const router = jsonServer.router('./db.js')
const middlewares = jsonServer.defaults()

app.use('/graphql', jsonGraphqlExpress(data))

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.modifiedAt = Date.now()
  }

  console.log(router)
  // Continue to JSON Server router
  next()
})

// Use default router
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
