import { resolve } from 'path';
import config from '../config';

const { paths } = config.dir;

export default () => {
  return [
    {
      test: /\.js$/,
      include: [resolve(__dirname, `../${paths.srcJS}`)],
      use: {
        loader: 'babel-loader',
      }
    },
    {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }]
    }
  ];
}
