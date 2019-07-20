module.exports = function babelConfig(api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ];

  const plugins = [];

  return {
    presets,
    plugins
  };
};
