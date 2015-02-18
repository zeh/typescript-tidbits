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
		watch: {
			scripts: {
				files: ['**/*.ts'],
				tasks: ['build'],
				options: {
					spawn: false,
				},
			},
		}
	});
	
	grunt.loadNpmTasks("grunt-ts");
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask("build", ["clean:main", "ts:main", "copy:main", "clean:compiled"]);

	grunt.registerTask("default", "build");
	
};