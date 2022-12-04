# MWS - Template for building frontend npm packages via Webpack

## Summary

1. Write our code in the `src` folder. 
2. `npm build`: Webpack will build our js and types to the `dist` folder and the htmlplugin generates a html file in the `dist/demo` folder to demo our library on the browser. 
3. In the `src/template.html` demo the library in the window.onload area using `mylib.somefunction`. (the name "mylib" is set in webpack output library.name option)
   * `npm run dev` to demo
4. On publish, we simply delete the `dist/demo` folder and publish the rest of the `dist` folder.  
5. In production, Install as npm package, and simply `import { somefunction } from 'packagename'` .   (note: the name "mylib" is never used when installed as npm package)

The brother repo is [https://github.com/userJY/npmPackageTypeDoc_demo](https://github.com/userJY/npmPackageTypeDoc_demo) which instead uses Storybook.   
Another barebones alternative is to create 2 npm projects: 1 for client to demo the library, 1 for the library itself, `npm link`.

## To run

```bash
npm run build #calls webpack build to emit the js libraries and index.html files
npm run dev #runs the webserver
```

## To publish

```bash
npm run pub
```

package.json

```json
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": [
    "dist/**/*"
  ],
  "scripts": {
    "build": "webpack",
    "dclean": "rm -rf docs",
    "doc": "rm -rf docs && typedoc --entryPointStrategy resolve ./src/index.ts",
    "dev": "npm run clean && webpack && webpack serve --https",
    "clean": "tsc --build --clean",
    "publish" : "npm run build && rm -rf lib/demo && npm run doc && npm publish",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

## webpack.config.js

* repo
  * package.json
  * tsconfig.json
  * webpack.config.js
  * lib    <---- `path: path.resolve(__dirname, 'lib'),` output used for publishing
    * demo
      * index.html   <--- `filename: path.resolve('lib', 'demo','index.html'),` HTMLWebpackPlugin input (3)
    * @types    <----`{ from: "src/@types", to: "@types" },` CopyPlugin output (5)
      * custom.d.ts  
    * index.d.ts <--- Generated from typescript declarations
    * index.js  <---- `filename: 'index.js',` (2)
  * src
    * @types   <----`{ from: "src/@types", to: "@types" },` CopyPlugin input (5)
      * custom.d.ts  
    * template.html <---- ` template: path.resolve('src','template.html') ` HTMLWebpackPlugin input (4)
    * index.ts  <-- `index: path.resolve(__dirname, 'src', 'index.ts'),`  (1)

```js
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");

//commonJS syntax

module.exports = {
    mode: 'development',
    entry: {
        
        index: path.resolve(__dirname, 'src', 'index.ts'), // (1)
        
    },
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js', // (2)
        clean: true,
        assetModuleFilename: '[name][ext]'
    },
    ...,
    plugins : [
        new HTMLWebpackPlugin({
            bleh: "Webpack App",
            filename: path.resolve('lib', 'demo','index.html'), // (3)
            template: path.resolve('src','template.html') // (4)
        }),
        new CopyPlugin({
            patterns: [
              { from: "src/@types", to: "@types" },  // (5)

            ],
          }),
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname,'lib', 'demo')
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
```





tsconfig.json

```json
{
  "compilerOptions": {
        /* Basics */
    "outDir": "./lib", /* output dir of emitted js files */
    "declaration": true, /*Generate *.d.ts files*/
    ...
    "skipLibCheck": true, /* skips checking *.d.ts of ALL node_modules/@types BUT type-checks if app depends on the module */
    "typeRoots": ["src/@types","node_modules/@types"], /*List of folder to include type definition, default is `node_modules/@types/ */
  },

  //Generally, include source directory; exclude distribution directory
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.js", "src/**/*.jsx"], /* Specifies an array of filenames or patterns to include in the program. */
  "exclude": ["lib","node_modules", "doc", "jest.config.ts", "**/*.spec.ts"]  /* Specifies an array of filenames or patterns that should be skipped when resolving "include":[..] above */

}
```

## using CSS styles

* drag your uplot.css file into src/styles folder
* in your index.ts add `import './styles/uPlot.css';`
