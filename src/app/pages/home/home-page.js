(function() {
	'use strict';

	angular.module('BolaoApp')

	.config(function($stateProvider) {
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'app/pages/home/home-page.html',
				controller: 'HomeController',
			});

	})

	.controller('HomeController', function($scope, $state, dataService) {

    // default login email
    $scope.email = 'pedro@rga.com';

    $scope.validateEmail = function () {

      dataService.validateEmail($scope.email).then(function (responseData) {
        console.log('responseData -> ', responseData);

        if (responseData.isValid) {
          console.log('Valid email -> ');
          $state.go('round-of-16');
        } else {
          console.log('Invalid email -> ');
        }

        if (responseData.matchesData) {
          dataService.storeUserData(responseData.matchesData);
        }

      });

      return false;

    };

	});

})();
