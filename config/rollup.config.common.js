import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import del from 'rollup-plugin-delete';
import typescript from 'rollup-plugin-typescript2';

const paths = {
  input: path.resolve(__dirname, '../src/index.ts'),
  output: path.resolve(__dirname, '../lib'),
};

const name = 'build-git-version-webpack-plugin';
const external = ['rollup-plugin-build-git-version'];
const globals = {};

const plugins = [
  resolve(),
  commonjs(),
  typescript(),
  json(),
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
    presets: ['@babel/preset-env'],
  }),
  del({ targets: [paths.output] }),
];

const config = {
  input: paths.input,
  plugins,
  external,
};

export { name, paths, config, globals };
