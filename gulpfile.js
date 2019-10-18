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
const webpack = require('webpack-stream');

let manageEnvironment = require('./_modules/njkFilters.js');
let newData = require('./_modules/dataStructure.js');
let dataFile = fs.readFileSync('./json_table.json');

const isDev = true;

let webpackConfig = {
	output: {
		filename: 'all.js'
	},
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            }
        ]
    },
    mode: isDev? 'development' : 'production',
    devtool: isDev? 'eval-source-map' : 'none'
};

function images(){
	return gulp.src('./src/img/**/*')
	.pipe(gulp.dest('./build/img'))
}
function fonts(){
	return gulp.src('./src/fonts/**/*')
	.pipe(gulp.dest('./build/fonts'))
}
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
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
	.pipe(concat('all.css'))
	.pipe(cleanCSS({
		level: 2
	}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./build'))
	.pipe(browserSync.stream());
}
function js_files() {
	return gulp.src([ './node_modules/jquery/dist/jquery.js',
		'./src/js/front.js'	])
	.pipe(sourcemaps.init())
	.pipe(uglify({
		toplevel: true
		}))
	.pipe(concat('all.js'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./build'))
	.pipe(browserSync.stream());
}
function scripts(){
	return gulp.src('./src/js/front.js')
	.pipe(webpack(webpackConfig))
	.pipe (gulp.dest('./build'))
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
	    gulp.watch('./src/**/*.njk', nunjucks, browserSync.reload);
	    gulp.watch('./src/style/*.scss', scss, browserSync.reload);
	    gulp.watch('./src/js/*.js', scripts, browserSync.reload);
}

gulp.task('cleaner', clean);
let go = gulp.series(clean, images, fonts, gulp.parallel(nunjucks, scss, scripts), gulp.series(watch));
gulp.task('default', go);