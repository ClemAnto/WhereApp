angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope, $rootScope, $state, $ionicPopup) {
	$scope.showCredits = function() {
		$state.go('credits');
	};

	$scope.openProfile = function() {
		$rootScope.$broadcast('open.profile');
	};

	$rootScope.showAlert = function(title, message) {
		var alertPopup = $ionicPopup.alert({
			title: title,
			template: message
		});
		alertPopup.then(function(res) {});
	};
})

.controller('LanguageCtrl', function($scope, $state, $translate, Config) {
	$scope.changeLanguage = function(key) {
		$translate.use(key);
		Config.set('language', key);
		$state.go('dashboard');
	};
})

.controller('DashboardCtrl', function($scope, $rootScope, $state, $translate, $ionicModal, Config, Comuni, Avatars) {

	// Initialize dashboard
	$scope.mapCollapsed = false;
	$scope.enableEditPictures = false;

	$scope.togglePictures = function() {
		$scope.mapCollapsed = false;
		$scope.enableEditPictures = !$scope.enableEditPictures;
	}

	$scope.toggleMap = function() {
		$scope.mapCollapsed = $scope.enableEditPictures ? false : !$scope.mapCollapsed;
	}

	// Load comuni data
	function loadComuneData() {
		// $scope.comune = Config.get('comune');
		$scope.comuneViewedState = Config.get('comuneViewedState');
		$scope.comuneViewedNum = Config.get('comuneViewedNum');
		$scope.comuneFocused = Config.get('focused');
		$scope.comuneSelected = $scope.comuneFocused;
		$scope.comuneInfo = Comuni.get($scope.comuneFocused);
		// $scope.comuneProgress = Math.round( (($scope.comune - 1) / 6) * 100 );
		$scope.comuneProgress = Math.round(($scope.comuneViewedNum / 6) * 100);
	};
	loadComuneData();

	// Load avatars data
	$scope.avatars = Avatars.all();

	// Load comune pictures
	$scope.images = [];
	for (idxComune = 1; idxComune <= 6; ++idxComune) {
		$scope.images[idxComune - 1] = Comuni.getSrcImg(idxComune);
	}

	// Set the modal profile
	$ionicModal.fromTemplateUrl('templates/profile.html', {
		scope: $scope,
		focusFirstInput: false,
		backdropClickToClose: !Config.isProfileMandatory(),
		hardwareBackButtonClose: !Config.isProfileMandatory()
	}).then(function(modal) {
		$scope.profileModal = modal;
		// Force user profile if none (e.g. on first access)
		var open = ((!$scope.user.profiled) && (Config.isProfileMandatory())) || (!Config.isProfileShowed());
		if (open) {
			$scope.openProfileModal();
		}
	});
	$scope.openProfileModal = function() {
		Config.setProfileShowed(true);
		$scope.profileModal.show();
	};
	$scope.closeProfileModal = function() {
		$scope.profileModal.hide();
	};
	// Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.profileModal.remove();
	});
	// Execute action on show modal
	$scope.$on('modal.shown', function(modal) {
		// Execute action
	});
	// Execute action on hide modal
	$scope.$on('modal.hidden', function(modal) {
		// Execute action
	});
	// Open profile on broadcast
	$scope.$on('open.profile', function() {
		$scope.openProfileModal();
	});

	// Set the modal avatar
	$ionicModal.fromTemplateUrl('templates/avatar.html', {
		scope: $scope,
		focusFirstInput: false,
		backdropClickToClose: true,
		hardwareBackButtonClose: true
	}).then(function(modal) {
		$scope.avatarModal = modal;
	});
	$scope.openAvatarModal = function() {
		$scope.avatarModal.show();
	};
	$scope.closeAvatarModal = function() {
		$scope.avatarModal.hide();
	};
	// Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.avatarModal.remove();
	});
	// Execute action on show modal
	$scope.$on('modal.shown', function(modal) {
		// Execute action
	});
	// Execute action on hide modal
	$scope.$on('modal.hidden', function(modal) {
		// Execute action
	});
	// Open avatar on broadcast
	$scope.$on('open.avatar', function() {
		$scope.openAvatarModal();
	});
	// Open avatar on select
	$scope.selectAvatar = function() {
		$scope.openAvatarModal();
	};

	// Set the modal terms
	$ionicModal.fromTemplateUrl('templates/terms.html', {
		scope: $scope,
		focusFirstInput: false,
		backdropClickToClose: true,
		hardwareBackButtonClose: true
	}).then(function(modal) {
		$scope.termsModal = modal;
	});
	$scope.openTermsModal = function() {
		$scope.terms = 'content/' + Config.get('language') + '/terms.html';
		$scope.termsModal.show();
	};
	$scope.closeTermsModal = function() {
		$scope.termsModal.hide();
	};
	// Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.termsModal.remove();
	});
	// Execute action on show modal
	$scope.$on('modal.shown', function(modal) {
		// Execute action
	});
	// Execute action on hide modal
	$scope.$on('modal.hidden', function(modal) {
		// Execute action
	});
	// Open profile on broadcast
	$scope.$on('open.terms', function() {
		$scope.openTermsModal();
	});
	// Open avatar on select
	$scope.viewTerms = function() {
		$scope.openTermsModal();
	};

	// Load user profile data
	$scope.loadUserProfile = function() {
		$scope.user = {
			profiled: Config.get('profiled'),
			avatar: Config.get('avatar'),
			picture: Config.get('picture'),
			nickname: Config.get('nickname'),
			// age: Config.get('age'),
			gender: Config.get('gender')
		};
		// Set avatar image
		if ($scope.user.avatar == 'picture') {
			$scope.avatarImg = "data:image/jpeg;base64," + $scope.user.picture;
		} else {
			$scope.avatarImg = 'img/avatars/' + ($scope.user.avatar || 'avatar_placeholder') + '.png';
		}
		// Set if profile is mandatory
		$scope.profileMandatory = Config.isProfileMandatory();
		// Set terms checkbox
		$scope.termsCheckbox = {
			checked: true
		};
	};

	// Save user profile data
	$scope.updateProfile = function(valid) {
		if (valid) {
			$scope.user.profiled = true; // Profile filled
			// Save the profile
			Config.set('profiled', $scope.user.profiled);
			Config.set('avatar', $scope.user.avatar);
			Config.set('picture', $scope.user.picture);
			Config.set('nickname', $scope.user.nickname);
			Config.set('age', $scope.user.age);
			Config.set('gender', $scope.user.gender);
			// Close the modal window
			$scope.closeProfileModal();
			return true;
		} else {
			if ($scope.profileMandatory) {
				return false;
			} else {
				Config.set('avatar', $scope.user.avatar);
				Config.set('picture', $scope.user.picture);
				// Close the modal window
				$scope.closeProfileModal();
				return true;
			}
		}
	};

	// Cancel changes to user profile data
	$scope.cancelProfile = function() {
		$scope.loadUserProfile();
		$scope.closeProfileModal();
	}

	// Load page content for a comune
	$scope.contentShow = function(pageId) {
		// First time survey alert
		// if ( (pageId == 1) && ($scope.comune == 1) ) {
		// 	$translate(['SURVEY_FIRST_TIME_TITLE', 'SURVEY_FIRST_TIME_MESSAGE']).then(function (translations) {
		// 		$rootScope.showAlert(translations.SURVEY_FIRST_TIME_TITLE, translations.SURVEY_FIRST_TIME_MESSAGE);
		// 	});
		// }

		// set comune as viewed and increment comune counter for progress bar
		var comuneViewedState = Config.get('comuneViewedState');
		if (comuneViewedState[pageId] == false) {
			comuneViewedState[pageId] = true;

			// comune viewed count increment
			var comuneViewedNum = Config.get('comuneViewedNum');
			Config.set('comuneViewedNum', comuneViewedNum + 1);
		}


		// Change focused
		$scope.comuneFocused = pageId;
		Config.set('focused', $scope.comuneFocused);
		// Open if unlocked
		/*if (pageId <= $scope.comune)*/
		$state.go('content', {
			page: pageId
		});
	};

	// Refresh map
	$scope.$on('refresh.map', function() {
		// Re-Load comuni data (due to cache)
		loadComuneData();
	});

	// Save selected avatar
	$scope.updateAvatar = function(selected) {
		// Save the avatar
		$scope.user.avatar = selected;
		// Set avatar image
		$scope.avatarImg = 'img/avatars/' + ($scope.user.avatar || 'avatar_placeholder') + '.png';
		// Close the modal window
		$scope.closeAvatarModal();
	};

	// Cancel avatar selection
	$scope.cancelAvatar = function() {
		$scope.closeAvatarModal();
	}

	// Manage camera cleanup
	$scope.onCleanupSuccess = function() {};
	$scope.onCleanupError = function() {};

	// Manage pictures for avatar
	$scope.onPhotoAvatarSuccess = function(imageData) {
		// Save the avatar
		$scope.user.picture = imageData;
		$scope.user.avatar = 'picture';
		// Set avatar image
		$scope.$apply(function() {
			$scope.avatarImg = "data:image/jpeg;base64," + $scope.user.picture;
		});
		navigator.camera.cleanup($scope.onCleanupSuccess, $scope.onCleanupError);
	};
	$scope.onPhotoAvatarFail = function(message) {
		navigator.camera.cleanup($scope.onCleanupSuccess, $scope.onCleanupError);
	};
	$scope.takePictureAvatar = function() {
		navigator.camera.getPicture($scope.onPhotoAvatarSuccess, $scope.onPhotoAvatarFail, {
			quality: 50,
			destinationType: navigator.camera.DestinationType.DATA_URL,
			sourceType: navigator.camera.PictureSourceType.CAMERA,
			targetWidth: 128,
			targetHeight: 128,
			saveToPhotoAlbum: false,
			correctOrientation: true
		});
	};

	// Manage pictures for comuni
	$scope.onPhotoComuneSuccess = function(imageData) {
		// Save the picture
		Comuni.setPicture($scope.comuneSelected, imageData);
		$scope.images[$scope.comuneSelected - 1] = Comuni.getSrcImg($scope.comuneSelected);
		// Set comune image
		$scope.$apply(function() {
			$scope.images[$scope.comuneSelected - 1] = Comuni.getSrcImg($scope.comuneSelected);
		});
		navigator.camera.cleanup($scope.onCleanupSuccess, $scope.onCleanupError);
	};
	$scope.onPhotoComuneFail = function(message) {
		navigator.camera.cleanup($scope.onCleanupSuccess, $scope.onCleanupError);
	};
	$scope.takePictureComune = function(selected, event) {
		event.stopPropagation();
		$scope.comuneSelected = selected;
		navigator.camera.getPicture($scope.onPhotoComuneSuccess, $scope.onPhotoComuneFail, {
			quality: 50,
			destinationType: navigator.camera.DestinationType.DATA_URL,
			sourceType: navigator.camera.PictureSourceType.CAMERA,
			targetWidth: 512,
			targetHeight: 512,
			saveToPhotoAlbum: false,
			correctOrientation: true
		});
	};

	// Open diary
	$scope.openDiary = function() {
		$state.go('diary');
	};

	$scope.loadUserProfile();
})

