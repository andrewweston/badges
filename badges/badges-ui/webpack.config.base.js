const path = require('path');
const SaveAssetsJson = require('assets-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

const plugins = [
    new CleanPlugin(path.resolve(__dirname, './dist')),
    new SaveAssetsJson({
        path: path.resolve(__dirname, './dist'),
        filename: 'assets.json'
    })
];

module.exports = {
    target: 'web',
    entry: {
        client: ['./src/index.js']
    },
    output: {
        publicPath: '/dist/',
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.js', '.jsx']
    },
    plugins,
    module: {
        rules: [
            // Transform JSX in .jsx files
            {test: /\.jsx$/, loader: 'jsx-loader?harmony'},
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 version!sass-loader?outputStyle=expanded'
            }
        ],
        //noParse: /tinymce\.min\.js/
    },
    externals: {
        // require("jquery") is external and available on the global var jQuery
        'jquery': 'jQuery'
    }
};
