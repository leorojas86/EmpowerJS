module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
    clean: ['output'],
    concat: {
      jss: {
        files: [{
          src: ['../../empower_js/**/*.js', '../app/**/*.js', '../app/index.js'],
          dest: 'output/index.js'
        }]
      }
    },
    concat_css: {
      csss: {
        src: ['../../empower_js/**/*.css', '../app/components/**/*.css' ],
        dest: 'output/index.css'
      }
    },
    copy: {
      index_html: { expand: false, src: 'index.html', dest: 'output/index.html' },
      assets: { expand: true, cwd: '../app/assets', src: '**', dest: 'output/assets' },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', ['clean', 'concat', 'concat_css', 'copy']);
};
