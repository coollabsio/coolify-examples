<script>
	import { onMount } from 'svelte';
	import { PUBLIC_BUILD_PUBLIC_VAR } from '$env/static/public';

	// Build-time public var (baked into bundle)
	const buildPublicVar = PUBLIC_BUILD_PUBLIC_VAR || 'default-value';

	onMount(() => {
		console.log('=== Build-time Variables ===');
		console.log('PUBLIC_BUILD_PUBLIC_VAR:', buildPublicVar);
	});
</script>

<div style="padding: 20px; background: #f0f0f0; margin: 20px; border-radius: 8px;">
	<h2>Environment Variable Test</h2>
	<h3>Build-time (baked into bundle)</h3>
	<p><strong>PUBLIC_BUILD_PUBLIC_VAR:</strong> {buildPublicVar}</p>
	<p style="color: #666; font-size: 14px;">
		Note: Static sites only support build-time env vars (no server at runtime)
	</p>
</div>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
