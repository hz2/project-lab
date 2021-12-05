const CracoLessPlugin = require('craco-less');
const {
  CracoAliasPlugin,
  configPaths
} = require('react-app-rewire-alias')
const aliasMap = configPaths('./tsconfig.paths.json')
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@': path.resolve(__dirname, 'src/'),
      '@libs': path.resolve(__dirname, 'src/libs')
    },
  },
  plugins: [{
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#00bbbb'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: CracoAliasPlugin,
      options: {
        alias: aliasMap
      }
    }
  ],
};