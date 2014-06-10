(function() {
	'use strict';

	angular.module('BolaoApp')

	.directive('match', function () {

		return {
			scope: {
				matchData: '=matchData',
        worldCupStarted: '=disabled'
			},

      templateUrl: 'app/directives/match/match-template.html'
		};

	});

})();
