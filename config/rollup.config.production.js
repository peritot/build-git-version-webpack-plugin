import path from 'path';
import { terser } from 'rollup-plugin-terser';
import { name, paths, config, globals } from './rollup.config.common';

const output = [
  {
    file: path.resolve(paths.cjs, 'index.js'),
    format: 'cjs',
    name,
    globals,
  },
  {
    file: path.resolve(paths.esm, 'index.js'),
    format: 'esm',
    name,
    globals,
  },
];

export default {
  ...config,
  output: [...output, ...output.map((item) => ({ ...item, file: item.file.replace(/.js$/i, '.min.js'), plugins: [terser()] }))],
};
