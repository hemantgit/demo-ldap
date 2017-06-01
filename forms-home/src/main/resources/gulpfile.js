'use strict';
/* jshint node: true */

var gulp = require('gulp');
var releaseType = process.env.RELEASE_TYPE;

var PACKAGE_MESSAGE =
    '/**\n' +
    ' * %s - Copyright © %s Backbase B.V - All Rights Reserved\n' +
    ' * Version %s\n' +
    ' * %s\n' +
    ' * @license\n' +
    ' */\n';

function getVersionNumber() {
    return require('./package.json').version;
}

gulp.task('clean', function () {
    var rimraf = require('rimraf');
    return rimraf.sync('./webresources/dist');
});

//jshint
gulp.task('lint', function () {
    var jshint = require('gulp-jshint');

    return gulp.src('./webresources/default/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

// Creates regular and minified distributions as UMD modules
//gulp.task('package',  function() {
gulp.task('package', ['lint'], function () {
    var sourcemaps = require('gulp-sourcemaps'),
        rename = require('gulp-rename'),
        ngAnnotate = require('gulp-ng-annotate'),
        wrap = require('gulp-wrap'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        insert = require('gulp-insert'),
        util = require('util');

    var meta = require('./package.json');
    var year = new Date().getFullYear();
    var packageMessage = util.format(PACKAGE_MESSAGE, meta.description, year, meta.version, meta.homepage);

    var files = [
        './webresources/default/module.js',
        './webresources/default/**/!(*spec).js'
    ];

    var wrapperOptions = {
        src: './umd-wrapper.tmpl'
    };

    var uglifyOptions = {
        preserveComments: 'some'
    };

    return gulp.src(files)
        .pipe(sourcemaps.init())
        .pipe(ngAnnotate())
        .pipe(concat('forms-angular-ui.js'))
        .pipe(wrap(wrapperOptions))
        .pipe(insert.prepend(packageMessage))
        .pipe(gulp.dest('./webresources/dist'))
        .pipe(rename('forms-angular-ui.min.js'))
        .pipe(uglify(uglifyOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./webresources/dist'));
});

//currently, simply copies the templates to the dist directory
gulp.task('package-templates', ['package'], function () {
    var templateCache = require('gulp-angular-templatecache');

    var tplCacheOptions = {
        module: 'forms-ui'
    };

    return gulp.src('./webresources/default/**/*.html')
        .pipe(templateCache('forms-angular-ui.tpl.js', tplCacheOptions))
        .pipe(gulp.dest('./webresources/dist'));

});

//watches and runs package when src changes. Useful for running unit tests against the build
gulp.task('watch', ['clean', 'package', 'package-templates'], function () {
    console.log('Watching for changes...');
    gulp.watch('./webresources/default/**/*.js', ['package']);
    gulp.watch('./webresources/default/**/*.html', ['package-templates']);
});

gulp.task('default', ['package-templates']);