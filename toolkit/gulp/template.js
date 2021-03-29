import fs from 'fs';
import gulp from 'gulp';
import gulpTemplate from 'gulp-template';
import gulpIf from 'gulp-if';
import browserSync from 'browser-sync';
import _sortBy from 'lodash/sortBy';
import data from 'gulp-data';
import { log, colors } from 'gulp-util';
import config from '../config';
import packageJson from '../package.json';

const { NODE_ENV } = process.env;
const { dir } = config;

function template() {
  log(
    colors.green.bold(`
--------------------------------------------------------------
Templating
--------------------------------------------------------------`)
  );

  const readTemplates = () => {
    const files = [];

    return new Promise((resolve, reject) => {
      fs.readdir(`./${dir.paths.srcTemplates}/`, (err, templates) => {
        if (err) reject(err);

        for(let i = 0; i < templates.length; i++) {
          const fileName = templates[i];

          let cleanFile = '';

          if (!/^(.*\.(?!(hbs)$))?[^.]*$/i.test(fileName)) {
            cleanFile = fileName.replace(/(.*)\.(.*?)$/, '$1');
          } else {
            reject(
              colors.red.bold(
                'TEMPLATE ERROR - Make sure all files in the templates directory are .hbs files'
              )
            );
          }

          files.push(cleanFile);

          if (i === templates.length - 1) {
            resolve(_sortBy(files));
          }
        }
      });
    });
  };

  const outPath = NODE_ENV === 'production' ? './tools/server' : `./${dir.development}`;

  return gulp
    .src(`./${dir.source}/index.html`)
    .pipe(
      data((file, cb) => {
        readTemplates()
          .then(data => {
            return cb(undefined, {
              version: packageJson.version,
              data
            });
          })
          .catch(err => {
            throw new Error(
              colors.red.bold(
                `There was an issue creating the template - ${err}`
              )
            );
          });
      })
    )
    .pipe(gulpTemplate())
    .pipe(gulp.dest(outPath))
    .pipe(gulpIf(NODE_ENV !== 'production', browserSync.stream()));
}

export default template;
