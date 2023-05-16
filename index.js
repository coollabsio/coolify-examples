const fastify = require('fastify')({ logger: {level: "error"}, trustProxy: true })

fastify.register(require('fastify-cors'))

fastify.get('/', function (req, reply) {
  console.log(process.env.TEST)
  return { hello: "main-updates" }
})

fastify.get('/api', function (req, reply) {
  console.log(process.env.TEST)
  return { hello: "api" }
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
