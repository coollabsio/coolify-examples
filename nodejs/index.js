const fastify = require('fastify')({ logger: {level: "error"}, trustProxy: true })
const PORT = process.env.PORT || 3000
fastify.register(require('@fastify/cors'))

fastify.get('/', function (req, reply) {
  console.log('hello');
  return { hello: "from nodejs" }
})
fastify.get('/401', function (req, reply) {
  return reply.code(401).header('Content-Type', 'application/json; charset=utf-8').send({ hello: '401' })
})
fastify.get('/env', function (req, reply) {
  return { env: process.env }
})
fastify.get('/env/:env', function (req, reply) {
  const env = req.params.env
  return { env: process.env[env] }
})

fastify.get('/health', function (req, reply) {
  return 'OK'
})

const start = async () => {
  try {
    await fastify.listen({
        host: '0.0.0.0',
        port: PORT
    })
    console.log('Server listening on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
