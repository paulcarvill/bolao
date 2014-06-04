(function() {
	'use strict';

	angular.module('BolaoApp')

	.config(function($stateProvider) {
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'app/pages/home/home-page.html',
				controller: 'HomeController',
				abstract: true,
				resolve: {
					'ageVerified': ['setupService', function (setupService) {
						return setupService.isAgeVerified();
					}]
				}
			});

	})

	.controller('HomeController', function() {



	});

})();
