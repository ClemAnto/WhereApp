angular.module('starter.services', [])

/**
 * A localStorage wrapper service
 */
.factory('$localstorage', ['$window', function($window) {
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
  }
}])

/**
 * A config service
 */
.factory('Config', ['$localstorage', '$http', function($localstorage, $http) {

  var globals = {
    // onSite: false,
    // urlCheckStatus: 'http://10.11.38.39/api/checkStatus.php',
    urlPublishDiary: 'http://www.passatonelfuturo.it/api/publishDiary.php', //'http://10.11.38.39/api/publishDiary.php',
    linkShareDiary: 'http://www.passatonelfuturo.it',
    profileMandatory: false,
    profileShowed: false
  };

  var defaultConfig = {
    language: 'it', // Language choosen (it, en)
    profiled: false, // User profiled
    avatar: '', // User avatar
    picture: '', // Avatar picture data
    nickname: '', // User nickname
    gender: '', // User gender (M, F)
    comune: 1, // Stand to unlock,
    comuneViewedState: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false
    },
    comuneViewedNum: 0,
    focused: 0, // Stand focused when all unlocked
    date: '', // Diary date
    sent: false, // Diary already sent
    surveys: { // Surveys status
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false
    }
  };

  var config = $localstorage.getObject('config');
  if (config == null) {
    config = defaultConfig;
    $localstorage.setObject('config', config);
  } else {
    config.focused = undefined; // reset focused on start
  }

  return {
    all: function() {
      return config;
    },
    get: function(property) {
      return config.hasOwnProperty(property) ? config[property] : '';
    },
    set: function(property, value) {
      if (typeof(value) !== "undefined" && value) { // is set
        config[property] = value;
        $localstorage.setObject('config', config);

        return true;
      } else {
        return false;
      }
    },
    getProfileSuffix: function() {
      var currentSuffix = '';
      if (config.profiled) {
        currentSuffix = '_' + config.gender;
      }
      return currentSuffix;
    },
    getProfileClasses: function() {
      var currentClasses = '';
      if (config.profiled) {
        switch (config.gender) {
          case 'M':
            currentClasses += 'male ';
            break;
          case 'F':
            currentClasses += 'female';
            break;
        }
        currentClasses = currentClasses.replace(/^\s+|\s+$/g, ""); // Trim left and right spaces
      }
      return currentClasses;
    },
    // isOnSite: function() {
    //   $http(
    //     {
    //       method: 'GET',
    //       url: globals.urlCheckStatus
    //     }
    //   )
    //   .success(function(data, status, headers, config) {
    //     globals.onSite = (data == 'online');
    //   })
    //   .error(function(data, status, headers, config) {
    //     globals.onSite = false;
    //   });
    //   return globals.onSite;
    // },
    getURLPublishDiary: function() {
      return globals.urlPublishDiary;
    },
    getLinkShareDiary: function() {
      return globals.linkShareDiary;
    },
    isProfileMandatory: function() {
      return globals.profileMandatory;
    },
    isProfileShowed: function() {
      return globals.profileShowed;
    },
    setProfileShowed: function(showed) {
      globals.profileShowed = !!showed; // Cast to boolean
    }
  }
}])

/**
 * A comuni status service
 */
