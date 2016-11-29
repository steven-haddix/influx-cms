const path = require('path');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const parts = require('./webpack.parts');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
    client: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build'),
    test: path.join(__dirname, 'tests')
};

process.env.BABEL_ENV = TARGET;

const common = merge(
    {
        entry: {
            app: PATHS.client
        },
        output: {
            path: PATHS.build,
            filename: '[name].js',
        },
        resolve: {
            extensions: ['', '.js'],
            modulesDirectories: ['src', 'node_modules']
        }
    },
    parts.loadFonts(PATHS.client),
    parts.loadImages(PATHS.client),
    parts.loadJSX(PATHS.client),
    parts.lintJSX(PATHS.client)
);

var config;

// Detect how npm is run and branch based on that
switch(TARGET) {
    case 'dev':
        config = merge(
            common,
            {
                devtool: 'eval-source-map',
                output: {
                    publicPath: 'http://127.0.0.1:3001/'
                }
            },
            parts.enableReactPerformanceTools(),
            parts.devServer({
                host: '127.0.0.1',
                port: '3001'
            })
            // parts.npmInstall()
        );
        break;
    case 'build':
    case 'stats':
        config = merge(
            common,
            {
                devtool: 'source-map',
                entry: {
                    style: PATHS.style
                },
                output: {
                    path: PATHS.build,
                    filename: '[name].[chunkhash].js',
                    chunkFilename: '[chunkhash].js',
                    publicPath: '/'
                }
            },
            parts.clean(PATHS.build),
            parts.setFreeVariable(
                'process.env.NODE_ENV',
                'production'
            ),
            parts.extractBundle({
                name: 'vendor',
                entries: ['react', 'react-dom']
            }),
            parts.minify(),
            parts.extractCSS(PATHS.style)
        );
        break;
    case 'test':
    case 'test:tdd':
        config = merge(
            common,
            {
                devtool: 'inline-source-map'
            },
            parts.loadIsparta(PATHS.app),
            parts.loadJSX(PATHS.test)
        );
        break;
    default:
        config = merge(
            common,
            {
                devtool: 'eval-source-map'
            },
            parts.extractCSS(PATHS.style)
            // ,parts.enableReactPerformanceTools(),
            // parts.npmInstall()
        );
}

module.exports = validate(config, {
    quiet: false
});
