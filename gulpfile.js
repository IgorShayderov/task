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
	let $data = [];
	function checkFor (element, index, array){
	    if ( element[this[1]] === this[0][this[1]] ){return true;} 
	};
		JSON.parse(fs.readFileSync(dataFile)).forEach(function(elem){	
				function dataWatcher(data){
					return new Proxy(data, {
						set(target, name, value){
							target[name] = value;
							return true;
						}, 
						get(target, name){
							switch (name) {
								case "isProxy":
									return true;
								case "date":
									return target.find( checkFor, [elem, name]);						
								case "docs":
									return target.find( checkFor, [elem, "date"])["docs"];
								case "products":
									return target.find( checkFor, [elem, "date"])["docs"].find( checkFor, [elem, "docId"] ).products;
								default:
									return  target[name];
								}
						} 
					})
				}
		
				let data = dataWatcher($data);
		
				if (!( $data.some( checkFor, [elem, "date"] ) )) {
						$data.push( {
						"date": elem["date"],
						"docs": []
						})
				}
		
				if (!( data.docs.some( checkFor, [elem, "docId"] ) )){
					data.docs.push( {
						"docId": elem["docId"],
						"docType": elem["income"],
						"products": []
					} );
				}
		
		
				data.products.push( {
					"name": elem["name"],
					"image": elem["image"],
					"price": elem["price"],
					"quantity": elem["quantity"],
					"removed": elem["removed"]
				} );
		})
		return $data;
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