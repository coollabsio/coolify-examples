const fastify = require('fastify')({ logger: {level: "error"}, trustProxy: true })

fastify.register(require('fastify-cors'))

fastify.get('/', function (req, reply) {
  return { hello: "nodesjs-fastify branch" }
})
fastify.get('/env', function (req, reply) {
  console.log(process.env.TEST)
  return { TEST: process.env.TEST ?? "TEST variable not found." }
})

fastify.get('/health', function (req, reply) {
  return 'OK'
})

const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
