import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

// Build-time public var (baked into bundle)
const buildPublicVar = import.meta.env.VITE_BUILD_PUBLIC_VAR || 'default-value';
console.log('=== Build-time Variables ===');
console.log('VITE_BUILD_PUBLIC_VAR:', buildPublicVar);

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div style="padding: 20px; background: #f0f0f0; margin: 20px; border-radius: 8px;">
      <h2>Environment Variable Test</h2>
      <h3>Build-time (baked into bundle)</h3>
      <p><strong>VITE_BUILD_PUBLIC_VAR:</strong> ${buildPublicVar}</p>
      <p style="color: #666; font-size: 14px;">
        Note: Static sites only support build-time env vars (no server at runtime)
      </p>
    </div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
