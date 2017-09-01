import pkg from './package.json';

export default {
  plugins: [],
  external: ['kronos-interceptor', 'loglevel-mixin'],
  input: pkg.module,

  output: {
    format: 'cjs',
    file: pkg.main
  }
};
