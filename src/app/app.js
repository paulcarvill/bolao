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

	.controller('MainController', function() {
    // main controller
	})

	.run(function () {
		FastClick.attach(document.body);
	});

})();
