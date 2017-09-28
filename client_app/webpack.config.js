var path = require('path');

const configClientEvent = {
    output: {
        filename: '[name].js',
        path: '../public/js/dist',
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    },
};

const configServiceWorker = {
    output: {
        filename: '[name].js',
        path: '../public',
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    },
};

module.exports =[
    {
        debug: true,
        noInfo: false,
        entry: [
            'babel-polyfill',
            path.resolve(__dirname, 'src/index')
        ],
        target: 'web',
        output: {
            path: '../public/js/dist',
            publicPath: '/',
            filename: 'bundle.js'
        },
        module: {
            loaders: [
                {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
                {test: /(\.css)$/, loaders: ['style', 'css']},
                {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
                {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
                {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
                {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
            ]
        }
    },

    Object.assign({}, configClientEvent, {
        entry: {
            'client': './push-notification/client.js',
        },
    }),

    Object.assign({}, configServiceWorker, {
        entry: {
            'service-worker': './push-notification/service-worker.js',
        },
        target: 'webworker',
    })
];