.factory('Comuni', ['$localstorage', function($localstorage) {

  // Stand pictures
  var pictures = $localstorage.getObject('pictures');
  if (pictures == null) {
    pictures = [];
    $localstorage.setObject('pictures', pictures);
  }

  // Comuni status
  var comuni = [{
    id: 1,
    name: 'comune1_name',
    desc: 'comune1_desc',
    image: 'comune1_img.png',
    content: 'comune1_content.html'
  }, {
    id: 2,
    name: 'comune2_name',
    desc: 'comune2_desc',
    image: 'comune2_img.png',
    content: 'comune2_content.html'
  }, {
    id: 3,
    name: 'comune3_name',
    desc: 'comune3_desc',
    image: 'comune3_img.png',
    content: 'comune3_content.html'
  }, {
    id: 4,
    name: 'comune4_name',
    desc: 'comune4_desc',
    image: 'comune4_img.png',
    content: 'comune4_content.html'
  }, {
    id: 5,
    name: 'comune5_name',
    desc: 'comune5_desc',
    image: 'comune5_img.png',
    content: 'comune5_content.html'
  }, {
    id: 6,
    name: 'comune6_name',
    desc: 'comune6_desc',
    image: 'comune6_img.png',
    content: 'comune6_content.html'
  }];

  return {
    all: function() {
      return comuni;
    },
    get: function(comuneId) {
      return comuni[comuneId - 1];
    },
    allPictures: function() {
      return pictures;
    },
    setPicture: function(comuneId, imgData) {
      if ((comuneId >= 1) && (comuneId <= 6)) {
        pictures[comuneId - 1] = imgData;
        $localstorage.setObject('pictures', pictures);
        return true;
      } else {
        return false;
      }
    },
    getPicture: function(comuneId) {
      if ((comuneId >= 1) && (comuneId <= 6)) {
        return pictures[comuneId - 1] || null;
      } else {
        return false;
      }
    },
    getSrcImg: function(comuneId) {
      if ((comuneId >= 1) && (comuneId <= 6)) {
        if (typeof(pictures[comuneId - 1]) !== "undefined" && pictures[comuneId - 1]) { // is set
          return "data:image/jpeg;base64," + pictures[comuneId - 1];
        } else {
          return 'img/default_diary_' + comuneId + '.png';
        }
      } else {
        return false;
      }
    }
  }
}])

/**
 * A default avatar service
 */
.factory('Avatars', function() {

  // Default avatars
  var avatars = [{
    id: 1,
    name: 'avatar_k_m'
  }, {
    id: 2,
    name: 'avatar_k_f'
  }, {
    id: 3,
    name: 'avatar_t_m'
  }, {
    id: 4,
    name: 'avatar_t_f'
  }, {
    id: 5,
    name: 'avatar_a_m'
  }, {
    id: 6,
    name: 'avatar_a_f'
  }];

  return {
    all: function() {
      return avatars;
    },
    count: function() {
      return avatars.length;
    },
    get: function(avatarId) {
      return avatars[avatarId - 1];
    }
  }
})

/**
 * A surveys service
 */
