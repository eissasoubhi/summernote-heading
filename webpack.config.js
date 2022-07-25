
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

// Return Array of Configurations
module.exports = [
    brickConfig, moduleConfig,
];