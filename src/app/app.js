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

	.controller('MainController', function($scope, dataService) {

    // Global matches object
    $scope.matches = [];

    function createMatchObject (data) {
      var match = {};
      match.date = data.gsx$date.$t;
      match.time = data.gsx$time.$t;
      match.city = data.gsx$city.$t;
      match.stadium = data.gsx$stadium.$t;
      match.homeTeam = data.gsx$hometeam.$t;
      match.homeScore = data.gsx$homescore.$t;
      match.awayTeam = data.gsx$awayteam.$t;
      match.awayScore = data.gsx$awayscore.$t;
      match.group = data.gsx$group.$t;

      return match;
    }

    dataService.getData().then(function(data) {
      var matchesData = data.data.feed.entry;

      // loop through all matches from the dirty JSON
      // from google spreadsheet, and create a nice
      // object containing all the data we need
      for (var i = 0; i < matchesData.length; i++) {
        $scope.matches.push(createMatchObject(matchesData[i]));
      }

      console.log('$scope.matches -> ', $scope.matches);
    });

    $scope.save = function () {
      for (var i = 0; i < $scope.matches.length; i++) {
        console.log($scope.matches[i].homeScore + ' ' + $scope.matches[i].awayScore);
      }

      dataService.postData($scope.matches);
    };

	})

	.run(function () {
		FastClick.attach(document.body);
	});

})();
