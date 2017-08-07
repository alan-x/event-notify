const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const path = require('path');

module.exports = {
    entry : "./dist/index.js",
    output: {
        path    : path.resolve(__dirname, "dist"), // string
        filename: "./index.min.js", // string
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use : {
                    loader : 'babel-loader',
                }
            }
        ]
    },
    plugins: [
        // new UglifyJSPlugin({
        //     uglifyOptions: {
        //         ie8: false,
        //         ecma: 8,
        //         mangle: {
        //             keep_fnames: true,
        //             keep_classnames: true
        //         },
        //         output: {
        //             comments: false,
        //             beautify: false
        //         },
        //         compress: true,
        //         warnings: false
        //     }
        // })
    ]
}