/*
 * grunt-assets-version-replace
 * https://github.com/Black-Mirror/grunt-assets-version-replace
 *
 * Copyright (c) 2015 bammoo
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  'use strict';

  require('./tasks/index.js')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            'test/dist/*'
          ]
        }]
      }
    },

    assets_version_replace: {
      commons: {
        tsFiles: ['test/css_build/*.css', 'test/js_build/*.js'],
        tsPrefix: 'common_auto_create_ts_',
        tsVersionedFilesDest: 'test/dist/',
        replaceTemplateList: [
          'test/header.php',
          'test/footer.php',
          'test/submodule/header.php',
        ],
      },
      submodule: {
        tsFiles: ['test/submodule/css_build/*.css', 'test/submodule/js_build/*.js'],
        tsPrefix: 'submodule_auto_create_ts_',
        tsVersionedFilesDest: 'test/dist/',
        replaceTemplateList: [
          'test/submodule/header.php',
          'test/submodule/footer.php'
        ]
      }
    }

  });

  grunt.registerTask('default', [
    'clean:dist',
    'assets_version_replace'
  ]);

};