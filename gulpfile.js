const fs = require('fs');

const gulp = require('gulp');
const jimp = require('jimp');
const through = require('through2');
const zip = require('adm-zip');

const gRename = require('gulp-rename');
const gConcat = require('gulp-concat');
const gClean = require('gulp-clean');

const gSass = require('gulp-sass');
const gPug = require('gulp-pug');

const gAutoPrefixer = require('gulp-autoprefixer');
const gBabel = require('gulp-babel');

const gMinifyJs = require('gulp-minify');
const gMinifySvg = require('gulp-svgmin');
const gMinifyHTML = require('gulp-htmlmin');
const gXMLValidator = require('gulp-xml-validator');

// Build styles - prontera
const buildSassProntera = () => gulp.src('./src/styles/prontera.scss')
  .pipe(gSass({ outputStyle: 'compressed' }))
  .pipe(gAutoPrefixer())
  .pipe(gRename('style.css'))
  .pipe(gulp.dest('./out'));

// Build styles - page patch
const buildSassPage = () => gulp.src('./src/styles/page.scss')
  .pipe(gSass({ outputStyle: 'compressed' }))
  .pipe(gAutoPrefixer())
  .pipe(gRename('page.css'))
  .pipe(gulp.dest('./out'));

// Build script - onload
const buildJsOnload = () => gulp.src('./src/scripts/onload.js')
  .pipe(gBabel({ presets: ['@babel/env'] }))
  .pipe(gMinifyJs({ noSource: true, ext: { min: '.js' } }))
  .pipe(gulp.dest('./out'));

// Build scripts - functions
const buildJsFunctions = () => gulp.src('./src/scripts/functions/*.js')
  .pipe(gConcat('functions.js'))
  .pipe(gBabel({ presets: ['@babel/env'] }))
  .pipe(gMinifyJs({ noSource: true, ext: { min: '.js' } }))
  .pipe(gulp.dest('./out'));

// Build html
const buildPug = () => gulp.src('./src/views/prontera.pug')
  .pipe(gPug())
  .pipe(gMinifyHTML({ minifyCSS: true, minifyJS: true, processScripts: ['text/x-mathjax-config'] }))
  .pipe(gRename('skin.html'))
  .pipe(gulp.dest('./out'));

// Build svg
const buildSvg = () => gulp.src('./src/images/*.svg')
  .pipe(gMinifySvg())
  .pipe(gulp.dest('./out'));

// Build skin information
const buildIndexXML = () => gulp.src('./src/index.xml')
  .pipe(gXMLValidator())
  .pipe(gulp.dest('./out'));

// Build preview images
const resizeImage = (width, height) => {
  return through.obj((chunk, enc, callback) => {
    jimp.read(chunk.contents).then((image) => {
      image.resize(width, height)
        .getBuffer(jimp.AUTO, (error, buffer) => {
          chunk.contents = buffer;
          callback(null, chunk);
        });
    });
  });
};
const buildPreview = () => gulp.src('./src/preview.png')
  .pipe(through.obj((chunk, enc, callback) => {
    jimp.read(chunk.contents).then((image) => {
      if (Math.abs(image.getWidth() * .75 - image.getHeight()) > 1) {
        image.crop(0, 0, image.getWidth(), image.getWidth() * .75)
          .write('./src/preview.png')
          .getBuffer(jimp.MIME_JPEG, (error, buffer) => {
            chunk.contents = buffer;
            callback(null, chunk);
          });
      } else {
        callback(null, chunk);
      }
    });
  }))
  .pipe(resizeImage(1600, 1200)).pipe(gRename('preview1600.jpg')).pipe(gulp.dest('./out'))
  .pipe(resizeImage(560, 420)).pipe(gRename('preview560.jpg')).pipe(gulp.dest('./out'))
  .pipe(resizeImage(256, 192)).pipe(gRename('preview256.jpg')).pipe(gulp.dest('./out'));

// Clean out directory
const clean = () => gulp.src('./out', { allowEmpty: true })
  .pipe(gClean());

// Make out directory
const mkdir = (resolve) => gulp.src('*.*', { read: false })
  .pipe(gulp.dest('./out'));

// Create license file
const license = (resolve) => {
  const license = 'LICENSE : MPL-2.0\nAUTHOR  : Jio Gim (widh)\n\nSEE MORE INFORMATIONS AT https://github.com/widh/prontera';
  fs.writeFile('./out/LICENSE', license, (e) => {
    if (!e) { resolve(); } else { console.debug(e); }
  });
};

// Build once
const build = (resolve) => {
  try {
    buildSassProntera();
    buildSassPage();
    buildJsOnload();
    buildJsFunctions();
    buildPug();
    buildSvg();
    buildIndexXML();
    buildPreview();
  } catch (e) { console.error(e); } finally { resolve(); }
};

// Watch for changes (Hot-build)
const watch = () => {
  try {
    gulp.watch([
      './src/styles/common/*.scss',
      './src/styles/global/*.scss',
      './src/styles/content-body/*.scss',
      './src/styles/content-side/*.scss',
      './src/styles/common.scss',
      './src/styles/prontera.scss',
    ], {}, buildSassProntera);
    gulp.watch([
      './src/styles/common/*.scss',
      './src/styles/common.scss',
      './src/styles/page.scss',
    ], {}, buildSassPage);
    gulp.watch('./src/scripts/onload.js', {}, buildJsOnload);
    gulp.watch('./src/scripts/functions/*.js', {}, buildJsFunctions);
    gulp.watch([
      './src/views/*.pug',
      './src/views/icons/*.pug',
      './src/views/content-body/*.pug',
      './src/views/content-side/*.pug',
      './src/views/global/*.pug',
      './src/views/others/*.pug'
    ], {}, buildPug);
    gulp.watch('./src/images/*.svg', {}, buildSvg);
    gulp.watch('./src/index.xml', {}, buildIndexXML);
    gulp.watch('./src/preview.png', {}, buildPreview);
  } catch (e) { console.debug(e); }
};

// Pack for distribution
const pack = (resolve) => {
  fs.access('./out/index.xml', (e) => {
    if (e) {
      console.error('The package haven\'t built. Run `gulp build` before pack.');
      resolve();
    } else {
      fs.readdir('./out', (e, files) => {
        if (e) { console.error(e); }
        else {
          const packed = new zip();
          files.forEach((fileName) => {
            packed.addLocalFile(`./out/${fileName}`);
          });
          fs.readFile('./package.json', (e, buf) => {
            if (e) { console.error(e); }
            else {
              const pkg = JSON.parse(buf.toString());
              packed.writeZip(`./Prontera-${pkg.version}.zip`, (e) => {
                if (e) { console.error(e); }
                else { resolve(); }
              })
            }
          })
        }
      })
    };
  })
};

// Accessible tasks
gulp.task('zip', pack);
gulp.task('clean', clean);
gulp.task('mkdir', gulp.series(mkdir, license));
gulp.task('build', gulp.series('clean', 'mkdir', build));
gulp.task('watch', gulp.series('build', watch));
gulp.task('default', gulp.parallel('watch'));