.factory('Surveys', ['$localstorage', function($localstorage) {

  // Surveys answers
  var answers = $localstorage.getObject('answers');
  if (answers == null) {
    answers = [];
    $localstorage.setObject('answers', answers);
  }

  // Surveys definition
  var surveys = [{
      id: 1,
      title: 'survey1_title',
      questions: [{
        type: 'radio',
        name: '1',
        question: 'survey1_question1_question',
        options: [{
          id: 0,
          name: 'survey1_question1_answer1'
        }, {
          id: 1,
          name: 'survey1_question1_answer2'
        }, {
          id: 2,
          name: 'survey1_question1_answer3'
        }]
      }, {
        type: 'radio',
        name: '2',
        question: 'survey1_question2_question',
        options: [{
          id: 0,
          name: 'survey1_question2_answer1'
        }, {
          id: 1,
          name: 'survey1_question2_answer2'
        }, {
          id: 2,
          name: 'survey1_question2_answer3'
        }]
      }],
      answers: {}
    },

    {
      id: 2,
      title: 'survey2_title',
      questions: [{
        type: 'radio',
        name: '1',
        question: 'survey2_question1_question',
        options: [{
          id: 0,
          name: 'survey2_question1_answer1'
        }, {
          id: 1,
          name: 'survey2_question1_answer2'
        }, {
          id: 2,
          name: 'survey2_question1_answer3'
        }]
      }, {
        type: 'radio',
        name: '2',
        question: 'survey2_question2_question',
        options: [{
          id: 0,
          name: 'survey2_question2_answer1'
        }, {
          id: 1,
          name: 'survey2_question2_answer2'
        }, {
          id: 2,
          name: 'survey2_question2_answer3'
        }]
      }],
      answers: {}
    },

    {
      id: 3,
      title: 'survey3_title',
      questions: [{
        type: 'radio',
        name: '1',
        question: 'survey3_question1_question',
        options: [{
          id: 0,
          name: 'survey3_question1_answer1'
        }, {
          id: 1,
          name: 'survey3_question1_answer2'
        }, {
          id: 2,
          name: 'survey3_question1_answer3'
        }]
      }, {
        type: 'radio',
        name: '2',
        question: 'survey3_question2_question',
        options: [{
          id: 0,
          name: 'survey3_question2_answer1'
        }, {
          id: 1,
          name: 'survey3_question2_answer2'
        }, {
          id: 2,
          name: 'survey3_question2_answer3'
        }]
      }],
      answers: {}
    },

    {
      id: 4,
      title: 'survey4_title',
      questions: [{
        type: 'radio',
        name: '1',
        question: 'survey4_question1_question',
        options: [{
          id: 0,
          name: 'survey4_question1_answer1'
        }, {
          id: 1,
          name: 'survey4_question1_answer2'
        }, {
          id: 2,
          name: 'survey4_question1_answer3'
        }]
      }, {
        type: 'radio',
        name: '2',
        question: 'survey4_question2_question',
        options: [{
          id: 0,
          name: 'survey4_question2_answer1'
        }, {
          id: 1,
          name: 'survey4_question2_answer2'
        }, {
          id: 2,
          name: 'survey4_question2_answer3'
        }]
      }],
      answers: {}
    },

    {
      id: 5,
      title: 'survey5_title',
      questions: [{
        type: 'radio',
        name: '1',
        question: 'survey5_question1_question',
        options: [{
          id: 0,
          name: 'survey5_question1_answer1'
        }, {
          id: 1,
          name: 'survey5_question1_answer2'
        }, {
          id: 2,
          name: 'survey5_question1_answer3'
        }]
      }, {
        type: 'radio',
        name: '2',
        question: 'survey5_question2_question',
        options: [{
          id: 0,
          name: 'survey5_question2_answer1'
        }, {
          id: 1,
          name: 'survey5_question2_answer2'
        }, {
          id: 2,
          name: 'survey5_question2_answer3'
        }]
      }],
      answers: {}
    },

    {
      id: 6,
      title: 'survey1_title',
      questions: [{
        type: 'radio',
        name: '1',
        question: 'survey6_question1_question',
        options: [{
          id: 0,
          name: 'survey6_question1_answer1'
        }, {
          id: 1,
          name: 'survey6_question1_answer2'
        }, {
          id: 2,
          name: 'survey6_question1_answer3'
        }]
      }, {
        type: 'radio',
        name: '2',
        question: 'survey6_question2_question',
        options: [{
          id: 0,
          name: 'survey6_question2_answer1'
        }, {
          id: 1,
          name: 'survey6_question2_answer2'
        }, {
          id: 2,
          name: 'survey6_question2_answer3'
        }]
      }],
      answers: {}
    }

  ];

  return {
    all: function() {
      return surveys;
    },
    get: function(surveyId) {
      return surveys[surveyId - 1];
    },
    allAnswers: function() {
      return answers;
    },
    getAnswers: function(surveyId) {
      defaultAnswers = (typeof(surveys[surveyId - 1].answers) !== "undefined") ? surveys[surveyId - 1].answers : {};
      return (typeof(answers[surveyId - 1]) !== "undefined") ? answers[surveyId - 1] : defaultAnswers;
    },
    setAnswers: function(surveyId, surveyAnswers) {
      answers[surveyId - 1] = surveyAnswers;
      $localstorage.setObject('answers', answers);
      return true;
    }
  }
}])

/**
 * A diary service
 */
