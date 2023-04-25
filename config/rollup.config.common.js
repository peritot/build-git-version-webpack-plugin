import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import { apiExtractor } from 'rollup-plugin-api-extractor';
import pkg from '../package.json';

const name = pkg.name;

const paths = {
  api: path.resolve(__dirname, '../api-extractor.json'),
  input: path.resolve(__dirname, '../src/index.ts'),
  cjs: path.resolve(__dirname, '../dist/cjs'),
  esm: path.resolve(__dirname, '../dist/esm'),
};

const config = {
  input: paths.input,
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    apiExtractor({
      configFile: paths.api,
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env'],
    }),
  ],
  external: ['dayjs', 'dayjs/plugin/utc', 'dayjs/plugin/timezone'],
};

const globals = {
  dayjs: 'dayjs',
};

export { name, paths, config, globals };
