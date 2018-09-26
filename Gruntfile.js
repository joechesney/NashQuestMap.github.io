module.exports = function(grunt){
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    jshint: {
      files: ['js/**/*.js', 'main.js', 'secrets.js', '!js/dist/*.js'],
      options: {
        predef: ['document', 'console', 'alert', '$', 'L', 'location', 'firebase', 'window'],
        esnext: true,
        globalstrict: true,
        globals: {},
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      javascripts: {
        files: ['./js/**/*.js', 'main.js', 'secrets.js', 'about.js'],
        tasks: ['jshint', 'browserify']
      },
    },
    clean: {
      options: { force: true },
      public: ['./public']
    },
    copy: {
      dev: {
        files: [{
          expand: true,
          cwd: "./",
          src: [
            "index.html",
            "about.html",
            "images/*",
            "styles/**/*.css",
            "styles/images/*",
            "node_modules/**/*",
            'ugly/mapBundle.min.js',
            'ugly/aboutBundle.min.js'
          ],
          dest: "./public/"
        }]
      }
    },
    browserify: {
      dist: {
        files:{
          'dist/mapBundle.js': ['./main.js'],
          'dist/aboutBundle.js': ['./about.js']
        },
        options: {
          transform: [["babelify", { "presets": ["es2015"] }]],
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          'ugly/mapBundle.min.js': ['./dist/mapBundle.js'],
          'ugly/aboutBundle.min.js': ['./dist/aboutBundle.js']
        }
      }
    }
  });
  require('matchdep').filter('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'browserify', 'uglify', 'watch']);
  grunt.registerTask('deploy', ['browserify', 'uglify', 'copy']);
  grunt.registerTask('cleanit', ['clean']);
}