// Runtime env vars (read at server startup, can change without rebuild)
import { env as runtimePrivate } from '$env/dynamic/private';
import { env as runtimePublic } from '$env/dynamic/public';

// Build-time env vars (baked into bundle at build)
import { PUBLIC_BUILD_VAR } from '$env/static/public';

export function load() {
	// Runtime vars
	const runtimePrivateVar = runtimePrivate.RUNTIME_PRIVATE_VAR || 'default-value';
	const runtimePublicVar = runtimePublic.PUBLIC_RUNTIME_PUBLIC_VAR || 'default-value';

	// Build-time var (public only - private build vars are rarely useful)
	const buildPublicVar = PUBLIC_BUILD_VAR || 'default-value';

	console.log('=== Build-time Variables ===');
	console.log('PUBLIC_BUILD_VAR:', buildPublicVar);
	console.log('=== Runtime Variables ===');
	console.log('RUNTIME_PRIVATE_VAR:', runtimePrivateVar);
	console.log('PUBLIC_RUNTIME_PUBLIC_VAR:', runtimePublicVar);

	return {
		buildPublicVar,
		runtimePrivateVar,
		runtimePublicVar
	};
}
