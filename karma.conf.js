var webpackConfig = require('./webpack.config');

module.exports = function karmaConfig (config) {
  config.set({
    frameworks: [
      'jasmine'
    ],

    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'test/tests.webpack.js'
    ],

    preprocessors: {
      'test/tests.webpack.js': ['webpack']
    },

    browsers: [
      'PhantomJS'
    ],

    reporters: ['progress'],

    port: 9876,

    colors: true,

    autoWatch: true,

    singleRun: false,

    webpack: webpackConfig,

    concurrency: Infinity
  });
};