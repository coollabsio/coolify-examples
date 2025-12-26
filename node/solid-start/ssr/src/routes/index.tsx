import { Title } from "@solidjs/meta";
import { createSignal, onMount } from "solid-js";
import Counter from "~/components/Counter";

export default function Home() {
  // Build-time public var (baked into bundle)
  const buildPublicVar = import.meta.env.VITE_BUILD_PUBLIC_VAR || 'default-value';

  // Runtime vars (fetched from server API)
  const [runtimePrivateVar, setRuntimePrivateVar] = createSignal('loading...');
  const [runtimePublicVar, setRuntimePublicVar] = createSignal('loading...');

  onMount(async () => {
    console.log('=== Build-time Variables ===');
    console.log('VITE_BUILD_PUBLIC_VAR:', buildPublicVar);

    // Fetch runtime vars from server API
    try {
      const res = await fetch('/api/env');
      const data = await res.json();
      setRuntimePrivateVar(data.runtimePrivateVar);
      setRuntimePublicVar(data.runtimePublicVar);
      console.log('=== Runtime Variables ===');
      console.log('RUNTIME_PRIVATE_VAR:', data.runtimePrivateVar);
      console.log('RUNTIME_PUBLIC_VAR:', data.runtimePublicVar);
    } catch {
      setRuntimePrivateVar('error');
      setRuntimePublicVar('error');
    }
  });

  return (
    <main>
      <Title>Hello World</Title>
      <div style={{ padding: '20px', background: '#f0f0f0', margin: '20px', 'border-radius': '8px' }}>
        <h2>Environment Variable Test</h2>
        <h3>Build-time (baked into bundle)</h3>
        <p><strong>VITE_BUILD_PUBLIC_VAR:</strong> {buildPublicVar}</p>
        <h3>Runtime (read at server startup)</h3>
        <p><strong>RUNTIME_PRIVATE_VAR:</strong> {runtimePrivateVar()}</p>
        <p><strong>RUNTIME_PUBLIC_VAR:</strong> {runtimePublicVar()}</p>
      </div>
      <h1>Hello world!</h1>
      <Counter />
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
