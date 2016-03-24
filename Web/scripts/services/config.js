'use strict';

/**
 * @ngdoc service
 * @name orizzonteMareApp.Config
 * @description
 * # Config
 * Factory in the orizzonteMareApp.
 */
angular.module('orizzonteMareApp')
  .factory('Config', function (LocalStorage) {
    var globals = {
      urlInfo: 'api/getInfo.php',
      urlDiaries: 'api/listDiaries.php',
      urlDiary: 'api/getDiary.php'
    };

    var defaultConfig = {
      language: 'it',  // Language choosen (it, en)
      refresh: 60000,  // Refresh interval
      limit: 5,        // Limit for each diaries request
      maxdiaries: 50   // Max diaries
    };

    var config = LocalStorage.getObject('config');
    if (config === null) {
      config = defaultConfig;
      LocalStorage.setObject('config', config);
    }

    return {
      all: function() {
        return config;
      },
      get: function(property) {
        return config.hasOwnProperty(property) ? config[property] : '';
      },
      set: function(property, value) {
        if (typeof(value) !== 'undefined' && value) { // is set
          config[property] = value;
          LocalStorage.setObject('config', config);
          return true;
        } else {
          return false;
        }
      },
      getURLInfo: function() {
        return globals.urlInfo;
      },
      getURLDiaries: function() {
        return globals.urlDiaries;
      },
      getURLDiary: function() {
        return globals.urlDiary;
      }
    };
  });
