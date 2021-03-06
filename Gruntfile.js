module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, src: ['styles/styles.css'], dest: 'dist'},
          {expand: true, src: ['index.html'], dest: 'dist'},
          {expand: true, src: ['README.md'], dest: 'dist'}
        ]
      },
      options: {
        noProcess: ['**/*.{css,md}'],
        process:
          function (content, srcpath) {
            // console.log(content);
            var firstPass = content.replace(/\/app.js/, '/index.min.js');
            var secondPass = firstPass.replace(/<script src=\'scripts\/search\.js\'><\/script>/, " ");

            return secondPass;
          }
      },
    },
    uglify: {
      my_target: {
        options: {
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
          sourceMap: true,
          sourceMapName: 'dist/scripts/index.js.map'
        },
        files: {
          'dist/scripts/index.min.js': ['scripts/app.js', 'scripts/search.js']
        }
      }
    },
    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**']
    }

  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-uglify'); // "Uglify" or Minify the JS
  grunt.loadNpmTasks('grunt-contrib-copy'); // Copy (and modify) files
  grunt.loadNpmTasks('grunt-gh-pages'); // Move only the /dist folder to gh-pages

  // Default task
  grunt.registerTask('deploy', ['uglify', 'copy', 'gh-pages']);

};
