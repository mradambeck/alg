module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, src: ['dev/styles/styles.css'], dest: 'dist/styles/styles.css', filter: 'isFile'},
          {expand: true, src: ['index.html'], dest: 'dist/index.html', filter: 'isFile'},
          {expand: true, src: ['README.md'], dest: 'dist/README.me', filter: 'isFile'}
        ],
        options: {
          process: [
            function (content, srcpath) {
              return content.replace("<script src='dev/scripts/app.js'></script>","<script src='scripts/index.js.map'></script>");
            },
            function (content, srcpath) {
              return content.replace("<script src='dev/scripts/search.js'></script>","");
            }
          ],
        },
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
          'dist/scripts/index.min.js': ['dev/scripts/app.js', 'dev/scripts/search.js']
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