.controller('ContentCtrl', function($scope, $rootScope, $state, $stateParams, $translate, $ionicModal, Config, Comuni, Surveys) {
	// Load comuni data
	$scope.comuneInfo = Comuni.get($stateParams.page);
	$scope.content = 'content/' + Config.get('language') + '/' + $scope.comuneInfo.content;

	// Load surveys data
	$scope.surveys = Config.get('surveys');
	$scope.surveyInfo = Surveys.get($stateParams.page);
	$scope.surveyProfileSuffix = Config.getProfileSuffix();

	//$scope.surveyData = $scope.surveyInfo.answers;
	$scope.surveyData = Surveys.getAnswers($stateParams.page);

	// Set the modal survey
	$ionicModal.fromTemplateUrl('templates/survey.html', {
		scope: $scope,
		focusFirstInput: false,
		backdropClickToClose: false,
		hardwareBackButtonClose: false
	}).then(function(modal) {
		$scope.surveyModal = modal;
		// Force survey if not answered yet (e.g. on first comune access)
		if (!$scope.surveys[$stateParams.page]) $scope.openSurveyModal($stateParams.page);
	});
	$scope.openSurveyModal = function(surveyId) {
		$scope.surveyModal.show();
	};
	$scope.closeSurveyModal = function() {
		$scope.surveyModal.hide();
	};
	// Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.surveyModal.remove();
	});
	// Execute action on show modal
	$scope.$on('modal.shown', function(modal) {
		// Execute action
	});
	// Execute action on hide modal
	$scope.$on('modal.hidden', function(modal) {
		// Execute action
	});

	// Save survey data
	$scope.saveSurvey = function() {
		// Save survey data
		$scope.surveys[$stateParams.page] = true;
		Surveys.setAnswers($stateParams.page, $scope.surveyData);

		// Close the modal window
		$scope.closeSurveyModal();
	};

	$scope.$on('$ionicView.beforeLeave', function() {
		$rootScope.$broadcast('refresh.map');
	});
})

