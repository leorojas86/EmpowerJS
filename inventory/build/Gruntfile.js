module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
    clean: ["deploy"],
    concat: {
      jss: {
        files: [{
          src: ['../../empower_js/*.js', '../app/**/*.js'],
          dest: 'deploy/index.js'
        }]
      }
    },
    concat_css: {
      csss: {
        src: ['../../empower_js/**/*.css', '../app/components/**/*.css'],
        dest: 'deploy/index.css'
      }
    },
    copy: {
      index: {
        expand: false,
        src: '../app/index.html',
        dest: 'deploy/index.html',
      },
      assets: {
        expand: true,
        src: '../app/assets',
        dest: 'deploy/assets',
      },
    },
    usemin: {
      html: 'deploy/index.html'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('build', [
    'clean',      //Deletes deploy folder
    'concat',     //Concats all js and generates 'deploy/index.js'
    'concat_css', //Concats all js and generates 'deploy/index.css'
    'copy',       //Copies index.html, spritesheet.png and jsons to deploy folder
    'usemin'      //Parses the index.html and replaces js,css references
  ]);
};
