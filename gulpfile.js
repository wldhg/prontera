const gulp = require('gulp');
const gSass = require('gulp-sass');
const gRename = require("gulp-rename");
const gAutoPrefixer = require('gulp-autoprefixer');
const gMinifyJs = require("gulp-minify");
const gConcat = require("gulp-concat");
const gPug = require("gulp-pug");
const gClean = require("gulp-clean");
const gMinifySvg = require("gulp-svgmin");
const gBabel = require("gulp-babel");

// Build styles - prontera
var buildSassProntera = () => gulp.src('./src/styles/prontera-main.scss')
  .pipe(gSass({ outputStyle: 'compressed' }))
  .pipe(gAutoPrefixer())
  .pipe(gRename('style.css'))
  .pipe(gulp.dest('./out'));

// Build styles - no side-bar patch
var buildSassSinglePost = () => gulp.src('./src/styles/prontera-no-side-bar.scss')
  .pipe(gSass({ outputStyle: 'compressed' }))
  .pipe(gAutoPrefixer())
  .pipe(gRename('no-side-bar.css'))
  .pipe(gulp.dest('./out'));

// Build script - onload
var buildJsOnload = () => gulp.src('./src/scripts/onload.js')
  .pipe(gBabel({ presets: ['@babel/env'] }))
  .pipe(gMinifyJs({ noSource: true, ext: { min: '.js' } }))
  .pipe(gulp.dest('./out'));

// Build scripts - functions
var buildJsFunctions = () => gulp.src('./src/scripts/functions/*.js')
  .pipe(gConcat('functions.js'))
  .pipe(gBabel({ presets: ['@babel/env'] }))
  .pipe(gMinifyJs({ noSource: true, ext: { min: '.js' } }))
  .pipe(gulp.dest('./out'));

// Build html
var buildPug = () => gulp.src("./src/views/prontera.pug")
  .pipe(gPug())
  .pipe(gRename("skin.html"))
  .pipe(gulp.dest("./out"));

// Build svg
var buildSvg = () => gulp.src('./src/images/*.svg')
  .pipe(gMinifySvg())
  .pipe(gulp.dest('./out'));

// Build raw files
var buildRaw = () => gulp.src('./src/others/*')
  .pipe(gulp.dest('./out'));

// Clean out directory
var clean = () => gulp.src("./out", { allowEmpty: true })
  .pipe(gClean());

// Make out directory
var mkdir = () => gulp.src('*.*', { read: false })
  .pipe(gulp.dest('./out'));

// Watch for changes (Hot-build)
var watch = async () => {
  await clean();
  try {
    buildSassProntera(); gulp.watch([
      './src/styles/*.scss',
      '!./src/styles/prontera-no-side-bar.scss',
    ], {}, buildSassProntera);
    buildSassSinglePost(); gulp.watch([
      './src/styles/common.scss',
      './src/styles/prontera-no-side-bar.scss',
    ], {}, buildSassSinglePost);
    buildJsOnload(); gulp.watch('./src/scripts/onload.js', {}, buildJsOnload);
    buildJsFunctions(); gulp.watch('./src/scripts/functions/*.js', {}, buildJsFunctions);
    buildPug(); gulp.watch([
      './src/views/*.pug',
      './src/views/icons/*.pug',
      './src/views/content-body/*.pug',
      './src/views/content-side/*.pug',
    ], {}, buildPug);
    buildSvg(); gulp.watch('./src/images/*.svg', {}, buildSvg);
    buildRaw(); gulp.watch('./src/others/*', {}, buildRaw);
  } catch (e) { console.debug(e); }
};

// Build once
var build = async () => {
  await clean();
  try {
    buildSassProntera();
    buildSassSinglePost();
    buildJsOnload();
    buildJsFunctions();
    buildPug();
    buildSvg();
    buildRaw();
  } catch (e) { console.error(e); }
};

// Accessible tasks
gulp.task("clean", clean);
gulp.task('mkdir', mkdir);
gulp.task('default', gulp.series('clean', 'mkdir', watch));
gulp.task("build", gulp.series("clean", "mkdir", build));
