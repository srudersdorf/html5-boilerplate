module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    modernizr: {

    // [REQUIRED] Path to the build you're using for development.
    "devFile" : "js/modernizr-dev.js",

    // [REQUIRED] Path to save out the built file.
    "outputFile" : "js/modernizr-custom.js",

    // Based on default settings on http://modernizr.com/download/
    "extra" : {
        "shiv" : true,
        "printshiv" : false,
        "load" : true,
        "mq" : false,
        "cssclasses" : true
    },

    // Based on default settings on http://modernizr.com/download/
    "extensibility" : {
        "addtest" : false,
        "prefixed" : false,
        "teststyles" : false,
        "testprops" : false,
        "testallprops" : false,
        "hasevents" : false,
        "prefixes" : false,
        "domprefixes" : false
    },

    // By default, source is uglified before saving
    "uglify" : true,

    // Define any tests you want to implicitly include.
    "tests" : [],

    // By default, this task will crawl your project for references to Modernizr tests.
    // Set to false to disable.
    "parseFiles" : true,

    // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
    // You can override this by defining a "files" array below.
    // "files" : [],

    // When parseFiles = true, matchCommunityTests = true will attempt to
    // match user-contributed tests.
    "matchCommunityTests" : false

    },

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

    //jquery: {
    //  // the parts you want to exclude from your build
    //  // possible values ['ajax', 'css', 'deprecated', 'dimensions', 'effects', 'offset']
    //  exclude: ['ajax', 'deprecated', 'dimensions', 'offset'],
    //  // the jQuery version (currently only 1.8.3 is supported) - defaults to 1.8.3
    //  version: '1.8.3',
    //  // output location (relative to your grunt.js file location)
    //  dest: 'bower_components/jquery/dist/test.js',
    //  // minify the output (true or false) - defaults to false
    //  minify: false
    //},

    concat: {
      dist: {
        src: [
           // jQuery is loaded from Google CDN
          'js/main.js',
          'js/plugins.js'
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
  grunt.loadNpmTasks("grunt-modernizr");
  //grunt.loadNpmTasks('grunt-uncss');

  require('load-grunt-tasks')(grunt);

  // Default Task is basically a rebuild
  //grunt.registerTask('default', ['exec:serve']);
  grunt.registerTask('default', ['concat', 'uglify',  'watch']);
};