.factory('Diary', ['$http', '$translate', 'Config', 'Comuni', 'Surveys', function($http, $translate, Config, Comuni, Surveys) {

  // Diary sentences
  var sentences = [{
      '1': [
        'diary_survey1_question_1_answer1',
        'diary_survey1_question_1_answer2',
        'diary_survey1_question_1_answer3'
      ],
      '2': [
        'diary_survey1_question_2_answer1',
        'diary_survey1_question_2_answer2',
        'diary_survey1_question_2_answer3'
      ]
    },

    {
      '1': [
        'diary_survey2_question_1_answer1',
        'diary_survey2_question_1_answer2',
        'diary_survey2_question_1_answer3'
      ],
      '2': [
        'diary_survey2_question_2_answer1',
        'diary_survey2_question_2_answer2',
        'diary_survey2_question_2_answer3'
      ]
    },

    {
      '1': [
        'diary_survey3_question_1_answer1',
        'diary_survey3_question_1_answer2',
        'diary_survey3_question_1_answer3'
      ],
      '2': [
        'diary_survey3_question_2_answer1',
        'diary_survey3_question_2_answer2',
        'diary_survey3_question_2_answer3'
      ]
    },

    {
      '1': [
        'diary_survey4_question_1_answer1',
        'diary_survey4_question_1_answer2',
        'diary_survey4_question_1_answer3'
      ],
      '2': [
        'diary_survey4_question_2_answer1',
        'diary_survey4_question_2_answer2',
        'diary_survey4_question_2_answer3'
      ]
    },

    {
      '1': [
        'diary_survey5_question_1_answer1',
        'diary_survey5_question_1_answer2',
        'diary_survey5_question_1_answer3'
      ],
      '2': [
        'diary_survey5_question_2_answer1',
        'diary_survey5_question_2_answer2',
        'diary_survey5_question_2_answer3'
      ]
    },

    {
      '1': [
        'diary_survey6_question_1_answer1',
        'diary_survey6_question_1_answer2',
        'diary_survey6_question_1_answer3'
      ],
      '2': [
        'diary_survey6_question_2_answer1',
        'diary_survey6_question_2_answer2',
        'diary_survey6_question_2_answer3'
      ]
    }
  ];

  return {
    get: function(answers) {
      var diary = [];
      for (var idxSurvey = 0; idxSurvey < answers.length; ++idxSurvey) {
        for (var idxQuestion in answers[idxSurvey]) {
          if (answers[idxSurvey].hasOwnProperty(idxQuestion)) {
            var idxAnswer = answers[idxSurvey][idxQuestion];
            diary.push(sentences[idxSurvey][idxQuestion][idxAnswer]);
          }
        }
      }
      return diary;
    },
    getDate: function() {
      var date = Config.get('date');
      if (!date) {
        date = new Date().toISOString().split("T")[0]; // YYYY-MM-DDTHH:mm:ss.sssZ
        Config.set('date', date);
      }
      return date;
    },
    publishDiary: function(publishCallback) {
      $http({
          method: 'POST',
          url: Config.getURLPublishDiary(),
          data: {
            config: Config.all(),
            pictures: Comuni.allPictures(),
            answers: Surveys.allAnswers()
          }
        })
        .success(function(data, status, headers, config) {
          if (data == 'ok') {
            Config.set('sent', true);
            publishCallback(true);
          } else {
            publishCallback(false);
          }
        })
        .error(function(data, status, headers, config) {
          publishCallback(false);
        });
      return true;
    },
    shareDiary: function(shareCallback) {
      $translate(['SHARE_MESSAGE', 'SHARE_SUBJECT']).then(function(translations) {
        var message = translations.SHARE_MESSAGE;
        var subject = translations.SHARE_SUBJECT;

        // Set avatar image
        /*if (Config.get('avatar') == 'picture') {
          var avatarImg = "data:image/jpeg;base64," + Config.get('picture');
        } else {
          var avatarImg = 'www/img/avatars/' + (Config.get('avatar') || 'avatar_placeholder') + '.png';
        }*/
        var avatarImg = 'www/img/banner_' + Config.get('language') + '.png';

        var link = Config.getLinkShareDiary();

        window.plugins.socialsharing.share(message, subject, avatarImg, link);
        //window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint(message, avatarImg, link, subject, function(){alert('share ok')}, function(errormsg){alert(errormsg)});
        return true;
      });
    }
  }
}]);