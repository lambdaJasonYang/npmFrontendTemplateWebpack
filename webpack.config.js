const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");

//commonJS syntax

module.exports = {
    mode: 'development',
    entry: {
        
        index: path.resolve(__dirname, 'src', 'index.ts'), //"main" key can be anything like "bundle"
        
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js', //[name] takes up the `bundle` key string
        clean: true,
        assetModuleFilename: '[name][ext]',
        library: { name: 'mylib',
                   type: 'window'
                 },
    },
    resolve: {
        extensions: [".ts",".js",'...'],
      },
    
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [/node_modules/]
            },
            {
                test: /\.s?[ac]ss$/i, //regex to detect sass file
                use: ['style-loader','css-loader','sass-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader : 'babel-loader',
                    options : {
                        presets : ['@babel/preset-env'],
                    },
                }
            }
        ]
    },
    plugins : [
        new HTMLWebpackPlugin({
            bleh: "Webpack App",
            filename: path.resolve('dist', 'demo','index.html'),
            template: path.resolve('src','template.html') //you can omit this but index.html can't be customized to your liking
        }),
        new CopyPlugin({
            patterns: [
              { from: "src/@types", to: "@types" },

            ],
          }),
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname,'dist', 'demo')
        },
        port: 5555,
        open: false,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    devtool: "inline-source-map",
    //the compiled website is obfusticated JS, and errors will only show the compiled JS
    //source-map lets you know where in your source is your error
}
