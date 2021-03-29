import { log, colors } from 'gulp-util';
import del from 'del';
import config from '../config';

const { NODE_ENV } = process.env;
const { dir } = config;

function clean() {
  let files = ['**/.DS_Store'];

  if (NODE_ENV === 'production') {
    files = [
      ...files,
      './tools/server/**',
      `./${dir.production}/**`,
      `./${dir.documentation}/**`
    ];
  } else {
    files = [
      ...files,
      `./${dir.development}/**`
    ];
  }

  return del(files).then(paths => {
    log(
      colors.green.bold(`
--------------------------------------------------------------
${paths.length > 0 ? 'Deleted files and folders:' : 'Nothing to delete'}
--------------------------------------------------------------`)
    );

    log(colors.red.bold(paths.join('\n')));
  });
}

export default clean;
