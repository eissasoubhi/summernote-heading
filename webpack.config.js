
const path = require( 'path' );

const config = {

    // bundling mode
    mode: 'development',

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

const brickConfig = { ...config, ...{
    name: "snb-brick",
    entry: "./src/index.ts",
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'summernote-heading.min.js',
    },
}};

const moduleConfig = { ...config, ...{
    name: "snb-module",
    entry: "./src/Module/index.ts",
    output: {
        library: {
          name: 'module',
          type: 'umd',
        },
        path: path.resolve( __dirname, 'dist' ),
        filename: 'module/index.js',
    },
}};

// Greenfield v3 proof-of-concept. This is intentionally built in parallel
// with the current artifact until browser compatibility and migration tests
// are complete.
const v3Config = { ...config, ...{
    name: "snb-heading-v3",
    entry: "./src/v3/index.ts",
    output: {
        path: path.resolve( __dirname, 'dist/v3' ),
        filename: 'summernote-heading.js',
    },
}};

// Return Array of Configurations
module.exports = [
    brickConfig, moduleConfig, v3Config,
];