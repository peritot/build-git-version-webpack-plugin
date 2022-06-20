import path from 'path';
import { terser } from 'rollup-plugin-terser';
import { name, paths, config } from './rollup.config.common';

const output = [
  {
    file: path.resolve(paths.cjs, 'index.js'),
    format: 'cjs',
    name,
  },
  {
    file: path.resolve(paths.esm, 'index.js'),
    format: 'esm',
    name,
  },
];

export default {
  ...config,
  output: [...output, ...output.map((item) => ({ ...item, file: item.file.replace(/.js$/i, '.min.js'), plugins: [terser()] }))],
};
