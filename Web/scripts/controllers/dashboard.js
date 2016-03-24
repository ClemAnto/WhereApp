'use strict';

/**
 * @ngdoc function
 * @name orizzonteMareApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the orizzonteMareApp
 */
angular.module('orizzonteMareApp')
  .controller('DashboardCtrl', function($scope, $location, $route, $timeout, $translate, Config, Users) {
    // Set infinite loader for diaries
    $scope.diaries = [];
    $scope.initDiaries = true;
    $scope.noMoreDiariesAvailable = false;
    $scope.maxDiaries = Config.get('maxdiaries');

    // Load users data
    $scope.usersGetListCallback = function(data) {
      $scope.initDiaries = false;
      if (data) {
        for (var index = 0; index < data.length; ++index) {
          $scope.diaries.push(data[index]);
        }
      }
    };

    $scope.loadMoreDiaries = function() {
      if ( $scope.diaries.length >= $scope.maxDiaries ) {
        $scope.noMoreDiariesAvailable = true;
      } else {
        Users.loadMoreDiaries($scope.initDiaries, $scope.usersGetListCallback);
      }
    };

    // Set auto refresh for diaries
    $scope.refreshInterval = Config.get('refresh');

    var checkNewDiaries = function() {
      // Reset diaries
      $scope.diaries = [];
      $scope.initDiaries = true;
      $scope.noMoreDiariesAvailable = false;
      refreshDiaries = $timeout(checkNewDiaries, $scope.refreshInterval);
      $route.reload();
    };

    $scope.$on('$destroy', function() {
      $timeout.cancel(refreshDiaries);
    });

    var refreshDiaries = $timeout(checkNewDiaries, $scope.refreshInterval);

    // Open diary
    $scope.openDiary = function(userId) {
      $location.path('/diary/' + userId);
    };
  });
