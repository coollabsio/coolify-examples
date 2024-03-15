const fastify = require('fastify')({ logger: {level: "error"}, trustProxy: true })
const PORT = process.env.PORT || 3000
fastify.register(require('@fastify/cors'))

fastify.get('/', function (req, reply) {
  return { hello: "from nodejs" }
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
