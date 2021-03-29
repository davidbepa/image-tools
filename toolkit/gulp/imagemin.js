import gulp from 'gulp';
import gulpImagemin from 'gulp-imagemin';
import { log, colors } from 'gulp-util';
import config from '../config';

const { dir } = config;

function imagemin() {
  log(
    colors.green.bold(`
--------------------------------------------------------------
Minifying images
--------------------------------------------------------------`)
  );

  return gulp
    .src([
      `./${dir.paths.srcImages}/**/*.*`,
      `!./${dir.paths.srcImages}/content-managed/**/*.*`,
      `!./${dir.paths.srcImages}/svg-sprites/**/*.svg`,
      `!./${dir.paths.srcImages}/svgsheet.svg`
    ])
    .pipe(
      gulpImagemin(
        [
          gulpImagemin.gifsicle({ interlaced: true }),
          gulpImagemin.mozjpeg({ quality: 85, progressive: true }),
          gulpImagemin.optipng({ optimizationLevel: 5 }),
          gulpImagemin.svgo({ plugins: [{ removeViewBox: true }] })
        ],
        {
          verbose: true
        }
      )
    )
    .pipe(gulp.dest(`./${dir.paths.distImages}`));
}

export default imagemin;
