(function() {
  'use strict';

  angular.module('BolaoApp')

  .config(function($stateProvider) {
    $stateProvider
      .state('round-of-16', {
        url: '/round-of-16',
        templateUrl: 'app/pages/round-of-16/round-of-16-page.html',
        controller: 'Round16Controller'
      });
  })

  .controller('Round16Controller', function($scope, dataService) {

    // Global matches object
    var _MASTERDATA;
    $scope.matches = [];

    // Function to create some aliases based
    // on the JSON received from Google spreadsheet
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

    /*function calculatePoints () {
      console.log('Calculating points... userData -> ', $scope.matches);
    }*/

    // Get data from google spreadsheet
    dataService.getData().then(function(data) {

      var matchesData = data.data.feed.entry;

      // loop through all matches from the dirty JSON
      // from google spreadsheet, and create a nice
      // object containing all the data we need
      for (var i = 0; i < matchesData.length; i++) {
        $scope.matches.push(createMatchObject(matchesData[i]));
      }

      _MASTERDATA = $scope.matches;

      // Check if the user has already submitted
      // their matches scores
      if (dataService.getUserData()) {
        $scope.dataSubmitted = true;
        angular.extend($scope.matches, dataService.getUserData());
        // calculatePoints(dataService.getUserData());
      }
    });

    $scope.save = function () {
      dataService.postData($scope.matches).then(function(responseData) {
        $scope.dataSubmitted = true;
        // calculatePoints();
        angular.extend($scope.matches, responseData);
        return false;
      });
      return false;
    };

  });

})();
