import gulp from 'gulp';
import mergeStream from 'merge-stream';
import filelog from 'gulp-filelog';
import { log, colors } from 'gulp-util';
import config from '../config';

const { NODE_ENV } = process.env;
const { dir } = config;

function copy() {
  log(
    colors.green.bold(`
--------------------------------------------------------------
Copying global files
--------------------------------------------------------------`)
  );

  const outFonts =
    NODE_ENV === 'production'
      ? `./${dir.paths.distFonts}`
      : `./${dir.paths.devFonts}`;

  const outModules = `./${dir.paths.distModules}`;

  let fonts, images, modules;

  //fonts
  fonts = gulp
    .src(`./${dir.paths.srcFonts}/**/*.*`)
    .pipe(gulp.dest(outFonts))
    .pipe(filelog('copy:fonts'));

  if (NODE_ENV !== 'production') {
    //images
    images = gulp
      .src([
        `./${dir.paths.srcImages}/**/*.*`,
        `!./${dir.paths.srcImages}/svg-sprites/**/*.svg`
      ])
      .pipe(gulp.dest(`./${dir.paths.devImages}/`))
      .pipe(filelog('copy:images'));

    return mergeStream(fonts, images);
  }

  modules = gulp
    .src([
      `./${dir.paths.srcModules}/**/*.*`,
    ])
    .pipe(gulp.dest(outModules))
    .pipe(filelog('copy:modules'));

  images = gulp
    .src([`./${dir.paths.srcImages}/svgsheet.svg`])
    .pipe(gulp.dest(`./${dir.paths.distImages}/`))
    .pipe(filelog('copy:svgsheet.svg'));

  return mergeStream(fonts, images, modules);
}

export default copy;
