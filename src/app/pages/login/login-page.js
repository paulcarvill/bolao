(function() {
	'use strict';

	angular.module('BolaoApp')

	.config(function($stateProvider) {
		$stateProvider
			.state('login', {
				url: '/',
				templateUrl: 'app/pages/login/login-page.html',
				controller: 'LoginController',
			});

	})

	.controller('LoginController', function($scope, $state, dataService) {

    $scope.invalidEmail = false;

    // default login email for testing
    // TO BE REMOVED!
    // $scope.email = 'pedro@rga.com';

    $scope.validateEmail = function () {
      dataService.validateEmail($scope.email).then(function (responseData) {
        console.log('responseData -> ', responseData);

        if (responseData.isValid) {
          dataService.verifyUser();
          $state.go('matches', {email: $scope.email});
        } else {
          $scope.invalidEmail = true;
        }

        if (responseData.matchesData) {
          dataService.storeUserData(responseData.matchesData);
        }
      });

      return false;
    };

	});

})();
