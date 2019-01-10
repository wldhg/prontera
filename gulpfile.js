const fs = require("fs");
const gulp = require('gulp');
const gSass = require('gulp-sass');
const gRename = require("gulp-rename");
const gAutoPrefixer = require('gulp-autoprefixer');
const gMinifyJs = require("gulp-minify");
const gConcat = require("gulp-concat");
const gPug = require("gulp-pug");
const gClean = require("gulp-clean");
const gMinifySvg = require("gulp-svgmin");
const gEmpty = require("gulp-empty");

// Build styles
var buildSass = () => gulp.src('./scss/prontera.scss')
    .pipe(gSass({ outputStyle: 'compressed' }))
    .pipe(gAutoPrefixer())
    .pipe(gRename('style.css'))
    .pipe(gulp.dest('./out'));

// Build scripts
var buildJs = () => gulp.src('./js/*.js')
    .pipe(gConcat('script.js'))
    .pipe(gMinifyJs({ noSource: true, ext: {min: '.js'} }))
    .pipe(gulp.dest('./out'));

// Build html
var buildPug = () => gulp.src("./views/prontera.pug")
        .pipe(gPug())
        .pipe(gRename("skin.html"))
        .pipe(gulp.dest("./out"));

// Build svg
var buildSvg = () => gulp.src('./images/*.svg')
    .pipe(gMinifySvg())
    .pipe(gulp.dest('./out'));

// Build raw files
var buildRaw = () => gulp.src('./raw/*')
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
        buildSass(); gulp.watch('./scss/*.scss', {}, buildSass);
        buildJs(); gulp.watch('./js/*.js', {}, buildJs);
        buildPug(); gulp.watch(['./views/*.pug', './views/icons/*.pug'], {}, buildPug);
        buildSvg(); gulp.watch('./images/*.svg', {}, buildSvg);
        buildRaw(); gulp.watch('./raw/*', {}, buildRaw);
    } catch (e) { console.debug(e); }
};

// Build once
var build = async () => {
    await clean();
    try {
        buildSass();
        buildJs();
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
