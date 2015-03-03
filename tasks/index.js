/*
 * grunt-assets-version-replace
 * https://github.com/Black-Mirror/grunt-assets-version-replace
 *
 * Copyright (c) 2014-2015 bammoo
 * Licensed under the MIT license.
 */


module.exports = function(grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-contrib-copy');

  var newTS = Math.round(+new Date() / 1000);

  grunt.registerMultiTask('assets_version_replace', 'The best Grunt plugin ever.', function() {

    var tsPrefix = this.data.tsPrefix;
    // 默认值
    if(!tsPrefix)
      tsPrefix = 'auto_create_ts_';

    // console.log(newTS)
    // console.log(tsPrefix)
    console.log('prefix with: "' + tsPrefix + newTS + '"');

    //get the full asset text, like "text/javascript" src="dogeout/js_build/app.auto_create_ts_1415079600.js"
    var re1 = new RegExp("([\\\"|\\\'].*\\\." + tsPrefix + ")(\\\d+)(\\\.js[\\\"|\\\'])", "g");
    var re2 = new RegExp("([\\\"|\\\'].*\\\." + tsPrefix + ")(\\\d+)(\\\.css[\\\"|\\\'])", "g");
    // console.log(re1)
    // console.log(re2)

    function replaceAssets(fileSrc) {
      //read page file data
      var htmlData = grunt.file.read(fileSrc);
      // console.log(htmlData)

      // var tsPrefix = 'auto_create_ts_com_';
      // var newTS = 'abc';
      // var testString = '"text/javascript" src="/js_build/app.auto_create_ts_com_1415079600.js"';
      // re1.test(testString);
      // testString.replace(re1, "$1" + newTS + "$3");

      var a1 = htmlData.match(re1)
      var num1 = !a1 ? 0 : a1.length
      console.log('Find ' + num1 + ' js ts string.')

      var a2 = htmlData.match(re2)
      var num2 = !a2 ? 0 : a2.length
      console.log('Find ' + num2 + ' css ts string.')

      if(num1 || num2) {

        var newdata = htmlData.replace(re1, "$1" + newTS + "$3");
        newdata = newdata.replace(re2, "$1" + newTS + "$3");

        if (grunt.file.write(fileSrc, newdata)) {
          grunt.log.success(fileSrc + ' replace ts successfully');
        } else {
          grunt.log.error(fileSrc + ' replace ts failed');
        }
      }
      else
        grunt.log.error('Can not find ts string in file: ' + fileSrc)

    }

    // Add rename function to copy task config
    var rename = function(dest, src) {
      if(src.indexOf('.js') > -1) {
        return dest + src.replace('.js','.' + tsPrefix + newTS + '.js');
      }
      else {
        return dest + src.replace('.css','.' + tsPrefix + newTS + '.css');
      }
    }

    // lack params
    if(!this.data.replaceTemplateList
      || !this.data.tsFiles
      || !this.data.tsVersionedFilesDest) {
      grunt.log.warn('Config not correct.')
      return;
    }

    var copyTaskFilesConfig = {};
    copyTaskFilesConfig.src = this.data.tsFiles
    copyTaskFilesConfig.dest = this.data.tsVersionedFilesDest
    copyTaskFilesConfig.rename = rename;
    copyTaskFilesConfig.expand = true;
    grunt.config('copy.default.files', [copyTaskFilesConfig]);
    grunt.task.run('copy');


    this.data.replaceTemplateList.forEach(function(r) {
      // Warn on and remove invalid source files (if nonull was set).
      if (!grunt.file.exists(r)) {
        grunt.log.warn('Source file "' + r + '" not found.');
        return false;
      } else {
        replaceAssets(r);
        return true;
      }
    })

  });

};
