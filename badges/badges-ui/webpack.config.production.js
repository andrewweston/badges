const webpack = require('webpack');
const config = require('./webpack.config.base.js');
const settings = require('./config/publish-dev.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

config.mode = 'production';
config.bail = true;
config.profile = false;
config.devtool = '#source-map';

config.output.filename = '[name].[chunkhash].js';
config.output.chunkFilename = '[id].[chunkhash].chunk.js';

config.optimization = {
    minimize: true,
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
        __CONFIG__: JSON.stringify(settings),
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    })
].concat(config.plugins).concat([
    new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks
    new BundleAnalyzerPlugin({defaultSizes: 'gzip'}),
    new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 1024,
        minRatio: 0.8
    })
]);

config.module.rules = config.module.rules.concat([
    {test: /\.jsx?$/, loaders: ['babel-loader'], exclude: /node_modules/}
]);

module.exports = config;
