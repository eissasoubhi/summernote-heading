
const path = require( 'path' );

module.exports = {

    // bundling mode
    mode: 'production',

    // entry files
    entry: './src/index.ts',

    // output bundles (location)
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'summernote-heading.min.js',
    },

    // file resolutions
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        alias: {
            '@': path.resolve(__dirname, 'src/')
        }
    },

    // loaders
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        allowTsInNodeModules: true
                    }
                },
                exclude: /node_modules(?!\/snb-components)/,
            }
        ]
    }
};