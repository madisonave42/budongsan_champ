module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    includes: {

			list:{
				cwd:'html_src',
				src: ['*.html'],
				dest: 'html',
			},

    	test: {
    		cwd:'html_src/test',
    		src: ['*.html'],
    		dest: 'html/test',
    		options: {
    			flatten:true,
    			includePath: 'html_src/_include'
    		}
    	},

			common: {
				cwd:'html_src/common',
				src: ['*.html'],
				dest: 'html/common',
				options: {
					flatten:true,
					includePath: 'html_src/_include'
				}
			},

			customer: {
				cwd:'html_src/cs_center',
				src: ['*.html'],
				dest: 'html/cs_center',
				options: {
					flatten:true,
					includePath: 'html_src/_include'
				}
			},

			member: {
        cwd:'html_src/member',
        src: ['*.html'],
        dest: 'html/member',
        options: {
          flatten:true,
          includePath: 'html_src/_include'
        }
      },

			map: {
				cwd:'html_src/map',
				src: ['*.html'],
				dest: 'html/map',
				options: {
					flatten:true,
					includePath: 'html_src/_include'
				}
			},

      mychamp: {
        cwd:'html_src/my_champ',
        src: ['*.html'],
        dest: 'html/my_champ',
        options: {
          flatten:true,
          includePath: 'html_src/_include'
        }
      },

      agency: {
        cwd:'html_src/agency',
        src: ['*.html'],
        dest: 'html/agency',
        options: {
          flatten:true,
          includePath: 'html_src/_include'
        }
      },

      interior: {
        cwd:'html_src/interior',
        src: ['*.html'],
        dest: 'html/interior',
        options: {
          flatten:true,
          includePath: 'html_src/_include'
        }
      },

      login: {
				cwd:'html_src/login',
				src: ['*.html'],
				dest: 'html/login',
				options: {
					flatten:true,
					includePath: 'html_src/_include'
				}
			}
    },

    concat: {
    	dist: {
    		src: ['js_src/*.js'],
    		dest: 'js/function.js'
    	}
    },

    uglify: {
    	build: {
        src: 'js/function.js',
        dest: 'js/function.min.js'
     	}
    },

    sass:{
    	dist: {
    		options: {
    			sourcemap: 'auto',
    			style: 'expanded'
    		},
    		files: [{
    			expand: true,
    			cwd: 'css_scss',
    			src: ['*.scss'],
    			dest: 'css/',
    			ext: '.css'
    		}]
    	}
    },

    connect: {
      server: {
        options: {
          port: 8008,
          hostname: 'localhost',
          base: '.',
          livereload: true,
          open: {
            server: {
              path: 'http://<%= connect.server.options.hostname %>:<%= connect.server.options.port %>'
            }
          }
        }
      }
    },

    copy: {

    	//jsLib: {
    	//	files:[{
    	//		expand: true,
    	//		cwd: 'js_src/lib/',
    	//		src: ['*.js', '*.map'],
    	//		dest: 'js/lib/'
    	//	}]
    	//},

    	// output
    	html: {
				files:[{
					expand: true,
					cwd: 'html/',
					src: ['**', '!**/@tmp.*'],
					dest: '_output/html/'
				}]
    	},

    	js: {
        files:[{
          expand: true,
          cwd: 'js/',
          src: ['**'],
          dest: '_output/js/'
        }]
    	},

    	css: {
				files:[{
					expand: true,
					cwd: 'css/',
					src: ['**', '!*.map'],
					dest: '_output/css/'
				}],
				options:{
					process: function(content){
						content = content.replace('/*# sourceMappingURL=agency.css.map */', '')
							.replace('/*# sourceMappingURL=common.css.map */', '')
							.replace('/*# sourceMappingURL=cs_center.css.map */', '')
							.replace('/*# sourceMappingURL=detail.css.map */', '')
							.replace('/*# sourceMappingURL=ie8.css.map */', '')
							.replace('/*# sourceMappingURL=join.css.map */', '')
							.replace('/*# sourceMappingURL=list.css.map */', '')
							.replace('/*# sourceMappingURL=map.css.map */', '')
							.replace('/*# sourceMappingURL=my_champ.css.map */', '')
							.replace('/*# sourceMappingURL=popup.css.map */', '');

						return content;
					}
				}
    	},

    	images: {
    		expand: true,
    		src:'images/**',
    		dest:'_output/'
    	}

    },

    watch: {

    	js: {
    		files: ['js_src/*.js'],
    		tasks: ['concat:dist', 'uglify:build', 'reload'],
    		options: {
      		livereload : true
      	}
    	},

    	html: {
    		files: ['html_src/**'],
    		tasks: ['includes', 'reload'],
    		options: {
      		livereload : true
      	}
    	},

    	css: {
    		files: ['css_scss/**'],
    		tasks: ['sass', 'reload'],
    		options: {
      		livereload : true
      	}
    	}

    },

    reload: {
    	port: 8008
    }

  });

  grunt.registerTask('default',function(){
  	grunt.log.writeln('Grunt Start...');
  	grunt.task.run([
  		'includes',
  		'concat',
  		'uglify',
  		'sass',
  		//'copy:jsLib',
  		'connect',
  		'watch'
  	]);
  });

  grunt.registerTask('export', function(){
	  grunt.task.run([
		  'includes',
		  'concat',
		  'uglify',
		  'sass',
		  'copy'
	  ]);
  });

};
