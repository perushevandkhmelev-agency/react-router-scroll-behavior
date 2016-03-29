import path from 'path'
import webpack from 'webpack'

export default config => {
  const { env } = process

  const isCi = env.CONTINUOUS_INTEGRATION === 'true'
  const runCoverage = env.COVERAGE === 'true' || isCi

  const coverageLoaders = []
  const coverageReporters = []

  if (runCoverage) {
    coverageLoaders.push({
      test: /\.js$/,
      include: path.resolve('modules/'),
      exclude: /__tests__/,
      loader: 'isparta'
    })

    coverageReporters.push('coverage')

    if (isCi) {
      coverageReporters.push('coveralls')
    }
  }

  config.set({
    frameworks: [ 'mocha' ],

    files: [ 'tests.webpack.js' ],

    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    webpack: {
      module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
          ...coverageLoaders
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test')
        })
      ],
      devtool: 'inline-source-map'
    },

    webpackMiddleware: {
      noInfo: true
    },

    reporters: [ 'mocha', ...coverageReporters ],

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage'
    },

    browsers: [ 'PhantomJS' ],

    plugins: [
      require("karma-webpack"),
      require("karma-mocha"),
      require("karma-mocha-reporter"),
      require("karma-phantomjs-launcher"),
      require("karma-sourcemap-loader"),
    ],

    singleRun: true
  })
}
