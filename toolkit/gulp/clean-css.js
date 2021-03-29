import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import gulpCleanCss from 'gulp-clean-css';
import filelog from 'gulp-filelog';
import { log, colors } from 'gulp-util';
import config from '../config';

const { dir } = config;

function cleanCss() {
  log(
    colors.green.bold(`
--------------------------------------------------------------
Minifying CSS
--------------------------------------------------------------`)
  );

  return gulp
    .src(`./${dir.paths.distStyles}/*.css`)
    .pipe(sourcemaps.init())
    .pipe(
      gulpCleanCss({ debug: true }, details => {
        log(
          colors.red.bold(
            `ORIGINAL - ${details.name} : ${details.stats.originalSize}`
          )
        );
        log(
          colors.green.bold(
            `MINIFIED - ${details.name} : ${details.stats.minifiedSize}`
          )
        );
      })
    )
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(`./${dir.paths.distStyles}`))
    .pipe(filelog('clean-css'));
}

export default cleanCss;
