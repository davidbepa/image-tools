import path from 'path';
import config from '../config';

export default ({ production }) => {
  const { publicPath } = config.server;

  return {
    path: path.join(__dirname, `../${config.dir.production}`, `${publicPath}`),
    publicPath: `/${publicPath}/`,
    filename: '[name].bundle.js',
    pathinfo: !production
  };
}
