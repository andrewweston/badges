const webpack = require('webpack');
const config = require('./webpack.config.base.js');
const settings = require('./config/development.js');


config.mode = 'development';
config.output.filename = '[name].[hash].js';
config.output.chunkFilename = '[id].[hash].chunk.js';
config.output.sourceMapFilename = '[file].map';


config.devtool = '#cheap-module-eval-source-map';

config.optimization = {
    minimize: false,
    splitChunks: {
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
            vendor: {
                test: /node_modules/,
                chunks: 'initial',
                name: 'vendor',
                enforce: true
            },
            default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
            }
        }
    }
};

config.plugins = [
    new webpack.DefinePlugin({
        __CONFIG__: JSON.stringify(settings)
    })
].concat(config.plugins).concat([
    //new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
]);

config.module.rules = config.module.rules.concat([
    {test: /\.jsx?$/, loaders: [ /*'react-hot-loader',*/ 'babel-loader'], exclude: /node_modules/}
]);

module.exports = config;
