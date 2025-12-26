import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  // Build-time public var (baked into bundle)
  const buildPublicVar = import.meta.env.VITE_BUILD_PUBLIC_VAR || 'default-value';

  // Runtime vars (fetched from server API)
  const [runtimePrivateVar, setRuntimePrivateVar] = useState('loading...');
  const [runtimePublicVar, setRuntimePublicVar] = useState('loading...');

  useEffect(() => {
    console.log('=== Build-time Variables ===');
    console.log('VITE_BUILD_PUBLIC_VAR:', buildPublicVar);

    // Fetch runtime vars from server API
    fetch('/api/env')
      .then((res) => res.json())
      .then((data) => {
        setRuntimePrivateVar(data.runtimePrivateVar);
        setRuntimePublicVar(data.runtimePublicVar);
        console.log('=== Runtime Variables ===');
        console.log('RUNTIME_PRIVATE_VAR:', data.runtimePrivateVar);
        console.log('RUNTIME_PUBLIC_VAR:', data.runtimePublicVar);
      })
      .catch(() => {
        setRuntimePrivateVar('error');
        setRuntimePublicVar('error');
      });
  }, [buildPublicVar]);

  return (
    <>
      <div style={{ padding: '20px', background: '#f0f0f0', margin: '20px', borderRadius: '8px' }}>
        <h2>Environment Variable Test</h2>
        <h3>Build-time (baked into bundle)</h3>
        <p><strong>VITE_BUILD_PUBLIC_VAR:</strong> {buildPublicVar}</p>
        <h3>Runtime (read at server startup)</h3>
        <p><strong>RUNTIME_PRIVATE_VAR:</strong> {runtimePrivateVar}</p>
        <p><strong>RUNTIME_PUBLIC_VAR:</strong> {runtimePublicVar}</p>
      </div>
      <h1>Hello from TanStack Start!</h1>
    </>
  );
}
