const gulp = require('gulp');
const njkRender = require('gulp-nunjucks-render');
const prettify = require('gulp-html-prettify');
const concat = require('gulp-concat');
const del = require('del');
const browserSync = require('browser-sync').create();
const jsFiles = [
'./src/js/jquery-3.4.0.min.js',
'./src/js/back.js',
'./src/js/front.js']

function nunjucks() {
	return gulp.src('./src/main.njk')
		.pipe(njkRender())
		.pipe(prettify({
			indent_size : 4
		})
		.pipe(gulp.dest('./build'))
		)
		.pipe(browserSync.stream());
}
function style() {
	return gulp.src('./src/css/*.css')
	.pipe(concat('all.css'))
	.pipe(gulp.dest('./build'))
	.pipe(browserSync.stream());
}
function js_files() {
	return gulp.src(jsFiles)
	.pipe(concat('all.js'))
	.pipe(gulp.dest('./build'))
	.pipe(browserSync.stream());
}
function clean () {
	return del(['./build/*']);
}
function watch() {
	
	    browserSync.init({
        server: {
            baseDir: "./build",
            directory: true
        }
   		});
	    gulp.watch('./src/**/*.njk', gulp.series(nunjucks));
	    gulp.watch('./src/css/*.css', style);
	    gulp.watch('./src/js/*.js', js_files);
	    gulp.watch('./*.html', browserSync.reload);
}

let go = gulp.series(clean, gulp.parallel(nunjucks, style, js_files), gulp.series(watch));
gulp.task('go', go);

