const gulp = require('gulp');
const njkRender = require('gulp-nunjucks-render');
const prettify = require('gulp-html-prettify');
const concat = require('gulp-concat');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const jsFiles = [
'./src/js/jquery-3.4.0.min.js',
'./src/js/back.js',
'./src/js/front.js']

const sqliteJson = require('sqlite-json');
const sqlite3 = require('sqlite3');
var db = new sqlite3.Database('database.db3');
exporter = sqliteJson(db);
let new_table = 
'SELECT  docs.date, docTypes.name as income, rows.DocId, products.image, products.name, products.price, rows.quantity, ' +
'products.removed FROM rows ' +
'INNER JOIN docs ON rows.DocId = docs.Id ' +
'INNER JOIN docTypes ON docs.typeId = docTypes.Id ' +
'INNER JOIN products ON rows.productId = products.Id ' +
'ORDER BY docs.date';

let getGoods = exporter.json(new_table, function (err, json) {
	return "hi NIGGER";
  });

function nunjucks() {
	return gulp.src('./src/main.njk')
		.pipe(njkRender({data: {
			goods: getGoods()
		}}))
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
    .pipe(sourcemaps.init() )
	.pipe (sass())
	.pipe(concat('all.css'))
	.pipe(cleanCSS())
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
	    gulp.watch('./src/style/*.scss', scss);
	    gulp.watch('./src/js/*.js', js_files);
	    gulp.watch('./*.html', browserSync.reload);
}

let go = gulp.series(clean, gulp.parallel(nunjucks, scss, js_files), gulp.series(watch));
gulp.task('go', go);

