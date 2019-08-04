# Installing Vue.js without Vue CLI

> Vue.js with Webpack, SASS, Jest and Vue-Standard ESLint configuration

I love Vue.js and I love Vue CLI, but after a while of working with the enforced limitations of the folder structure and certain configurations in the projects created by the CLI, I wanted to set up a full project of my own where I am in full control of the packages and configurations.

This is but a few quick - and somewhat simple - examples that build on top of one another on what I've achieved for myself. I've been trying to find blog posts on how to achieve the full functionality of a project created by Vue CLI, but manually, and I wasn't able to find any that cover it from start to finish. I realise now that it would be a long read if it's presented step by step, so this is _not a blog post_ and is meant mostly for people who at least _sort of_ know what they are doing, although it shouldn't be hard to figure out by looking up each configuration parameter for linked packages.

You can clone the repository and try running `yarn build` (or any other command from the `package.json`) from any of the top folders to see the result.

- [Barebones Vue.js with Webpack and ESLint](#barebones-vuejs-with-webpack-and-eslint)
- [Adding SASS/SCSS](#adding-sass)


I'm not a very active developer, so if you find errors or if this becomes outdated without me noticing, please shoot me an issue and a pull request in order to fix it as soon as possible.


## Barebones Vue.js with Webpack and ESLint

### Packages

    yarn add -D vue vue-loader vue-template-compiler webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env vue-style-loader css-loader post-css-loader autoprefixer cssnano html-webpack-plugin clean-webpack-plugin eslint@"<6.0.0" eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard eslint-plugin-vue babel-eslint

[vue](https://github.com/vuejs/vue), [vue-loader](https://github.com/vuejs/vue-loader) and [vue-template-compiler](https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler) are the basic requirements to compile Vue files to JavaScript.

[webpack](https://github.com/webpack), [webpack-cli](https://github.com/webpack/webpack-cli) and [webpack-dev-server](https://github.com/webpack/webpack-dev-server) are the basics of Webpack.

[babel-loader](https://github.com/babel/babel-loader), [@babel/core](https://babeljs.io/docs/en/next/babel-core.html) and [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) are required to transpile ES6 code to ES5.

[vue-style-loader](https://github.com/vuejs/vue-style-loader) and [css-loader](https://github.com/webpack-contrib/css-loader) are two Webpack loaders that will figure out where the CSS is and inject it into the final HTML file.

[post-css-loader](https://github.com/postcss/postcss-loader) is another Webpack loader that allows processing of CSS. Its plugins [autoprefixer](https://github.com/postcss/autoprefixer) and [cssnano](https://github.com/cssnano/cssnano) add vendor-specific prefixes to your CSS rules and minify the stylesheets.

[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) will inject the compiled JavaScript into our main HTML file and move it to the `dist` folder.

[clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin) is used to clean up the `dist` folder before every build.

[eslint](https://eslint.org/), [eslint-config-standard](https://github.com/standard/eslint-config-standard), [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import), [eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node), [eslint-plugin-promise](https://github.com/xjamundx/eslint-plugin-promise), [eslint-plugin-standard](https://github.com/standard/eslint-plugin-standard), [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue) abd [babel-eslint](https://github.com/babel/babel-eslint) are all the required packages and their dependency plugins to get linting to your project with ESLint and Vue-flavored [Standard.js](https://standardjs.com/) linting configuration. If you're interested in the Vue-flavored part, have a look at the different possible configurations in the [eslint-plugin-vue configs](https://github.com/vuejs/eslint-plugin-vue/tree/master/lib/configs).

> **Note:** The reason I'm installing `eslint@^5.0.0` is because `eslint-plugin-vue` hasn't released a version supporting `eslint@^6.0.0` yet and it breaks linting in your IDE.

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
          'css-loader',
          'postcss-loader'
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

#### postcss.config.js

```javascript
if (process.env.NODE_ENV === 'production') {
  module.exports = {
    plugins: [
      require('autoprefixer'),
      require('cssnano')
    ]
  }
} else {
  module.exports = {
    plugins: []
  }
}
```

#### .eslintrc.js

```javascript
module.exports = {
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'standard',
    'plugin:vue/recommended'
  ],
  rules: {
    // we should always disable console logs and debugging in production
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
```

#### package.json
Omitting the unimportant (for this guide) settings of the `package.json`
```javascript
{
  "license": "MIT",
  "scripts": {
    "serve": "webpack-dev-server --mode development",
    "build": "NODE_ENV=production webpack --mode production"
  },
  "devDependencies": {
    "@babel/core": "^7.5.5",
    "@babel/preset-env": "^7.5.5",
    "autoprefixer": "^9.6.1",
    "babel-eslint": "^10.0.2",
    "babel-loader": "^8.0.6",
    "clean-webpack-plugin": "^3.0.0",
    "css-loader": "^3.1.0",
    "cssnano": "^4.1.10",
    "eslint": "<6.0.0",
    "eslint-config-standard": "^13.0.1",
    "eslint-plugin-import": "^2.18.2",
    "eslint-plugin-node": "^9.1.0",
    "eslint-plugin-promise": "^4.2.1",
    "eslint-plugin-standard": "^4.0.0",
    "eslint-plugin-vue": "^5.2.3",
    "html-webpack-plugin": "^3.2.0",
    "postcss-loader": "^3.0.0",
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


## Adding SASS

This section is based completely on the previous one and will only show the full configuration files that have _any_ changes. So if a file is omitted here it does not mean it's not required - it just isn't affected by adding SASS.

### Packages

```
yarn add -D node-sass sass-loader 
```

[node-sass](https://github.com/sass/node-sass) is the package to compile CSS from SASS that runs on C (you may replace it with [dart-sass](https://github.com/sass/dart-sass)

[sass-loader](https://github.com/webpack-contrib/sass-loader) is the Webpack loader required to process SASS fileshich has its own benefits)

### Configuration files

#### webpack.config.js

Only the `module` configuration has changed in this file.

```javascript
/* ... */
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
        test: /\.(sa|sc|c)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
/* ... */
```

#### package.json
```javascript
{
  "license": "MIT",
  "scripts": {
    "serve": "webpack-dev-server --mode development",
    "build": "NODE_ENV=production webpack --mode production"
  },
  "devDependencies": {
    "@babel/core": "^7.5.5",
    "@babel/preset-env": "^7.5.5",
    "autoprefixer": "^9.6.1",
    "babel-eslint": "^10.0.2",
    "babel-loader": "^8.0.6",
    "clean-webpack-plugin": "^3.0.0",
    "css-loader": "^3.1.0",
    "cssnano": "^4.1.10",
    "eslint": "<6.0.0",
    "eslint-config-standard": "^13.0.1",
    "eslint-plugin-import": "^2.18.2",
    "eslint-plugin-node": "^9.1.0",
    "eslint-plugin-promise": "^4.2.1",
    "eslint-plugin-standard": "^4.0.0",
    "eslint-plugin-vue": "^5.2.3",
    "html-webpack-plugin": "^3.2.0",
    "node-sass": "^4.12.0",
    "postcss-loader": "^3.0.0",
    "sass-loader": "^7.1.0",
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

## Adding Jest for unit testing

### Packages

```
yarn add -D jest vue-jest @vue/test-utils babel-core@^7.0.0-bridge.0 babel-jest jest-serializer-vue jest-transform-stub
```

[jest](https://jestjs.io/) is the base package
[vue-jest](https://github.com/vuejs/vue-jest) is the Vue single-file component files compiler for Jest
[@vue/test-utils](https://vue-test-utils.vuejs.org/) is the official unit testing library for Vue.js


[babel-jest](https://github.com/facebook/jest/tree/master/packages/babel-jest) allows writing tests in ES6 syntax and [babel-core@^7.0.0-bridge.0](https://github.com/babel/babel-bridge) is a dependency package.

[jest-serializer-vue](https://github.com/eddyerburgh/jest-serializer-vue) allows snapshot testing and [jest-transform-stub](https://github.com/eddyerburgh/jest-transform-stub) is used to avoid errors when importing JavaScript assets.

> **Note:** Some of these packages are still dependent on the old `babel-core@^6.0.0` which has been renamed to `@babel/core` once it was released as `^7.0.0`. Since `@babel/core` is already installed you have to install `babel-core@^7.0.0-bridge.0` package to "fake" the older version alongside the new one. Read more about it on [babel-bridge](https://github.com/babel/babel-bridge) Github page.

### Configuration files

#### jest.config.js
```javascript
module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleNameMapper: { // webpack aliases
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/$1'
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  testMatch: [
    '**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  testURL: 'http://localhost/'
}
```

#### .eslintrc.js
```javascript
/* ... */
  env: {
    node: true,
    jest: true
  },
/* ... */
```

#### package.json
```javascript
{
  "license": "MIT",
  "scripts": {
    "serve": "webpack-dev-server --mode development",
    "build": "NODE_ENV=production webpack --mode production",
    "test": "jest"
  },
  "devDependencies": {
    "@babel/core": "^7.5.5",
    "@babel/preset-env": "^7.5.5",
    "@vue/test-utils": "^1.0.0-beta.29",
    "autoprefixer": "^9.6.1",
    "babel-core": "^7.0.0-bridge.0",
    "babel-eslint": "^10.0.2",
    "babel-jest": "^24.8.0",
    "babel-loader": "^8.0.6",
    "clean-webpack-plugin": "^3.0.0",
    "css-loader": "^3.1.0",
    "cssnano": "^4.1.10",
    "eslint": "^<6.0.0",
    "eslint-config-standard": "^12.0.0",
    "eslint-plugin-import": "^2.18.2",
    "eslint-plugin-node": "^9.1.0",
    "eslint-plugin-promise": "^4.2.1",
    "eslint-plugin-standard": "^4.0.0",
    "eslint-plugin-vue": "^5.2.3",
    "html-webpack-plugin": "^3.2.0",
    "jest": "^24.8.0",
    "jest-serializer-vue": "^2.0.2",
    "jest-transform-stub": "^2.0.0",
    "node-sass": "^4.12.0",
    "postcss-loader": "^3.0.0",
    "sass-loader": "^7.1.0",
    "vue": "^2.6.10",
    "vue-jest": "^3.0.4",
    "vue-loader": "^15.7.1",
    "vue-style-loader": "^4.1.2",
    "vue-template-compiler": "^2.6.10",
    "webpack": "^4.39.0",
    "webpack-cli": "^3.3.6",
    "webpack-dev-server": "^3.7.2"
  }
}
```