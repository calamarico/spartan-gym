/**
 * Grunt tasks
 * @param {Object} grunt grunt object.
 */
module.exports = function(grunt) {
  // Grunt tasks configuration.
  grunt.initConfig({
    baseName: 'deck-master',
    pkg: grunt.file.readJSON('package.json'),
    source: {
      root: 'app',
      test: 'test',
      build: 'build',
      grunt: 'Gruntfile.js',
      tmp: '<%= source.build %>/tmp',
      publish: '<%= source.build %>/publish/'
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: 'app'
        }
      }
    },
    jshint: {
      files: ['gruntfile.js', 'app/js/*.js', 'test/**/*.spec.js']
    },
    lesslint: {
      src: ['app/styles/*.less'],
      options: {
        csslint: {
          csslintrc: '.csslintrc'
        }
      }
    },
    less: {
      dev: {
        options: {
          dumpLineNumbers: 'comments',
          //cleancss: true,
          imports: {
            reference: [
              'app/styles/variables.less',
              'app/styles/bootstrap/variables.less',
              'app/styles/bootstrap/mixins.less']
          }
        },
        files: [{
          expand: true,
          cwd: 'app/styles/',
          src: ['style.less', 'bootstrap/bootstrap.less'],
          dest: 'app/styles/css/',
          ext: '.css'
        }]
      }
    },
    watch: {
      files: ['<%= jshint.files %>', '<%= lesslint.src %>'],
      tasks: ['jshint', 'less']
    },
    uglify: {
      build: {
        src: [
          'app/js/*.js'
        ],
        dest: 'build/js/app.min.js'
      }
    },
    cssmin: {
      target: {
        files: {
          'build/css/app.min.css': [
            'app/styles/css/bootstrap/bootstrap.css',
            'app/styles/css/style.css'
          ]
        }
      }
    },
    copy: {
      fonts: {
        expand: true,
        cwd: 'app/styles/fonts/',
        src: '**',
        dest: 'build/fonts/',
        flatten: true,
        filter: 'isFile'
      },
      templates: {
        expand: true,
        cwd: 'app/templates/',
        src: '**',
        dest: 'build/templates/',
        flatten: true,
        filter: 'isFile'
      },
      extras: {
        expand: true,
        cwd: 'app/',
        src: ['favicon.ico', 'robots.txt'],
        dest: 'build/',
        flatten: true,
        filter: 'isFile'
      },
      index: {
        src: 'app/index.build.html',
        dest: 'build/index.html'
      }
    },
    concat: {
      dist: {
        src: [
          'app/libs/angular/angular.min.js',
          'app/libs/angular/angular-animate.min.js',
          'app/libs/angular/angular-route.min.js',
          'app/libs/angular-ui/bootstrap/ui-bootstrap*.min.js',
          'app/libs/digest-hud/digest-hud.js',
          'app/libs/jquery/jquery.js',
          'build/js/app.min.js'
        ],
        dest: 'build/js/app.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-lesslint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('linter', ['jshint', 'lesslint']);
  grunt.registerTask('default', ['jshint', 'lesslint', 'less', 'connect',
    'watch']);
  grunt.registerTask('build', ['linter', 'less', 'uglify', 'concat',
    'cssmin', 'copy']);
};
