import gulp from 'gulp';
import gulpSvgstore from 'gulp-svgstore';
import gulpImagemin from 'gulp-imagemin';
import rename from 'gulp-rename';
import { log, colors } from 'gulp-util';
import config from '../config';

const { dir } = config;

function svgstore() {
  log(
    colors.green.bold(`
--------------------------------------------------------------
Combining SVG's
--------------------------------------------------------------`)
  );

  return gulp
    .src(`./${dir.paths.srcImages}/svg-sprites/**/*.svg`)
    .pipe(
      gulpImagemin(
        [
          gulpImagemin.svgo({
            plugins: [{ removeViewBox: true }]
          })
        ],
        {
          verbose: true
        }
      )
    )
    .pipe(gulpSvgstore())
    .pipe(rename('svgsheet.svg'))
    .pipe(gulp.dest(`./${dir.paths.srcImages}`));
}

export default svgstore;
