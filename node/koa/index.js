const Koa = require('koa');

const app = new Koa();
const PORT = process.env.PORT || 3000;

// Runtime env vars (read at server startup)
const RUNTIME_PRIVATE_VAR = process.env.RUNTIME_PRIVATE_VAR || 'default-value';
const RUNTIME_PUBLIC_VAR = process.env.RUNTIME_PUBLIC_VAR || 'default-value';

console.log('=== Runtime Variables ===');
console.log('RUNTIME_PRIVATE_VAR:', RUNTIME_PRIVATE_VAR);
console.log('RUNTIME_PUBLIC_VAR:', RUNTIME_PUBLIC_VAR);

app.use(async (ctx) => {
  if (ctx.path === '/' && ctx.method === 'GET') {
    ctx.body = {
      message: 'Hello from Koa!',
      runtimePrivateVar: RUNTIME_PRIVATE_VAR,
      runtimePublicVar: RUNTIME_PUBLIC_VAR,
    };
  } else if (ctx.path === '/health' && ctx.method === 'GET') {
    ctx.body = { status: 'ok' };
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Not found' };
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
