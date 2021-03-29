import gulp from 'gulp';
import { log, colors } from 'gulp-util';
import { stream } from 'critical';
import config from '../config';

const { dir } = config;

function criticalCss () {
  log(
    colors.green.bold(`
--------------------------------------------------------------
Generating Critical CSS
--------------------------------------------------------------`)
  );

  return gulp
    .src(`./${dir.paths.distTemplates}/*.html`)
    .pipe(stream({
      base: dir.production,
      inline: true,
      minify: true,
      css: [`./${dir.paths.distStyles}/*.css`],
    }))
    .on('error', error => {
      log(
        colors.green.red(`
--------------------------------------------------------------
${error.message}
--------------------------------------------------------------`)
      );
      notifier.notify({
        title: 'Critical CSS Error',
        message: error.message,
        sound: true,
        wait: true
      });
    })
    .pipe(gulp.dest(`./${dir.paths.distTemplates}`));
}

export default criticalCss;
