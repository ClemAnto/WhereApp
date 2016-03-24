'use strict';

/**
 * @ngdoc service
 * @name orizzonteMareApp.Diaries
 * @description
 * # Diaries
 * Factory in the orizzonteMareApp.
 */
angular.module('orizzonteMareApp')
  .factory('Diary', function ($http, Config) {
    // Diary sentences
    var sentences = [
      { '1': [
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

      { '1': [
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

      { '1': [
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

      { '1': [
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

      { '1': [
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

      { '1': [
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
          date = new Date().toISOString().split('T')[0]; // YYYY-MM-DDTHH:mm:ss.sssZ
          Config.set('date', date);
        }
        return date;
      }
    };
  });
