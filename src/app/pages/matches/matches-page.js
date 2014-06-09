(function() {
  'use strict';

  angular.module('BolaoApp')

  .config(function($stateProvider) {
    $stateProvider
      .state('matches', {
        url: '/matches/:email',
        templateUrl: 'app/pages/matches/matches-page.html',
        controller: 'MatchesController'
      });
  })

  .controller('MatchesController', function($scope, $state, dataService) {

    // This will store the raw data from google spreadsheet
    // and is not exposed to the view
    var _MASTERDATA = [];

    // Public variables
    // exposed to the view
    $scope.matches = [];
    $scope.points = 0;
    $scope.dataSubmitted = false;

    // Function to create some aliases based
    // on the JSON received from Google spreadsheet
    function createMatchObject (data, resetScores) {
      var match = {};
      match.date = data.gsx$date.$t;
      match.time = data.gsx$time.$t;
      match.city = data.gsx$city.$t;
      match.stadium = data.gsx$stadium.$t;
      match.homeTeam = data.gsx$hometeam.$t;
      match.homeScore = resetScores ? 0 : data.gsx$homescore.$t;
      match.awayTeam = data.gsx$awayteam.$t;
      match.awayScore = resetScores ? 0 : data.gsx$awayscore.$t;
      match.group = data.gsx$group.$t;

      return match;
    }

    function calculatePoints () {
      for (var i = 0; i < _MASTERDATA.length; i++) {

        var currentMasterMatch = _MASTERDATA[i];
        var currentUserMatch = $scope.matches[i];

        // ensure the values are typeof number
        var masterHomeScore = Number(currentMasterMatch.homeScore);
        var masterAwayScore = Number(currentMasterMatch.awayScore);
        var userHomeScore = Number(currentUserMatch.homeScore);
        var userAwayScore = Number(currentUserMatch.awayScore);

        // create new properties on the match object
        // so we can access it from the view
        currentUserMatch.actualHomeScore = masterHomeScore;
        currentUserMatch.actualAwayScore = masterAwayScore;

        // default
        currentUserMatch.prediction = 'wrong';

        // if this is an exact match
        if ((masterHomeScore === userHomeScore) && (masterAwayScore === userAwayScore) ) {
          $scope.points += 3;
          currentUserMatch.prediction = 'exact';

        }

        // if this is the correct winner
        if ((masterHomeScore > currentMasterMatch.awayScore) && (masterAwayScore > userAwayScore)) {
          $scope.points += 1;
          currentUserMatch.prediction = 'correct';
        }
      }
    }

    function getMatchesData () {
      // Get data from google spreadsheet
      dataService.getData().then(function(data) {

        var matchesData = data.data.feed.entry;

        // loop through all matches from the dirty JSON
        // from google spreadsheet, and create a nice
        // object containing all the data we need
        // _MASTERDATA is the master data from google spreadsheet
        // $scope.matches - is the object bound with the view
        for (var i = 0; i < matchesData.length; i++) {
          _MASTERDATA.push(createMatchObject(matchesData[i]));

          // only push to $scope.matches if we dont have any
          // user data already stored in dfgdataService
          if (!dataService.getUserData()) {
            $scope.matches.push(createMatchObject(matchesData[i], true));
          }
        }


        // Check if the user has already submitted
        // their matches scores
        if (dataService.getUserData()) {
          // If we have data already stored it means that the
          // user has already submitted their scores
          // in this case, we set $scope.matches to be the users data
          // as this is what is bound with our views
          $scope.matches = dataService.getUserData();
          $scope.dataSubmitted = true;
          calculatePoints();
        }
      });
    }

    // Public method, available from the view
    $scope.save = function () {
      dataService.postData($scope.matches).then(function(responseData) {
        $scope.dataSubmitted = true;
        angular.extend($scope.matches, responseData);
        // calculatePoints();
      });
      return false;
    };

    // Check if we have email parameter
    // if true, we need to decide when to get data
    // if false, we redirect the users to login page
    if ($state.params.email) {

      // if the user is already verified we don't need to validate
      // so we just go and get the matches data
      // if not, we redirect the users to login page
      if (dataService.isUserVerified()) {
        getMatchesData();
      } else {
        dataService.validateEmail($state.params.email).then(function (responseData) {
          if (responseData.isValid) {
            if (responseData.matchesData) {
              dataService.storeUserData(responseData.matchesData);
            }
            getMatchesData();
          } else {
            $state.go('login');
          }
        });
      }
    } else {
      $state.go('login');
    }

  });

})();
