# build-git-version-webpack-plugin

A webpack plugin, add version.json to dist.

## Usage

### Install

```shell
npm install --save-dev build-git-version-webpack-plugin
```

### Config

#### Use in Webpack

```JavaScript
// webpack.config.js
const { BuildGitVersionWebpackPlugin } = require("build-git-version-webpack-plugin");

module.exports = {
  plugins: [
    new BuildGitVersionWebpackPlugin(),
  ]
}
```

#### Use in Vue 2

[Working with Webpack](https://cli.vuejs.org/guide/webpack.html)

```JavaScript
// vue.config.js
const { BuildGitVersionWebpackPlugin } = require("build-git-version-webpack-plugin");

module.exports = {
  configureWebpack: {
    plugins: [
      new BuildGitVersionWebpackPlugin()
    ]
  }
}
```

or

```JavaScript
// vue.config.js
const { BuildGitVersionWebpackPlugin } = require("build-git-version-webpack-plugin");

module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins = [
        ...config.plugins,
        new BuildGitVersionWebpackPlugin()
      ]
    }
  }
}
```

#### Use in Vue 3 & Vite & Rollup

recommend [rollup-plugin-build-git-version](https://github.com/peritot/rollup-plugin-build-git-version)

#### Use in React

- eject, and config in webpack
- override, [@craco/craco](https://www.npmjs.com/package/@craco/craco) or [react-app-rewired](https://www.npmjs.com/package/react-app-rewired)

## Result

```Json
{
    "build": {
        "time": ""
    },
    "git": {
        "branch": "",
        "commit": {
            "id": "",
            "time": "",
            "message": "",
            "author": {
                "name": "",
                "email": ""
            }
        }
    }
}
```

## Links

- [rollup-plugin-build-git-version](https://github.com/peritot/rollup-plugin-build-git-version)
