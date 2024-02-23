const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Import the plugin
module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    return {
        mode: isProduction ? 'production' : 'development',
        // entry: './src/index.js', // Corrected main JavaScript file path
        entry: {
            index: {
                import: './src/index.js',
                dependOn: 'shared',
            },
            some_module: {
                import: './src/some_module.js',
                dependOn: 'shared',
            },
            shared: 'jquery',
        },
        output: {
            filename: '[name].bundle.js', // The output bundle
            path: path.resolve(__dirname, 'dist'), // Output directory,
            clean: true
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        devtool: 'source-map', module: {
            rules: [{

                test: /\.js$/, // Transpile .js files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            }, {
                test: /\.css$/, use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
// The following is an alternative to using MiniCssExtractPlugin.loader for production:
// style-loader is used to inject the CSS into the DOM for development and support hot module replacement
// use: [ //
// For development, use 'style-loader' to inject CSS into the DOM. //
// For production, consider using MiniCssExtractPlugin.loader for separate CSS files.
// process.env.NODE_ENV !== 'production' // ? 'style-loader' // : MiniCssExtractPlugin.loader, // 'css-loader', // ],
            },
// Add other rules for different file types as needed
            ],
        },
        plugins: [new MiniCssExtractPlugin({filename: 'main.css'})]
    }
};
