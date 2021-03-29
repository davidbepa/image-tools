import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import handlebars from 'handlebars';
import gulpHandlebarsHtml from 'gulp-handlebars-html';
import replace from 'gulp-replace';
import regexRename from 'gulp-regex-rename';
import merge from 'merge-stream';
import gulpIf from 'gulp-if';
import browserSync from 'browser-sync';
import { log, colors } from 'gulp-util';
import config from '../config';

const { NODE_ENV } = process.env;
const { dir } = config;
const gulpHandlebars = gulpHandlebarsHtml(handlebars);

handlebars.registerHelper("json", (context, options) => {
  try {
    return options.fn(JSON.parse(context));
  } catch {
    log(colors.red.bold(`
      Undefined or Invalid JSON in the partial context
    `))
  }
});

function compileHandlebars() {
  log(
    colors.green.bold(`
--------------------------------------------------------------
HTML handlebars
--------------------------------------------------------------`)
  );

  const outPages =
    NODE_ENV === 'production'
      ? `./${dir.paths.distTemplates}`
      : `./${dir.paths.devTemplates}`;

  const files = [];
  const readModules = () => {
    const directory = `./${dir.paths.srcModules}/`;

    return new Promise((resolve, reject) => {
      fs.readdir(directory, (err, modules) => {
        if (err) reject(err);

        for(let i = 0; i < modules.length; i++) {
          const isFile = !!path.extname(directory + modules[i]);

          if (!isFile) files.push(directory + modules[i]);

          if (i === modules.length - 1) {
            resolve(files);
          }
        }
      });
    });
  };

  return readModules().then(() => {
    const options = {
      partialsDirectory: [`./${dir.paths.srcModules}/`, `./${dir.paths.srcComponents}/`, ...files]
    };

    const compile = gulp.src(`./${dir.source}/html/templates/*.hbs`)
                .pipe(gulpHandlebars({}, options))
                .pipe(regexRename(/\.hbs$/, ".html"))
                .pipe(replace(/\uFEFF/ig, "")) //cut out zero width nbsp characters the compiler adds in
                .pipe(gulp.dest(outPages))
                .pipe(gulpIf(NODE_ENV !== 'production', browserSync.stream()));

    return merge(compile);
  })
}

export default compileHandlebars;
