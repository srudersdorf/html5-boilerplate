module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    //autoprefixer: {
    //  options: {
    //    browsers: ['last 2 version']
    //  },
    //  multiple_files: {
    //    expand: true,
    //    flatten: true,
    //    src: 'css/build/*.css',
    //    dest: 'css/build/prefixed/'
    //  }
    //},

    concat: {
      dist: {
        src: [
          'js/plugins.js',
          'js/main.js'
        ],
        dest: 'js/build/scripts.js'
      }
    },

    uglify: {
      build: {
        src: 'js/build/scripts.js',
        dest: 'js/build/scripts.js'
      }
    },

    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },


	// UNCSS läuft, produziert aber Fehler.
	// z.B. werden Bootstrap Tooltips als nicht verwendet erkannt, was falsch ist.
    //uncss: {
	//  dist: {
	//    src: ['_site/index.html'],
	//    dest: 'css/tidy.css',
	//    options: {
	//      report: 'min', // optional: include to report savings
	//      ignoreSheets: ['bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_tooltip.scss']
	//    }
	//  }
	//},

    imagemin: {
		//options: {                       // Target options
	    //  cache: false
	    //},
      dynamic: {
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'img-compressed/'
        }]
      }
    },

    watch: {
      css: {
        files: ['sass/*.scss','sass/partials/*.scss'],
        tasks: ['compass:dist']
      },
      scripts: {
        files: ['js/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        }
      },
      images: {
        files: ['img/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        options: {
          spawn: false,
          }
        }
        //jekyll: {
        //  files: ['*.html'],
        //  tasks: ['jekyll:dev']
        //}
      }
  });

  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  //grunt.loadNpmTasks('grunt-uncss');

  require('load-grunt-tasks')(grunt);

  // Default Task is basically a rebuild
  //grunt.registerTask('default', ['exec:serve']);
  grunt.registerTask('default', ['concat', 'uglify', 'watch']);
};

