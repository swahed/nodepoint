module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      node:{
        src: ["src/*.js", "src/server/**/*.js", "gruntfile.js"],
        options: getLintOptionsServer()
      },
      browser: {
        src: "src/client/**/*.js",
        options: getLintOptionsBrowser()
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  //grunt.registerTask('default', ['uglify']);

  grunt.registerTask('default', "Default build configuration", function(){
      console.log("Hello world!");
  });

  function getLintOptionsServer(){
    return {};
  }

  function getLintOptionsBrowser(){
    return {};
  }
};