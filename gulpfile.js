var gulp = require('gulp');
var ts = require('gulp-typescript');
var del = require('del');
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', function (cb) {
	del(['js/**/*', 'js-min/**/*'], cb);
});

gulp.task('compile', function() {
	gulp.src('ts/**/*.ts')
		.pipe(sourcemaps.init())
		.pipe(ts({
			declarationFiles: true,
			noExternalResolve: true,
			removeComments: false,
			target: "es5",
			module: "amd",
			noImplicitAny: false,
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('js'));
});

gulp.task('minify', function () {
	gulp.src('js/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('js-min'))
		.pipe(concat('all.js'))
		.pipe(gulp.dest('js-min'));
});

gulp.task('build', ['clean', 'compile']);

gulp.task('watch', ['build'], function () {
	gulp.watch(['ts/**/*.ts'], ['build']);
});

gulp.task('default', ['build']);
