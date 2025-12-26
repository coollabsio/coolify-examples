const http = require('http');

const PORT = process.env.PORT || 3000;

// Runtime env vars (read at server startup)
const RUNTIME_PRIVATE_VAR = process.env.RUNTIME_PRIVATE_VAR || 'default-value';
const RUNTIME_PUBLIC_VAR = process.env.RUNTIME_PUBLIC_VAR || 'default-value';

console.log('=== Runtime Variables ===');
console.log('RUNTIME_PRIVATE_VAR:', RUNTIME_PRIVATE_VAR);
console.log('RUNTIME_PUBLIC_VAR:', RUNTIME_PUBLIC_VAR);

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Hello from Node.js!',
      runtimePrivateVar: RUNTIME_PRIVATE_VAR,
      runtimePublicVar: RUNTIME_PUBLIC_VAR,
    }));
  } else if (req.url === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
