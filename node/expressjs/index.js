const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Runtime env vars (read at server startup)
const RUNTIME_PRIVATE_VAR = process.env.RUNTIME_PRIVATE_VAR || 'default-value';
const RUNTIME_PUBLIC_VAR = process.env.RUNTIME_PUBLIC_VAR || 'default-value';

console.log('=== Runtime Variables ===');
console.log('RUNTIME_PRIVATE_VAR:', RUNTIME_PRIVATE_VAR);
console.log('RUNTIME_PUBLIC_VAR:', RUNTIME_PUBLIC_VAR);

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Express.js!',
    runtimePrivateVar: RUNTIME_PRIVATE_VAR,
    runtimePublicVar: RUNTIME_PUBLIC_VAR,
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
