import path from 'path';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';
import { name, paths, config, globals } from './rollup.config.common.js';

export default [
  {
    ...config,
    output: [
      {
        file: path.resolve(paths.output, 'index.js'),
        format: 'cjs',
        exports: 'named',
        name,
        globals,
      },
      {
        file: path.resolve(paths.output, 'index.min.js'),
        format: 'cjs',
        exports: 'named',
        name,
        globals,
        sourcemap: true,
        plugins: [terser()],
      },
      {
        file: path.resolve(paths.output, 'index.esm.js'),
        format: 'esm',
        name,
        globals,
      },
      {
        file: path.resolve(paths.output, 'index.esm.min.js'),
        format: 'esm',
        name,
        globals,
        sourcemap: true,
        plugins: [terser()],
      },
    ],
  },
  {
    input: paths.input,
    output: [
      {
        file: path.resolve(paths.output, 'index.d.ts'),
        format: 'esm',
        name,
        globals,
      },
    ],
    plugins: [dts.default()],
  },
];
