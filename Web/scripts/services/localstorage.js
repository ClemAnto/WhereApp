'use strict';

/**
 * @ngdoc service
 * @name orizzonteMareApp.LocalStorage
 * @description
 * # LocalStorage
 * Factory in the orizzonteMareApp.
 */
angular.module('orizzonteMareApp')
  .factory('LocalStorage', function ($window) {
    return {
      set: function(key, value) {
        $window.localStorage[key] = value;
      },
      get: function(key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function(key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function(key) {
        return JSON.parse($window.localStorage[key] || null);
      }
    };
  });
