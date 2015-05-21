// Generated on 2014-12-05 using generator-angular-fullstack 2.0.13
'use strict';

module.exports = function (grunt) {
  var localConfig;
  try {
    localConfig = require('./server/config/local.env');
  } catch(e) {
    localConfig = {};
  }

  // Load grunt tasks automatically, when needed
  require('jit-grunt')(grunt, {
    express: 'grunt-express-server',
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    protractor: 'grunt-protractor-runner',
    injector: 'grunt-asset-injector',
    processhtml: 'grunt-processhtml'
  });

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    pkg: grunt.file.readJSON('package.json'),
    mainApp: {
      // configurable paths
      client: require('./bower.json').appPath || 'client',
      dist: 'dist'
    },
    express: {
      options: {
        port: process.env.PORT || 9000
      },
      dev: {
        options: {
          script: 'server/app.js',
          debug: true
        }
      },
      prod: {
        options: {
          script: 'dist/server/app.js'
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= express.options.port %>'
      }
    },
    watch: {
      injectJS: {
        files: [
          '<%= mainApp.client %>/**/*.js',
          '!<%= mainApp.client %>/{app,components}/**/*.js',
          '!<%= mainApp.client %>/{app,components}/**/*.spec.js',
          '!<%= mainApp.client %>/{app,components}/**/*.mock.js',
          '!<%= mainApp.client %>/*.js'],
        //tasks: ['injector:scripts']
      },
      injectCss: {
        files: [
          '<%= mainApp.client %>/assets/main.css'
        ],
        tasks: ['injector:css']
      },
      injectSass: {
        files: [
          '<%= mainApp.client %>/**/*.{scss,sass}'],
        tasks: ['injector:sass']
      },
      sass: {
        files: [
          '<%= mainApp.client %>/assets/sass/**/*.{scss,sass}'],
        tasks: ['sass', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        files: [
          '{.tmp,<%= mainApp.client %>}/**/*.css',
          '{.tmp,<%= mainApp.client %>}/**/*.html',
          '{.tmp,<%= mainApp.client %>}/*.js',
          '{.tmp,<%= mainApp.client %>}/**/*.js',
          '!{.tmp,<%= mainApp.client %>}/bower_components/**/*.js',
          '<%= mainApp.client %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        options: {
          livereload: true
        }
      },
      express: {
        files: [
          'server/**/*.{js,json}'
        ],
        tasks: ['express:dev', 'wait'],
        options: {
          livereload: true,
          nospawn: true //Without this option specified express won't be reloaded
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '<%= mainApp.client %>/.jshintrc',
        reporter: require('jshint-stylish')
      },
      server: {
        options: {
          jshintrc: 'server/.jshintrc'
        },
        src: [
          'server/**/*.js',
          '!server/**/*.spec.js'
        ]
      },
      serverTest: {
        options: {
          jshintrc: 'server/.jshintrc-spec'
        },
        src: ['server/**/*.spec.js']
      },
      all: [
        '<%= mainApp.client %>/{app,components}/**/*.js',
        '!<%= mainApp.client %>/{app,components}/**/*.spec.js',
        '!<%= mainApp.client %>/{app,components}/**/*.mock.js'
      ],
      test: {
        src: [
          '<%= mainApp.client %>/{app,components}/**/*.spec.js',
          '<%= mainApp.client %>/{app,components}/**/*.mock.js'
        ]
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= mainApp.dist %>/*',
            '!<%= mainApp.dist %>/.git*',
            '!<%= mainApp.dist %>/.openshift',
            '!<%= mainApp.dist %>/Procfile'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/',
          src: '{,*/}*.css',
          dest: '.tmp/'
        }]
      }
    },

    // Debugging with node inspector
    'node-inspector': {
      custom: {
        options: {
          'web-host': 'localhost'
        }
      }
    },

    // Use nodemon to run server in debug mode with an initial breakpoint
    nodemon: {
      debug: {
        script: 'server/app.js',
        options: {
          nodeArgs: ['--debug-brk'],
          env: {
            PORT: process.env.PORT || 9000
          },
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // opens browser on initial server start
            nodemon.on('config:update', function () {
              setTimeout(function () {
                require('open')('http://localhost:8080/debug?port=5858');
              }, 500);
            });
          }
        }
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      target: {
        src: '<%= mainApp.client %>/index.html',
        ignorePath: '<%= mainApp.client %>/',
        exclude: [ /neat/, /bourbon/, /bootstrap-sass-official/, /bootstrap.js/, '/json3/', '/es5-shim/', /bootstrap.css/, /font-awesome.css/, /jquery-ui/ ]
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= mainApp.dist %>/client/{,*/}*.js',
            '<%= mainApp.dist %>/client/{,*/}*.css',
            '<%= mainApp.dist %>/client/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= mainApp.dist %>/client/assets/fonts/*'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: ['<%= mainApp.client %>/index.html'],
      options: {
        dest: '<%= mainApp.dist %>/client'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= mainApp.dist %>/client/{,*/}*.html'],
      css: ['<%= mainApp.dist %>/client/{,*/}*.css'],
      js: ['<%= mainApp.dist %>/client/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= mainApp.dist %>/client',
          '<%= mainApp.dist %>/client/assets/images'
        ],
        // This is so we update image references in our ng-templates
        patterns: {
          js: [
            [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
          ]
        }
      }
    },

    ngAnnotate: {
      production: {
        options: {
          singleQuotes: true,
          add: true
        },
        files: [{
          src:['./client/controllers/**/*.js', './client/directives/*.js', './client/services/*.js', './client/filters/*.js', './client/bootstrap/*.js', './client/assets/js/angular-ui-bootstrap/src/**/*.js']
        }],
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: './client',
          out: 'dist/client/main.min.js',
          mainConfigFile: 'client/bootstrap.js',
          findNestedDependencies: true,
          fileExclusionRegExp: /^node_modules$|^sass$|^css$|^fonts$|^images$|^views$|^Gruntfile\.js$|^gulpfile\.js$|^package\.json$|\.*/,
          include: ['bootstrap']
        }
      }
    },

    processhtml: {
      dev:{
        options: {
          data: {
            optimize: false
          }
        }
      },
      dist: {
        files: {
          'dist/client/index.html': ['client/index.html']
        },
        options: {
          data: {
            optimize: true
          }
        }
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= mainApp.client %>',
          dest: '<%= mainApp.dist %>/client',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'bower_components/**/*',
            'assets/images/**/*',
            'assets/fonts/**/*',
            'assets/js/**/**/*',
            'views/**/*',
            'index.html'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= mainApp.dist %>/client/assets/images',
          src: ['generated/*']
        }, {
          expand: true,
          dest: '<%= mainApp.dist %>',
          src: [
            'package.json',
            'assets',
            'server/**/*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= mainApp.client %>',
        dest: '.tmp/',
        src: ['assets/**/*.css']
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'sass',
      ],
      test: [
        'sass',
      ],
      debug: {
        tasks: [
          'nodemon',
          'node-inspector'
        ],
        options: {
          logConcurrentOutput: true
        }
      },
      dist: [
        'sass',
        //'imagemin',
        //'svgmin'
      ]
    },

    env: {
      test: {
        NODE_ENV: 'test'
      },
      prod: {
        NODE_ENV: 'production'
      },
      all: localConfig
    },

    // Compiles Sass to CSS
    sass: {
      dev: {
        options: {
          compass: false
        },
        files: {
          '<%= mainApp.client %>/assets/css/main.css' : '<%= mainApp.client %>/assets/sass/main.scss'
        }
      }
    },

    injector: {
      options: {},
      // Inject component scss (i.e. bourbon, neat) into main.scss
      sass: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/client', 'client');
            return '@import \'' + filePath + '\';';
          },
          starttag: '// injector',
          endtag: '// endinjector'
        },
        files: {
          '<%= mainApp.client %>/assets/sass/app.scss': [
            '<%= mainApp.client %>/assets/sass/custom/base/_variables.scss',
            '<%= mainApp.client %>/assets/sass/custom/base/_grid_settings.scss',
            '!<%= mainApp.client %>/assets/sass/app.{scss,sass}'
          ]
        }
      },

      // Inject component css into index.html
      css: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/client/', '');
            return '<link rel="stylesheet" href="' + filePath + '">';
          },
          starttag: '<!-- injector:css -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%= mainApp.client %>/index.html': [
            '<%= mainApp.client %>/**/*.css',
            '!<%= mainApp.client %>/assets/js/**/*'
          ]
        }
      }
    },
  });

  // Used for delaying livereload until after server has restarted
  grunt.registerTask('wait', function () {
    grunt.log.ok('Waiting for server reload...');

    var done = this.async();

    setTimeout(function () {
      grunt.log.writeln('Done waiting!');
      done();
    }, 1500);
  });

  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });

  grunt.registerTask('serve', function (env, target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'env:all', 'env:prod', 'express:prod', 'wait', 'open', 'express-keepalive']);
    }
    
    if (target === 'debug') {
      return grunt.task.run([
        'clean:server',
        'env:all',
        'injector:sass', 
        'concurrent:server',
        'injector',
        'wiredep',
        'autoprefixer',
        'concurrent:debug'
      ]);
    }

    grunt.task.run([
      'clean:server',
      'env:all',
      'injector:sass', 
      'concurrent:server',
      'injector',
      'wiredep',
      'autoprefixer',
      'processhtml:dev',
      'express:dev',
      'wait',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', function(target) {
    if (target === 'server') {
      return grunt.task.run([
        'env:all',
        'env:test',
        'mochaTest'
      ]);
    }

    else if (target === 'client') {
      return grunt.task.run([
        'clean:server',
        'env:all',
        'injector:sass', 
        'concurrent:test',
        'injector',
        'autoprefixer',
        'karma'
      ]);
    }

    else grunt.task.run([
      'test:server',
      'test:client'
    ]);
  });

  grunt.registerTask('build', function() { 
    grunt.task.run(['clean:dist',
      'injector:sass', 
      //'concurrent:dist',
      'injector',
      'wiredep',
      'useminPrepare',
      'autoprefixer',
      'concat',
      'ngAnnotate',
      'requirejs',
      'copy:dist',
      'cssmin',
      'processhtml:dist'
    ]);
  });

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
