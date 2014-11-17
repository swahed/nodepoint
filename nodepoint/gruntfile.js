/// <vs BeforeBuild='default' />
/*jslint node: true */
module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      node:{
        src: ["app.js", "gruntfile.js", "libs/**/*.js", "routes/**/*.js"],
        options: nodeLintOptions()
      },
      browser: {
        src: "public/js/**/*.js",
        options: clientLintOptions()
      }
    },
    nodeunit:{
      all: ["tests/**/*.test.js"]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('default', "Lint and test", ["jshint","nodeunit"], function(){
      console.log("Done!");
  });

  function nodeLintOptions() {
    var options = sharedLintOptions();
    options.node = true;
    return options;
  }

  function clientLintOptions() {
    var options = sharedLintOptions();
    options.browser = true;
    return options;
  }

  function sharedLintOptions() {
    return {
      bitwise: true,
      curly: false,
      eqeqeq: true,
      forin: true,
      immed: true,
      latedef: false,
      newcap: true,
      noarg: true,
      noempty: true,
      nonew: true,
      regexp: true,
      undef: true,
      strict: true,
      trailing: true
    };
  }
};