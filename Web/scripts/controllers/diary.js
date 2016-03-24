'use strict';

/**
 * @ngdoc function
 * @name orizzonteMareApp.controller:DiaryCtrl
 * @description
 * # DiaryCtrl
 * Controller of the orizzonteMareApp
 */
angular.module('orizzonteMareApp')
  .controller('DiaryCtrl', function($scope, $location, $routeParams, $window, $translate, Users) {
    // Load user data
    $scope.userGetCallback = function(data) {
      if (data) {
        $scope.profiled = (typeof(data.nickname) !== 'undefined' && (data.nickname));
        $scope.userData = data;
        $scope.profileClasses = Users.getProfileClasses($scope.userData);
      }
    };

    Users.get($routeParams.diaryId, $scope.userGetCallback);

    $scope.goBack = function() {
      $window.history.back();
    };
  });
