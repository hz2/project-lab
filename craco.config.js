const CracoLessPlugin = require('craco-less');
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
  }, ],
};