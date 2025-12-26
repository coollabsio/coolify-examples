<script>
	import { onMount } from 'svelte';

	let { data } = $props();

	onMount(() => {
		console.log('=== Build-time Variables ===');
		console.log('BUILD_VAR (public):', data.buildPublicVar);
		console.log('=== Runtime Variables ===');
		console.log('RUNTIME_PRIVATE_VAR:', data.runtimePrivateVar);
		console.log('RUNTIME_PUBLIC_VAR:', data.runtimePublicVar);
	});
</script>

<div style="padding: 20px; background: #f0f0f0; margin: 20px; border-radius: 8px;">
	<h2>Environment Variable Test</h2>

	<h3>Build-time (baked into bundle)</h3>
	<p><strong>PUBLIC_BUILD_VAR:</strong> {data.buildPublicVar}</p>

	<h3>Runtime (read at server startup)</h3>
	<p><strong>RUNTIME_PRIVATE_VAR:</strong> {data.runtimePrivateVar}</p>
	<p><strong>RUNTIME_PUBLIC_VAR:</strong> {data.runtimePublicVar}</p>
</div>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
