# Installing Vue.js without Vue CLI

I love Vue.js and I love Vue CLI, but after a while of working with the enforced limitations of the folder structure and certain configurations in the projects greated by the CLI I wanted to set up a full project of my own where I am in full control of the packages and configurations.

This is but a few quick and somewhat simple examples that build on top of one another on what I've achieved for myself. I've been trying to find blog posts on how to achieve the full functionality of a project created by Vue CLI, but manually, and I wasn't able to find any that cover it from start to finish. I realise now that it would be a long read if it's presented step by step, so this is _not a blog post_ and is meant mostly for people who at least sort of know what they are doing.

You can clone the repository and try running `yarn build` (or any other command from the `package.json`) from any of the top folders to see the result.

- [Barebones Vue.js with Webpack and ESLint](#barebones-vuejs-with-webpack-and-eslint)


I'm not a very active developer, so if you find errors or if this becomes outdated without me noticing, please shoot me an issue and a pull request in order to fix it as soon as possible.


## Barebones Vue.js with Webpack and ESLint

### Installing the required packages

    yarn add -D vue vue-loader vue-template-compiler webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env vue-style-loader css-loader html-webpack-plugin clean-webpack-plugin

[vue](https://github.com/vuejs/vue), [vue-loader](https://github.com/vuejs/vue-loader) and [vue-template-compiler](https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler) are the basic requirements to compile Vue files to JavaScript.

[webpack](https://github.com/webpack), [webpack-cli](https://github.com/webpack/webpack-cli) and [webpack-dev-server](https://github.com/webpack/webpack-dev-server) are the basics of Webpack.

[babel-loader](https://github.com/babel/babel-loader), [@babel/core](https://babeljs.io/docs/en/next/babel-core.html) and [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) are required to transpile ES6 code to ES5.

[vue-style-loader](https://github.com/vuejs/vue-style-loader) and [css-loader](https://github.com/webpack-contrib/css-loader) are two Webpack loaders that will figure out where the CSS is and inject it into the final HTML file.

[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) will inject the compiled JavaScript into our main HTML file and move it to the `dist` folder.

[clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin) is used to clean up the `dist` folder before every build.

### Configuration files

#### .gitignore

```
.DS_Store
node_modules
dist
coverage

# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw*
```

#### .babelrc.js

```javascript
module.exports = {
  presets: ['@babel/preset-env']
}
```

#### webpack.config.js

```javascript
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname),
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname)
    }
  },
  devServer: {
    open: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        use: 'babel-loader'
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin(
      {
        template: './public/index.html'
      }
    )
  ]
}
```

#### package.json
Omitting the unimportant (for this guide) settings of the `package.json`
```javascript
{
  "license": "MIT",
  "scripts": {
    "serve": "webpack-dev-server --mode development",
    "build": "webpack --mode production"
  },
  "devDependencies": {
    "@babel/core": "^7.5.5",
    "@babel/preset-env": "^7.5.5",
    "babel-loader": "^8.0.6",
    "clean-webpack-plugin": "^3.0.0",
    "css-loader": "^3.1.0",
    "html-webpack-plugin": "^3.2.0",
    "vue": "^2.6.10",
    "vue-loader": "^15.7.1",
    "vue-style-loader": "^4.1.2",
    "vue-template-compiler": "^2.6.10",
    "webpack": "^4.39.0",
    "webpack-cli": "^3.3.6",
    "webpack-dev-server": "^3.7.2"
  }
}
```