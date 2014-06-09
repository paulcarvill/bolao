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
        responseData = responseData.data;

        dataService.verifyUser();
        $state.go('matches', {email: $scope.email});

        // assume that if it's an object the user has already submitted data
        if (typeof responseData === 'object') {
          dataService.storeUserData(responseData);
        }
        $scope.invalidEmail = false;
      }, function() {
        $scope.invalidEmail = true;
        console.log('error -> ');
      });

      return false;
    };

	});

})();
