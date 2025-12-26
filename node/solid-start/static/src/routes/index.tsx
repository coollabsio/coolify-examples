import { Title } from "@solidjs/meta";
import { onMount } from "solid-js";
import Counter from "~/components/Counter";

export default function Home() {
  // Build-time public var (baked into bundle)
  const buildPublicVar = import.meta.env.VITE_BUILD_PUBLIC_VAR || 'default-value';

  onMount(() => {
    console.log('=== Build-time Variables ===');
    console.log('VITE_BUILD_PUBLIC_VAR:', buildPublicVar);
  });

  return (
    <main>
      <Title>Hello World</Title>
      <div style={{ padding: '20px', background: '#f0f0f0', margin: '20px', 'border-radius': '8px' }}>
        <h2>Environment Variable Test</h2>
        <h3>Build-time (baked into bundle)</h3>
        <p><strong>VITE_BUILD_PUBLIC_VAR:</strong> {buildPublicVar}</p>
        <p style={{ color: '#666', 'font-size': '14px' }}>
          Note: Static sites only support build-time env vars (no server at runtime)
        </p>
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
