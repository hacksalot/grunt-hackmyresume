/*
 * grunt-hackmyresume
 * https://github.com/hacksalot/grunt-hackmyresume
 *
 * Copyright (c) 2016 hacksalot <hacksalot@indevious.com> (github.com/hacksalot)
 * Licensed under the MIT license.
 */



'use strict';



module.exports = function(grunt) {



  // Require specific HMR modules
  var HMR = require( 'hackmyresume' );
  var HMROUT = require( 'hackmyresume/src/cli/out');
  var HMRERR = require( 'hackmyresume/src/cli/error' );
  var _out;

  // Register the task
  grunt.registerMultiTask(
    'hackmyresume',
    'Grunt plugin for HackMyResume.',
    _task
  );



  /** The 'hackmyresume' Grunt task */
  function _task() {

      // Set up options and defaults
      var options = this.options({
        theme: 'modern',
        css: 'embed'
      });

      // Now that we have options, set up output and error modules
      _out = new HMROUT( options );
      HMRERR.init( options.debug, options.assert, options.silent );

      // Process incoming files. These are always in Grunt's array format.
      this.files.forEach(function(f) {

        // Exclude invalid files, per the Grunt sample
        var src = f.src.filter(function(filepath) {
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
          } else {
            return true;
          }
        });

        // Run HackMyResume
        _build( src, f.dest, options );

      });
  }



  /** Generate resumes through the HackMyResume API. */
  function _build( srcArray, destFile, options ) {

    try {
      grunt.log.writeln( 'Launching HackMyResume...' );

      // Going through the low-level HMR interface. Set up a verb
      var v = new HMR.verbs.build();

      // Add error / output handlers so HMR colored output displays in Grunt.
      v.on('hmr:error', function(ex) {
        HMRERR.err.apply(HMRERR, arguments);
        grunt.warn('An error occurred during HackMyResume resume generation.');
      });
      v.on('hmr:status', function() {
        _out.do.apply(_out, arguments);
      });
      options.errHandler = v;

      // Invoke the verb and kick off resume generation
      v.invoke.call( v, srcArray, [destFile], options, function() { } );
      if( v.errorCode ) {
        grunt.warn('HackMyResume exited with error ' + v.errorCode + '.');
      }

      // TODO: Use grunt.file.write|read against the string version of the
      // HackMyResume API.
    }
    catch( ex ) {

      var msg = ex.toString();
      if( ex.stack )
        msg += ex.stack;
      grunt.warn( msg );

      return;
    }

    // Print a success message.
    grunt.log.writeln('Resume(s) successfully generated to "' + destFile + '".');
  }



};
