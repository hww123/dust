var gulp = require('gulp'),
    gulpJade = require('gulp-jade'),
    jade = require('jade'),
    gulpWatch = require('gulp-watch'),
    batch = require('gulp-batch'),
    preprocess = require('gulp-preprocess'),
    map = require('map-stream'),
    rename = require('gulp-rename'),
    fs = require('fs'),
    path = require('path'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    gutil = require('gulp-util'),
    buffer = require('vinyl-buffer');

gulp.task('jade', function() {
    return gulp.src('./**/*.jade')
        .pipe(gulpJade({
            jade: jade,
            pretty: true
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('jquery', function() {
    return gulp.src('node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('public/javascripts'));
});

gulp.task('bootstrap-js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/*.js',
        '!node_modules/bootstrap/dist/css',
        '!node_modules/bootstrap/dist/fonts'])
        .pipe(gulp.dest('public/javascripts/bootstrap'));
});

gulp.task('bootstrap-css', function() {
    return gulp.src(['node_modules/bootstrap/dist/css/**',
        'node_modules/bootstrap/dist/fonts/**',
        '!node_modules/bootstrap/dist/js/*.js'], {
            base: 'node_modules/bootstrap/dist'
        })
        .pipe(gulp.dest('public/stylesheets/bootstrap'));
});

gulp.task('watch-jade', function() {
    gulpWatch('./**/*.jade', batch(function(e, done) {
        gulp.start('jade', done);
    }));
});

var trimTrailingSpaces = function(file, cb) {
    file.contents = new Buffer(String(file.contents).replace(/[ \t]+\n/g, '\n').replace(/\n+$/g, '\n'));
    cb(null, file);
}

gulp.task('combine', function() {
    return gulp.src('public/javascripts/main.js')
        .pipe(preprocess())
        .pipe(map(trimTrailingSpaces))
        .pipe(rename('main.combine.js'))
        .pipe(gulp.dest('public/javascripts'));
});

var requireDrizzleModules = function(dir, root, b) {
        fs.readdirSync(dir).forEach(function(file) {
            var filename = path.join(dir, file), ext;
            if (fs.statSync(filename).isDirectory()) {
                requireDrizzleModules(filename, root, b);
            } else {
                ext = path.extname(filename);
                if (ext === '.js' || ext === '.hbs' || ext === '.html') {
                    filename = path.relative(root, filename);
                    filename = path.join(path.dirname(filename), path.basename(filename, ext));
                    filename = './' + filename.replace(/\\/g, '/');
                    b.require({file: filename}, {basedir: root});
                }
            }
        });
    },
    options = {
            entries: ['./main.js'],
            extensions: [],
            basedir: './scripts',
            debug: false,
            cache: {}, packageCache: {}
    },
    libs = ['jquery', 'bootstrap'];

gulp.task('build-main', function() {
    var b = browserify(options);
    requireDrizzleModules('./scripts/app', './scripts', b);

    // b.external(libs);
    return b.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./bundle'));
});



gulp.task('build-common', function() {
    var b = browserify();
    b.require(libs.filter(function(item) { return item.charAt(0) !== '.';}));

    // libs.filter(function(item) { return item.charAt(0) === '.';}).forEach(function(item) {
    //     b.require(path.resolve('./scripts', item + '.js'), {expose: item});
    // });

    return b.bundle()
        .pipe(source('common.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./bundle'));
});