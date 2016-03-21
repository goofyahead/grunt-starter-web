module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	var config = grunt.file.readYAML('configGrunt.yml');

	console.log(config.variable);

	grunt.initConfig({
		sass: {
			dist: {
				src: 'src/sass/style.scss',
				dest: 'dist/css/style.css'
			}
		},
		concat: {
			options: {
				separator: ';',
			},
			dist: {
				// src : 'src/js/*.js'
				src: ['src/js/first.js', 'src/js/second.js'],
				dest: 'dist/js/app.js',
			},
		},
		jshint: {
			all:[
			'GruntFile.js',
			'src/js/*.js'
			]
		},
		wiredep: { //injects bower dependencies
			task: {
				src: ['src/*.html']
			}
		},
		connect: {
     		 all: {
        		options:{
		          port: 9000,
		          hostname: "0.0.0.0",
		          livereload: true
        		}
      		}
      	},
		watch: {
			sass: {
				files: 'src/sass/*.scss',
				tasks: ['sass']
			},
			js: {
				files: 'src/js/*.js',
				tasks: ['concat', 'jshint']
			},
			html: {
				files: 'src/*.html',
				tasks: ['wiredep', 'htmlmin']
			},
			options: {
				livereload: true,
			}
		},
		htmlmin: { //minifies HTMLS
			dist: {
				options: {                                 // Target options 
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'dist/index.html' : 'src/index.html'
				}
			}
		}
	});

	grunt.registerTask('default', [
		'sass',
		'concat',
		'jshint',
		'wiredep',
		'htmlmin',
		'connect',
		'watch'
		]);
};