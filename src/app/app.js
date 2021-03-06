(function() {
	'use strict';

	angular.module('BolaoApp', [
		'ui.router'
	])

	.config(function($urlRouterProvider, $httpProvider) {

		// For any unmatched url, send to...
		$urlRouterProvider.otherwise('/');

		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	})

	.controller('MainController', function($rootScope, dataService) {

    function checkWorldCupStatus () {
      // var worldCupStartDate = 1402325737 * 1000; // OLD DATE!!! FOR TESTING
      var worldCupStartDate = 1402606800 * 1000; // 12th June 2014 21:00:00
      var todayDate = new Date().getTime();
      $rootScope.worldCupStarted = todayDate > worldCupStartDate ? true : false;
    }

    checkWorldCupStatus();

    // Subscribe to state change start
    // this will be fired every time user changes state
    // available params: event, toState, toParams, fromState, fromParams
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

      // if we have user data stored and user navigates to login
      // we need to reset it. Very edgy case...
      if (dataService.getUserData && toState.name === 'login') {
        dataService.resetUserData();
      }

      // if the email parameter gets changes directly from the url
      // we need to make sure we reset everything so we can then
      // re validate their email and get the correct user data
      if (fromParams.email && (fromParams.email !== toParams.email)) {
        dataService.resetUserData();
        dataService.resetUserVerification();
      }

    });

	})

	.run(function () {
		FastClick.attach(document.body);
	});

})();
