/* To prevent jshint from yelling at module.exports. */
/* jshint node:true */

'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {

  // Loads all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // App configuration
  var config = grunt.file.readJSON('config.json');

  // Tasks configuration
  grunt.initConfig({

    config: config,

    clean: {
      destination: {
        files: [{
          dot: true,
          src: ['<%= config.destination %>/*']
        }]
      },
      postBuild: {
        src: [
          '.tmp',
          '<%= config.destination %>/css/main.css'
        ]
      }
    },

    compass: {
      options: {
        sassDir: '<%= config.source %>/styles',
        cssDir: '<%= config.destination %>/css',
        force: true
      },
      dev: {
        options: {
          outputStyle: 'expanded'
        }
      },
      prod: {
        options: {
          outputStyle: 'compressed'
        }
      }
    },

    // concat task already configured from useminPrepare
    /*concat: {

    },*/

    connect: {
      options: {
        port: config.port,
        hostname: ''
      },
      'destination-source': {
        options: {
          middleware: function(connect) {
            return [
              lrSnippet,
              mountFolder(connect, config.destination),
              mountFolder(connect, config.source)
            ];
          }
        }
      },
      destination: {
        options: {
          middleware: function(connect) {
            return [
              lrSnippet,
              mountFolder(connect, config.destination)
            ];
          }
        }
      },
      test: {
        options: {
          port: config.testPort,
          middleware: function(connect) {
            return [
              lrSnippet,
              mountFolder(connect, config.destination),
              mountFolder(connect, config.source)
            ];
          }
        }
      },
    },

    copy: {
      destination: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.source %>',
          dest: '<%= config.destination %>',
          src: [
            '*.{ico,png,txt,html}',
            'images/*',
            'app/**/*'
          ]
        }]
      }
    },

    // cssmin task already configured from useminPrepare
    cssmin: {
      options: {
        keepSpecialComments: 0
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      source: [
        'Gruntfile.js',
        '<%= config.source %>/**/*.js',
        '!<%= config.source %>/vendors/**/*.js', // do not hint this
        '!<%= config.source %>/libraries/*.js' // do not hint this
      ]
    },

    ngmin: {
      all: {
        files: [{
          expand: true,
          // ngmin is executed after concat task
          // concat task was configured by useminPrepare
          // to concatenate in .tmp (by default)
          cwd: '.tmp/concat/js',
          src: ['*.js'],
          // therefore, we ngmin back into .tmp
          // so that uglify (also configured by useminPrepare)
          // can pick it up from there
          dest: '.tmp/concat/js'
        }]
      }
    },

    open: {
      index: {
        path: 'http://localhost:<%= config.port %>'
      }
    },

    shell: {
      options: {
        stdout: true,
        stderr: true,
        failOnError: true
      },
      init: {
        command: function() {
          return 'something';
        }
      }
    },

    // uglify task already configured from useminPrepare
    /*uglify: {

    },*/

    useminPrepare: {
      options: {
        dest: '<%= config.destination %>'
      },
      html: '<%= config.source %>/index.html'
    },

    usemin: {
      options: {
        assetsDirs: ['<%= config.destination %>']
      },
      html: '<%= config.destination %>/index.html'
    },

    watch: {
      styles: {
        files: ['<%= config.source %>/styles/**/*.scss'],
        tasks: 'compass:dev'
      },
      scripts: {
        files: ['<%= config.source %>/**/*.js'],
        tasks: ['jshint:source']
      },
      served: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= config.source %>/**/*.html', // View files
          '<%= config.destination %>/css/**/*.css', // Compiled CSS files from Sass
          '<%= config.source %>/**/*.js' // JS files
        ]
      }
    }

  });


  grunt.registerTask('test', 'Tests the app: lints all JS, runs Unit Tests & runs E2E Tests', function() {

    return grunt.task.run([
      'jshint:source'
    ]);

  });


  grunt.registerTask('build', 'Builds from src to dest while concatenating, minifying & uglifying sources. \n  Note: Requires test to be ran first', function() {

    grunt.task.requires('test');

    return grunt.task.run([
      'clean:destination',
      'compass:prod',
      'useminPrepare',
      // 'htmlmin:all',
      'concat',
      'ngmin:all',
      'uglify',
      'cssmin',
      'usemin',
      'copy:destination',
      'clean:postBuild'
    ]);

  });


  grunt.registerTask('previewbuild', 'Use this task to preview the final build in your browser. \n  Note: Runs tests automatically before building and serving', function() {

    return grunt.task.run([
      // 'font',
      'test',
      'build',
      'open:index',
      'connect:destination:keepalive'
    ]);

  });


  grunt.registerTask('serve', 'Serves sources using two different modes: \n  serve:dev\n    - compiles .scss sources\n    - serves sources (raw from /src and compiled from /dest)\n    - opens the browser whilst watching for changes \n  serve:test\n    - compiles .scss sources\n    - serves sources (raw from /src and compiled from /dest)', function(mode) {

    if (mode === 'dev') {

      return grunt.task.run([
        'clean:destination',
        'compass:dev',
        'open:index',
        'connect:destination-source',
        'watch'
      ]);

    } else if (mode === 'test') {

      return grunt.task.run([
        'clean:destination',
        'compass:dev',
        'connect:test'
      ]);

    }

  });

  grunt.registerTask('default', 'This is the default development task. Runs all tests before serve:dev', [
    'test',
    'serve:dev'
  ]);

};