.controller('DiaryCtrl', function($scope, $rootScope, $state, $translate, Config, Surveys, Comuni, Diary) {
	// Get diary date
	$scope.diaryDate = Diary.getDate();

	// Get num of viewed comuni
	var comuneViewedNum = Config.get('comuneViewedNum');

	// Set avatar image
	$scope.avatar = Config.get('avatar');
	$scope.picture = Config.get('picture');
	if ($scope.avatar == 'picture') {
		$scope.avatarImg = "data:image/jpeg;base64," + $scope.picture;
	} else {
		$scope.avatarImg = 'img/avatars/' + ($scope.avatar || 'avatar_placeholder') + '.png';
	}

	// Load user info
	$scope.profiled = Config.get('profiled');
	$scope.nickname = Config.get('nickname');
	$scope.profileClasses = Config.getProfileClasses();

	var getIndefOfViewedComuni = function(){
		var comuneViewedState = Config.get('comuneViewedState'),
			ids = [];
		for (key in comuneViewedState) {
			if (comuneViewedState.hasOwnProperty(key) && comuneViewedState[key] === true) {
    			ids.push(key);
  			}
		}
		return ids;
	};
	var ids = getIndefOfViewedComuni();

	// Load pictures of comuni
	$scope.images = [];
	for (var i = 0; i < comuneViewedNum; i++) {
		$scope.images[i] = Comuni.getSrcImg(ids[i]);
	}

	// Load comune pictures
	// $scope.images = [];
	// for (idxComune = 1; idxComune <= 6; ++idxComune) {
	// 	$scope.images[idxComune - 1] = Comuni.getSrcImg(idxComune);
	// }

	// Load comuni data
	// $scope.comune = Config.get('comune');
	// $scope.comuneProgress = Math.round( (($scope.comune - 1) / 6) * 100 );
	$scope.comuneViewedNum = Config.get('comuneViewedNum');
	$scope.comuneProgress = Math.round(($scope.comuneViewedNum / 6) * 100);

	$scope.alreadySent = Config.get('sent');
	$scope.sendLocked = $scope.alreadySent;

	// Load diary data
	$scope.getDiary = function() {
		return Diary.get(Surveys.allAnswers());
	};

	$scope.publishDiaryCallback = function(status) {
		$translate(['DIARY_POPUP', 'DIARY_PUBLISH_SUCCESS', 'DIARY_PUBLISH_ERROR']).then(function(translations) {
			if (status) {
				$rootScope.showAlert(translations.DIARY_POPUP, translations.DIARY_PUBLISH_SUCCESS);
			} else {
				$rootScope.showAlert(translations.DIARY_POPUP, translations.DIARY_PUBLISH_ERROR);
			}
		});
		$scope.alreadySent = Config.get('sent');
		$scope.sendLocked = $scope.alreadySent;
	};

	$scope.publishDiary = function() {
		if (Config.get('nickname') === undefined || Config.get('nickname') == '') {
			$translate(['DIARY_POPUP_WARNING', 'DIARY_PUBLISH_ERROR_NONICKNAME']).then(function(translations) {$rootScope.showAlert(translations.DIARY_POPUP_WARNING, translations.DIARY_PUBLISH_ERROR_NONICKNAME);});
		} else {
			Diary.publishDiary($scope.publishDiaryCallback);
		}
	};

	$scope.shareDiaryCallback = function(status) {};

	$scope.shareDiary = function() {
		Diary.shareDiary($scope.shareDiaryCallback);
	};

	$scope.diary = $scope.getDiary();
})

.controller('CreditsCtrl', function($scope, $state, $translate, Config) {
	$scope.credits = 'content/' + Config.get('language') + '/credits.html';
});