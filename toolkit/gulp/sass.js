import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import autoprefixer from 'gulp-autoprefixer';
import filelog from 'gulp-filelog';
import gulpIf from 'gulp-if';
import browserSync from 'browser-sync';
import { log, colors } from 'gulp-util';
import config from '../config';

const { NODE_ENV } = process.env;
const { dir } = config;
const isProd = NODE_ENV === 'production';

function sass() {
  log(
    colors.green.bold(`
--------------------------------------------------------------
Compiling SCSS, Globbing and Auto-prefixing
--------------------------------------------------------------`)
  );

  const outPath = isProd
    ? gulp.dest(`./${dir.paths.distStyles}`)
    : gulp.dest(`./${dir.paths.devStyles}`);

  const files = [`./${dir.paths.srcStyles}/*.scss`];

  if (isProd) {
    files.push(`!./${dir.paths.srcStyles}/template.scss`);
  }

  return gulp
    .src(files)
    .pipe(
      sassGlob({
        ignorePaths: [`./${dir.paths.srcStyles}/core/*.scss`]
      })
    )
    .pipe(
      gulpSass({
        sourceComments: true
      }).on('error', gulpSass.logError)
    )
    .pipe(autoprefixer())
    .pipe(outPath)
    .pipe(filelog('sass'))
    .pipe(gulpIf(!isProd, browserSync.stream()));
}

export default sass;
