const gulp = require('gulp');
const njkRender = require('gulp-nunjucks-render');
const prettify = require('gulp-html-prettify');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const data = require('gulp-data');
const fs = require('fs');

let manageEnvironment = require('./_modules/njkFilters.js');
let newData = require('./_modules/dataStructure.js');
let dataFile = fs.readFileSync('./json_table.json');


function nunjucks() {	
	return gulp.src('./src/main.njk')
	.pipe(data(function(file) {
    	return {"data": newData(dataFile)
		}
	}))
	.pipe(plumber({
		errorHandler: function(err) {
			notify.onError({
			title: "Ошибка в Nunjucks",
			message: "<%= error.message %>"
			})(err);
		}
		}))
	.pipe(njkRender({
		manageEnv: manageEnvironment
	}))
	// .pipe(prettify({
	// 	indent_size : 4
	// })
	.pipe(gulp.dest('./build'))
	.pipe(browserSync.stream());
}
function scss (){
	return gulp.src('./src/style/*.scss')
	.pipe(plumber({
    	errorHandler: function(err) {
			notify.onError({
			title: "Ошибка в CSS",
			message: "<%= error.message %>"
			})(err);
	}
    }))
	.pipe(sourcemaps.init())
	.pipe (sass())
	.pipe(concat('all.css'))
	.pipe(autoprefixer({
		cascade: false
	}))
	.pipe(cleanCSS())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./build'))
	.pipe(browserSync.stream());
}
function js_files() {
	return gulp.src([ './node_modules/jquery/dist/jquery.js',
		'./src/js/*.js'	])
	.pipe(sourcemaps.init())
	// .pipe(uglify())
	.pipe(concat('all.js'))
	.pipe(gulp.dest('./build'))
	.pipe(sourcemaps.write())
	.pipe(browserSync.stream());
}
function clean () {
	return del(['/build/*', '!/build/json_table.json']);
}
function watch() {	
	    browserSync.init({
        server: {
            baseDir: "./build",
            directory: true
        }
   		});
	    gulp.watch('./src/**/*.njk', nunjucks, browserSync.reload);
	    gulp.watch('./src/style/*.scss', scss, browserSync.reload);
	    gulp.watch('./src/js/*.js', js_files, browserSync.reload);
}

let go = gulp.series(clean, gulp.parallel(nunjucks, scss, js_files), gulp.series(watch));
gulp.task('default', go);