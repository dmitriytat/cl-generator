const webpack = require('webpack');

module.exports = {
    entry: {
        index: './admin/index.jsx',
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/dist',
        filename: '[name].bundle.js',
        chunkFilename: '[id].bundle.js',
    },
    resolve: {
        extensions: [".ts", ".tsx", ".jsx", ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "babel-loader!awesome-typescript-loader",
                exclude: /node_modules/,
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader',
            },
            {
                test: /\.jpg$/,
                loader: 'file?name=[path][name].[ext]',
            }
        ],
    },
    devtool: "eval",
    plugins: [],
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
            }
        }
    },
    externals: {
        'cheerio': 'window',
        'react/addons': true, // important!!
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    }
};
