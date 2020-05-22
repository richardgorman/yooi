import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';;

module.exports = [
  {
    external: ['react'],
    input: 'src/index.js',
    output: {
      file: 'umd/index.js',
      format: 'umd',
      name: 'index',
      esModule: false
    },
    plugins: [
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/env', '@babel/preset-react']
      }),
      resolve(),
      commonjs(),
      terser()
    ]
  },
  {
    input: {
      index: 'src/index.js',
      useButton: 'src/core/useButton.js',
      useDialog: 'src/core/useDialog.js',
      useListener: 'src/core/useListener.js',
      useOne: 'src/core/useOne.js',
      useTabs: 'src/core/useTabs.js',
      useToggle: 'src/core/useToggle.js',
      useUpdateEffect: 'src/core/useUpdateEffect.js',
    },
    output: [
      {
        chunkFileNames: 'chunk-[hash].js',
        dir: 'cjs',
        format: 'cjs'
      },
      {
        chunkFileNames: 'chunk-[hash].js',
        dir: 'esm',
        format: 'esm'
      }
    ],
    external: ['react'],
    plugins: [
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/env', '@babel/preset-react']
      }),
      resolve(),
      commonjs(),
    ]
  }
];