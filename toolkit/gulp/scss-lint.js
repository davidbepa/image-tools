import gulp from 'gulp';
import notifier from 'node-notifier';
import through from 'through2';
import path from 'path';
import gulpSassLint from 'gulp-sass-lint';
import filelog from 'gulp-filelog';
import { log, colors } from 'gulp-util';
import config from '../config';

const { dir } = config;

function sassLint() {
  log(
    colors.green.bold(`
--------------------------------------------------------------
Running SCSS linter
--------------------------------------------------------------`)
  );

  return gulp
    .src([
      `./${dir.paths.srcStyles}/**/*.scss`,
      `!./${dir.paths.srcStyles}/core/*.scss`,
      `!./${dir.paths.srcStyles}/components/vendor/**/*.scss`,
      `!./${dir.paths.srcStyles}/modules/vendor/**/*.scss`,
      `!./${dir.paths.srcStyles}/core/vendor/**/*.scss`
    ])
    .pipe(
      gulpSassLint({
        configFile: './.sass-lint.yml'
      })
    )
    .pipe(gulpSassLint.format())
    .pipe(
      through.obj((file, encoding, cb) => {
        if (file.sassLint.length && file.sassLint[0].warningCount) {
          let lint = file.sassLint[0],
            shortPath = lint.filePath
              .split('/')
              .slice(-3)
              .join('/');

          notifier.notify({
            title: 'SCSS Warnings',
            subtitle: lint.filePath,
            sound: true,
            message: `${lint.warningCount} warnings - ${shortPath}`,
            wait: true,
            file: path.join(__dirname, lint.filePath)
          });
        }
        cb();
      })
    )
    .pipe(gulpSassLint.failOnError())
    .pipe(filelog('scss-lint'));
}

export default sassLint;
