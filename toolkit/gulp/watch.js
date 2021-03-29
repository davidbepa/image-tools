import gulp from 'gulp';
import { log, colors } from 'gulp-util';
import config from '../config';
import compileHandlebars from './compile-handlebars'
import template from './template';
import { copy } from './copy';
import svgstore from './svgstore';
import sass from './sass';
import scssLint from './scss-lint';
import eslint from './eslint';

const { dir } = config;

function watch() {
  log(
    colors.green.bold(`
--------------------------------------------------------------
Watch
--------------------------------------------------------------`)
  );

  //html
  gulp.watch(
    [`${dir.source}/**/*.hbs`],
    { cwd: './' },
    gulp.series(compileHandlebars, template)
  );
  gulp.watch(`${dir.source}/index.html`, { cwd: './' }, template);

  //fonts and images
  gulp.watch(
    [
      `${dir.paths.srcFonts}/**/*.*`,
      `${dir.paths.srcImages}/**/*.*`,
      `!${dir.paths.srcImages}/svg-sprites/*.svg`
    ],
    { cwd: './' },
    copy
  );

  // svg's
  gulp.watch(
    `${dir.paths.srcImages}/svg-sprites/*.svg`,
    { cwd: './' },
    svgstore
  );

  //js
  gulp.watch(`${dir.paths.srcJS}/**/*.js`, gulp.series(eslint));

  //scss
  gulp.watch(
    `${dir.paths.srcStyles}/**/*.scss`,
    { cwd: './' },
    gulp.parallel(sass, scssLint)
  );
}

export default watch;
