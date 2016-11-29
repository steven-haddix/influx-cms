const webpack = require('webpack');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');

exports.devServer = function(options) {
    return {
        entry: [
            'webpack-dev-server/client?http://' + options.host + ':' + options.port + '/',
            'webpack/hot/only-dev-server',
            'react-hot-loader/patch'
        ],
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            stats: 'errors-only',
            host: options.host, // Defaults to `localhost`
            port: options.port // Defaults to 8080
        },
        plugins: [
            // Enable multi-pass compilation for enhanced performance
            // in larger projects. Good default.
            new webpack.HotModuleReplacementPlugin({
                multiStep: true
            }),
            new WebpackIsomorphicToolsPlugin({
                webpack_assets_file_path: './.webpack/webpack-assets.json',
                assets: {
                    images: {
                        extensions: ['jpeg', 'jpg', 'png', 'gif', 'svg'],
                        parser: WebpackIsomorphicToolsPlugin.url_loader_parser
                    },
                    fonts: {
                        extensions: ['woff', 'woff2', 'ttf', 'eot'],
                        parser: WebpackIsomorphicToolsPlugin.url_loader_parser
                    }
                },
                modulesDirectories: ['src', 'node_modules']
            })
        ]
    };
};

exports.enableReactPerformanceTools = function() {
    return {
        module: {
            loaders: [
                { test: require.resolve('react'), loader: 'expose?React' }
            ]
        }
    };
};


exports.loadImages = function(include) {
    return {
        module: {
            loaders: [
                { test: /\.png$/, loader: 'url?prefix=images/&limit=8000&mimetype=image/png', include },
                { test: /\.jpg$/, loader: 'url?prefix=images/&limit=8000&mimetype=image/jpeg', include },
            ]
        }
    }
};

exports.loadFonts = function(include) {
    return {
        module: {
            loaders: [
                { test: /\.woff$/, loader: 'url?prefix=fonts/&limit=8000&mimetype=application/font-woff', include },
                { test: /\.ttf$/, loader: 'file?prefix=fonts/', include },
                { test: /\.eot$/, loader: 'file?prefix=fonts/', include },
            ]
        }
    }
};

exports.loadJSX = function(include) {
    return {
        module: {
            loaders: [
                { test: /\.(js|jsx)$/, loaders: ['babel?cacheDirectory'], include: include }
            ]
        }
    };
};

exports.lintJSX = function(include) {
    return {
        module: {
            preLoaders: [
                {
                    test: /\.(js|jsx)$/,
                    loaders: ['eslint'],
                    include: include
                }
            ]
        }
    };
};

exports.setupCSS = function(paths) {
    return {
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loaders: ['style', 'css'],
                    include: paths
                }
            ]
        }
    };
}

exports.minify = function() {
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    };
}

exports.setFreeVariable = function(key, value) {
    const env = {};
    env[key] = JSON.stringify(value);

    return {
        plugins: [
            new webpack.DefinePlugin(env)
        ]
    };
}

exports.extractBundle = function(options) {
    const entry = {};
    entry[options.name] = options.entries;

    return {
        // Define an entry point needed for splitting.
        entry: entry,
        plugins: [
            // Extract bundle and manifest files. Manifest is
            // needed for reliable caching.
            new webpack.optimize.CommonsChunkPlugin({
                names: [options.name, 'manifest'],

                // options.name modules only
                minChunks: Infinity
            })
        ]
    };
}

exports.clean = function(path) {
    return {
        plugins: [
            new CleanWebpackPlugin([path], {
                root: process.cwd()
            })
        ]
    };
}

exports.extractCSS = function(paths) {
    return {
        module: {
            loaders: [
                // Extract CSS during build
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style', 'css'),
                    include: paths
                }
            ]
        },
        plugins: [
            // Output extracted CSS to a file
            new ExtractTextPlugin('[name].[chunkhash].css')
        ]
    };
}

exports.purifyCSS = function(paths) {
    return {
        plugins: [
            new PurifyCSSPlugin({
                basePath: process.cwd(),
                // `paths` is used to point PurifyCSS to files not
                // visible to Webpack. You can pass glob patterns
                // to it.
                paths: paths
            }),
        ]
    }
}