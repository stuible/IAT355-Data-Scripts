import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'index.js',
  dest: 'build/index.js',
  format: 'cjs',
  sourceMap: 'inline',
  plugins: [
    babel({
      babelrc: false,
      presets: ['es2015-rollup'],
      exclude: 'node_modules/**',
    }),
    // uglify(),
  ],
};
