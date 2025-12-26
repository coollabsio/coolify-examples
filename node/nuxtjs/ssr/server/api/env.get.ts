export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event);

  // Build-time var (public only)
  const buildPublicVar = import.meta.env.BUILD_PUBLIC_VAR || 'default-value';

  // Log on server
  console.log('=== Build-time Variables ===');
  console.log('BUILD_PUBLIC_VAR:', buildPublicVar);
  console.log('=== Runtime Variables ===');
  console.log('NUXT_RUNTIME_PRIVATE_VAR:', config.runtimePrivateVar);
  console.log('NUXT_PUBLIC_RUNTIME_PUBLIC_VAR:', config.public.runtimePublicVar);

  // Return all (in real app, don't expose private vars!)
  return {
    buildPublicVar,
    runtimePrivateVar: config.runtimePrivateVar,
    runtimePublicVar: config.public.runtimePublicVar,
  };
});
