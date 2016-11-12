var gulp = require('gulp'),
    gulpJade = require('gulp-jade'),
    jade = require('jade');

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