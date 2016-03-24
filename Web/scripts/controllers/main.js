'use strict';

/**
 * @ngdoc function
 * @name orizzonteMareApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the orizzonteMareApp
 */
angular.module('orizzonteMareApp')
  .controller('MainCtrl', function ($scope, $rootScope, $translate, Config) {
    $scope.changeLanguage = function (key) {
      $translate.use(key);
      Config.set('language', key);
    };
  });
