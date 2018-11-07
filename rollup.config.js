import { name } from './package.json';
import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import { uglify } from 'rollup-plugin-uglify';

export default ({ environment = 'production' }) => ({
  input: 'src/index.js',
  output: {
    file: `build/${name}.min.js`,
    name,
    format: 'umd',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    uglify(),
    filesize(),
  ],
});
