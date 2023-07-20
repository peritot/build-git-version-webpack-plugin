import path from 'path';
import { name, paths, config, globals } from './rollup.config.common.js';

const output = [
  {
    file: path.resolve(paths.output, 'index.js'),
    format: 'cjs',
    exports: 'named',
    name,
    globals,
  },
];

export default {
  ...config,
  output,
};
