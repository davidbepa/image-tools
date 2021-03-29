import config from '../config';

export default () => [
  'core-js/stable',
  'regenerator-runtime/runtime',
  `./${config.dir.paths.srcJS}/main.js`
];
