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

			member: {
        cwd:'html_src/member',
        src: ['*.html'],
        dest: 'html/member',
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

      login: {
				cwd:'html_src/login',
				src: ['*.html'],
				dest: 'html/login',
				options: {
					flatten:true,
					includePath: 'html_src/_include'
				}
			}
/*
			admin: {
				cwd:'html_src/admin',
				src: ['*.html'],
				dest: 'html/admin',
				options: {
					flatten:true,
					includePath: 'html_src/_include'
				}
			},

      log: {
        cwd:'html_src/log',
        src: ['*.html'],
        dest: 'html/log',
        options: {
          flatten:true,
          includePath: 'html_src/_include'
        }
      },

      monitoring: {
        cwd:'html_src/monitoring',
        src: ['*.html'],
        dest: 'html/monitoring',
        options: {
          flatten:true,
          includePath: 'html_src/_include'
        }
      },

      setting: {
        cwd:'html_src/setting',
        src: ['*.html'],
        dest: 'html/setting',
        options: {
          flatten:true,
          includePath: 'html_src/_include'
        }
      },

      stats: {
        cwd:'html_src/stats',
        src: ['*.html'],
        dest: 'html/stats',
        options: {
          flatten:true,
          includePath: 'html_src/_include'
        }
      },

      vnfManagement: {
        cwd:'html_src/vnf_management',
        src: ['*.html'],
        dest: 'html/vnf_management',
        options: {
          flatten:true,
          includePath: 'html_src/_include'
        }
      }
*/
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
						content = content.replace('/*# sourceMappingURL=common.css.map */', '')
							.replace('/*# sourceMappingURL=ie8.css.map */', '')
							.replace('/*# sourceMappingURL=join.css.map */', '')
							.replace('/*# sourceMappingURL=popup.css.map */', '');
							//.replace('/*# sourceMappingURL=popup.css.map */', '')
							//.replace('/*# sourceMappingURL=stats.css.map */', '')
							//.replace('/*# sourceMappingURL=table_ori.css.map */', '')
							//.replace('/*# sourceMappingURL=vim.css.map */', '')
							//.replace('/*# sourceMappingURL=vnf.css.map */', '');

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
