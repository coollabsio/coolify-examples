const fastify = require('fastify')({ logger: true });

const PORT = process.env.PORT || 3000;

// Runtime env vars (read at server startup)
const RUNTIME_PRIVATE_VAR = process.env.RUNTIME_PRIVATE_VAR || 'default-value';
const RUNTIME_PUBLIC_VAR = process.env.RUNTIME_PUBLIC_VAR || 'default-value';

console.log('=== Runtime Variables ===');
console.log('RUNTIME_PRIVATE_VAR:', RUNTIME_PRIVATE_VAR);
console.log('RUNTIME_PUBLIC_VAR:', RUNTIME_PUBLIC_VAR);

fastify.get('/', async (request, reply) => {
  return {
    message: 'Hello from Fastify!',
    runtimePrivateVar: RUNTIME_PRIVATE_VAR,
    runtimePublicVar: RUNTIME_PUBLIC_VAR,
  };
});

fastify.get('/health', async (request, reply) => {
  return { status: 'ok' };
});

const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
