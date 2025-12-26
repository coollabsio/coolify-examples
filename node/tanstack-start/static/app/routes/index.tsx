import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  // Build-time public var (baked into bundle)
  const buildPublicVar = import.meta.env.VITE_BUILD_PUBLIC_VAR || 'default-value';

  useEffect(() => {
    console.log('=== Build-time Variables ===');
    console.log('VITE_BUILD_PUBLIC_VAR:', buildPublicVar);
  }, [buildPublicVar]);

  return (
    <>
      <div style={{ padding: '20px', background: '#f0f0f0', margin: '20px', borderRadius: '8px' }}>
        <h2>Environment Variable Test</h2>
        <h3>Build-time (baked into bundle)</h3>
        <p><strong>VITE_BUILD_PUBLIC_VAR:</strong> {buildPublicVar}</p>
        <p style={{ color: '#666', fontSize: '14px' }}>
          Note: Static sites only support build-time env vars (no server at runtime)
        </p>
      </div>
      <h1>Hello from TanStack Start!</h1>
    </>
  );
}
