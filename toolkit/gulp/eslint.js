import fs from 'fs';
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import reporter from 'eslint-detailed-reporter';
import browserSync from 'browser-sync';
import config from '../config';

const { dir } = config;

function report() {
  return gulp.src([`./${dir.paths.srcJS}/**/*.js`])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.format(reporter, results => {
        fs.writeFileSync(`./${dir.development}/report-results.html`, results);
      })
    )
    .pipe(browserSync.stream());
}

export default report;
