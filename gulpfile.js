const gulp = require('gulp');

const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const nodesass = require('gulp-sass');

gulp.task('build', gulp.series(sass));
gulp.task('production', gulp.series(minSass));
gulp.task('dev', watch_sass);
gulp.task('default', gulp.series('dev'));

function sass() {
    return gulp.src(['src/core.scss'])
        .pipe(nodesass().on('error', nodesass.logError))
        .pipe(sourcemaps.init())
        .pipe(rename('./core.css'))
        .pipe(autoprefixer({ browsers: ['last 10 versions'] }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
}

function minSass() {
    return gulp.src(['src/core.scss'])
        .pipe(nodesass({
            outputStyle: 'compressed'
        }).on('error', nodesass.logError))
        .pipe(rename('./core.min.css'))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({ browsers: ['last 10 versions'] }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
}

function watch_sass() {
    return gulp.watch('src/**').on('change', gulp.series('build'));
}
