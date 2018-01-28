module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
    clean: ["output"],
    concat: {
      jss: {
        files: [{
          src: ['../../empower_js/**/*.js',
                '../app/**/*.js',
                '../app/index.js'],
          dest: 'output/index.js'
        }]
      }
    },
    concat_css: {
      csss: {
        src: ['../../empower_js/**/*.css', '../app/components/**/*.css'],
        dest: 'output/index.css'
      }
    },
    copy: {
      index: {
        expand: false,
        src: '../app/index.html',
        dest: 'output/index.html',
      },
      assets: {
        expand: true,
        cwd: '../app/assets',
        src: '**',
        dest: 'output/assets',
      },
    },
    usemin: {
      html: 'output/index.html'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('build', [
    'clean',      //Deletes output folder
    'concat',     //Concats all js and generates 'output/index.js'
    'concat_css', //Concats all js and generates 'output/index.css'
    'copy',       //Copies index.html, spritesheet.png and jsons to output folder
    'usemin'      //Parses the index.html and replaces js,css references
  ]);
};
