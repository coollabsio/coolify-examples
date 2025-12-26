module.exports = function(eleventyConfig) {
  // Build-time public var (baked into bundle)
  const buildPublicVar = process.env.BUILD_PUBLIC_VAR || 'default-value';
  console.log('=== Build-time Variables ===');
  console.log('BUILD_PUBLIC_VAR:', buildPublicVar);

  eleventyConfig.addGlobalData('buildPublicVar', buildPublicVar);

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};
