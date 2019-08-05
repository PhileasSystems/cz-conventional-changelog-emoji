const slsw = require('serverless-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { join } = require(`path`);

module.exports = {
  target: 'node',
  entry: slsw.lib.entries,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  devtool: 'source-map',
  externals: [
    'aws-sdk',
    '@phileas/api-interface',
    '@phileas/core',
    '@phileas/lambda-middlewares',
    'middy',
    'middy/middlewares',
    'bluebird',
    'lodash',
    'moment',
    'source-map-support',
    'dynamoose',
    'promise',
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    libraryTarget: 'commonjs2',
    path: join(__dirname, '.webpack'),
    filename: '[name].js',
    sourceMapFilename: '[file].map',
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.OPEN_ANALYZER === 'true' ? 'static' : 'disabled',
      openAnalyzer: process.env.OPEN_ANALYZER === 'true',
    }),
  ],
};
