module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			main: {
				src: ["js/**"]
			},
			compiled: {
				src: ["ts/**/*.*", "!**/*.ts", "!*.ts"]
			}
		},
		copy: {
			main: {
				files: [
					{ expand: true, cwd: 'ts/', src: ['**', '!**/*.ts', '!*.ts'], dest: 'js/' },
				],
			},
		},
		ts: {
			// https://www.npmjs.com/package/grunt-ts
			options: {
				compile: true,
				comments: false,
				target: 'es5',
				module: 'amd',
				sourceMap: true,
				sourceRoot: '',
				mapRoot: '',
				declaration: false,
				noImplicitAny: false,
				fast: "watch"
			},
			main: {
				src: ["ts/**/*.ts"],
				out: '',
				watch: '',
			}
		},
	});
	
	grunt.loadNpmTasks("grunt-ts");
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask("build", ["clean:main", "ts:main", "copy:main", "clean:compiled"]);

	grunt.registerTask('default', 'Shows available tasks', function() {
		grunt.log.writeln("--------------------------------------------------------------------");
		grunt.log.writeln("Available tasks: ");
		grunt.log.writeln();
		grunt.log.writeln("clean		: Clean the /js folder");
		grunt.log.writeln("copy			: Copy static (main) files");
		grunt.log.writeln("build		: Clean, copy static files, and build the ts files and watch for changes");
		grunt.log.writeln("--------------------------------------------------------------------");
	});
	
	/*
	make.bat used to be:
	tsc ts/main.ts --sourcemap -out photobooth.js
	*/

};