module.exports = {
  presets: [
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
  ],
  env: {
    test: {
      presets: [
        ['@babel/preset-env', { modules: 'commonjs' }],
        '@babel/preset-react',
      ],
      plugins: [
        '@babel/plugin-proposal-export-default-from',
      ],
    },
  },
}
