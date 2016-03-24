'use strict';

/**
 * @ngdoc service
 * @name orizzonteMareApp.Users
 * @description
 * # Users
 * Factory in the orizzonteMareApp.
 */
angular.module('orizzonteMareApp')
  .factory('Users', function ($http, Config, Diary) {
    function fill(user) {
      // Set avatar image
      if (user.avatar === 'picture') {
        user.avatarImg = 'data:image/jpeg;base64,' + user.picture;
      } else {
        user.avatarImg = 'images/avatars/' + (user.avatar || 'avatar_placeholder') + '.png';
      }

   
      // Set diary based on answers
      user.diary = Diary.get(user.answers);


      /* ADD BY CI */
      // Get num of viewed comuni
     var comuneViewedNum = user.config.comuneViewedNum;

      var getIndefOfViewedComuni = function(){
         var comuneViewedState = user.config.comuneViewedState,
             ids = [];
         console.log('indexes: ', comuneViewedState);
         for (key in comuneViewedState) {
             if (comuneViewedState.hasOwnProperty(key) && comuneViewedState[key] === true) {
                 console.log(key + " -> " + comuneViewedState[key]);
                 ids.push(key);
               }
         }
         return ids;
     };
     var ids = getIndefOfViewedComuni();

     // Load pictures of comuni
     user.images = [];
     if (user.pictures) {
      for (var i = 0; i < comuneViewedNum; i++) {
        if (typeof(user.pictures[i]) !== 'undefined' && user.pictures[ids[i]]) { // is set
          user.images[i] = 'data:image/jpeg;base64,' + user.pictures[ids[i]];
        } else {
          user.images[i] = 'images/default_diary_' + i + '.png';
        }
      }
    }
    
    /*****/


    // Set diary pictures
    /*user.images = [];
    if (user.pictures) {
      for (var idxStand = 1; idxStand <= 6; ++idxStand) {
        if (typeof(user.pictures[idxStand - 1]) !== 'undefined' && user.pictures[idxStand - 1]) { // is set
          user.images[idxStand - 1] = 'data:image/jpeg;base64,' + user.pictures[idxStand - 1];
        } else {
          user.images[idxStand - 1] = 'images/default_diary_' + idxStand + '.png';
        }
      }
    }*/

      return user;
    }

    var diaries = {
      currMax: -1,
      limit: Config.get('limit'),
      loading: false
    };

    return {
      get: function(userId, diaryCallback) {
        $http(
          {
            method: 'GET',
            url: Config.getURLDiary(),
            params : {
              id: userId
            }
          }
        )
        .success(function(data) {
          diaryCallback(fill(data));
        })
        .error(function() {
          diaryCallback(false);
        });
        return true;
      },
      getProfileClasses: function(user) {
        var currentClasses = '';
        if (typeof(user) !== 'undefined' && user) { // is set
          if (user.age) {
            switch(user.age) {
              case 'K':
                currentClasses += 'kid ';
                break;
              case 'T':
                currentClasses += 'teen ';
                break;
              case 'A':
                currentClasses += 'adult ';
                break;
            }
          }
          if (user.gender) {
            switch(user.gender) {
              case 'M':
                currentClasses += 'male ';
                break;
              case 'F':
                currentClasses += 'female ';
                break;
            }
          }
          currentClasses= currentClasses.replace(/^\s+|\s+$/g,''); // Trim left and right spaces
        }
        return currentClasses;
      },
      loadMoreDiaries: function(init, diariesCallback) {
        if (diaries.loading) {
          diariesCallback(false); // Already loading
        } else {
          if (init) {
            diaries.currMax = -1; // Restart from the max (e.g. refresh)
          }
          diaries.loading = true;
          $http(
            {
              method: 'GET',
              url: Config.getURLDiaries(),
              params : {
                cm: diaries.currMax,
                l: diaries.limit
              }
            }
          )
          .success(function(data) {
            diaries.loading = false;
            if ( (data) && (data.length > 0) && (typeof(data) === 'object') ) {
              for (var index = 0; index < data.length; ++index) {
                data[index] = fill(data[index]);
                if ( (data[index].id > 0) && ((data[index].id < diaries.currMax) ||(diaries.currMax === -1)) ) { diaries.currMax = data[index].id; }
              }
              diariesCallback(data);
            } else {
              diariesCallback(false);
            }
          })
          .error(function() {
            diaries.loading = false;
            diariesCallback(false);
          });
        }
        return true;
      }
    };
  });
