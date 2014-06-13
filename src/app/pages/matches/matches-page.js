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

  .controller('MatchesController', function($rootScope, $scope, $state, dataService) {

    // This will store the raw data from google spreadsheet
    // and is not exposed to the view
    var _MASTERDATA = [];

    // Public variables
    // exposed to the view
    $scope.matches = [];
    $scope.points = 0;
    $scope.dataSubmitted = false;
    $scope.fetchingData = true;
    $scope.sendingData = false;

    // Function to create some aliases based
    // on the JSON received from Google spreadsheet
    function createMatchObject (data, resetScores) {
      var match = {};
      match.date = data.gsx$date.$t;
      match.time = data.gsx$time.$t;
      match.city = data.gsx$city.$t;
      match.stadium = data.gsx$stadium.$t;
      match.homeTeam = data.gsx$hometeam.$t;
      match.homeTeamClass = match.homeTeam.toLowerCase().replace(/ /g, '-');
      match.homeScore = resetScores ? '-' : data.gsx$homescore.$t;
      match.awayTeam = data.gsx$awayteam.$t;
      match.awayTeamClass = match.awayTeam.toLowerCase().replace(/ /g, '-');
      match.awayScore = resetScores ? '-' : data.gsx$awayscore.$t;
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

        // if the game hasnt been updated in the spreadsheet
        // it will return NaN
        // so here we are basically checking whether the game has
        // been played or not and if it us, we stop the execution
        if (isNaN(masterHomeScore) || isNaN(masterAwayScore)) {
          return;
        }

        // create new properties on the match object
        // so we can access it from the view
        currentUserMatch.actualHomeScore = masterHomeScore;
        currentUserMatch.actualAwayScore = masterAwayScore;

        // default
        currentUserMatch.status = 'wrong';

        // if this is an exact match
        if ((masterHomeScore === userHomeScore) && (masterAwayScore === userAwayScore) ) {
          $scope.points += 3;
          currentUserMatch.status = 'exact';

        }
        // if this is the correct winner
        else if ((userHomeScore > userAwayScore) && (masterHomeScore > masterAwayScore)) {
          $scope.points += 1;
          currentUserMatch.status = 'correct';
        }
      }
    }

    function setPredictions () {
      dataService.getPredictions().then(function (data) {
        data = data.data;
        for (var i = 0; i < $scope.matches.length; i++) {
          $scope.matches[i].prediction = data[i];
        }
      });
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
          // user data already stored in dataService
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

          // Check whether the worldcup has already started
          if ($rootScope.worldCupStarted) {
            calculatePoints();
          }
        }

        // Method to get predictions from backend
        setPredictions();

        // stop the loader...
        $scope.fetchingData = false;
      });
    }

    // Public method, available from the view
    $scope.save = function () {
      $scope.sendingData = true;
      dataService.postData($state.params.email, $scope.matches).then(function(responseData) {
        $scope.sendingData = false;
        $scope.dataSubmitted = true;
        angular.extend($scope.matches, responseData);
        window.scrollTo(0, 0);
      }, function() {
        console.log('error -> ');
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
          responseData = responseData.data;
          if (typeof responseData === 'object') {
            dataService.storeUserData(responseData);
          }
          getMatchesData();
        }, function (error) {
          console.log('Invalid email -> ', error);
          $state.go('login');
        });
      }
    } else {
      $state.go('login');
    }
  });

})();
