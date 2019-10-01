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

function nunjucks() {
	let dataFile = './json_table.json';
	let newData = function(){
		let data = {};
		JSON.parse(fs.readFileSync(dataFile)).forEach(function(elem){			
			if (!( data.hasOwnProperty(elem["date"]) )) {
				data[elem["date"]] = {};
			}
			if (! (data[elem["date"]].hasOwnProperty([elem["docId"]]) )) {
				data[elem["date"]][elem["docId"]] = {};
				data[elem["date"]][elem["docId"]]["docType"] = elem["income"];
			}
			data[elem["date"]][elem["docId"]][elem["name"]] = {image: elem["image"],
			name: elem["name"],price: elem["price"],quantity: elem["quantity"],
			removed: elem["removed"] };	
		})
		return data;
	};
	return gulp.src('./src/main.njk')
		.pipe(data(function(file) {
        	return {"data": newData()
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
		.pipe(njkRender())
		.pipe(prettify({
			indent_size : 4
		})
		.pipe(gulp.dest('./build'))
		)
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
	return gulp.src('./src/js/*.js')
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
gulp.task('go', go);