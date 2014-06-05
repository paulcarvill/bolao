(function() {
	'use strict';

	angular.module('BolaoApp')

	.factory('dataService', function ($http, $q) {

		var dataUrl = 'https://spreadsheets.google.com/feeds/list/1cYYbop7mOM153UWLCbIzKHfigrBAamHLfxFqleTpHag/od6/public/values?alt=json-in-script';
    var userData;

		var validateResponse = function (response) {
			if (response.status === 200) {
				return response;
			} else {
				return $q.reject(response);
			}
		};

		var callJsonp = function (url) {
			return $http.jsonp(url + '&callback=JSON_CALLBACK')
				.then(function (response) {
					return validateResponse(response);
				}, function (response) {
					return validateResponse(response);
				});
		};

    var generateRandomScore = function () {
      return Math.floor(Math.random() * 4) + 1;
    };


		return {

			getData: function () {
				return callJsonp(dataUrl);
			},

      postData: function (data) {

        for (var i = 0; i < data.length; i++) {
          data[i].probWin = 50;
          data[i].probDraw = 30;
          data[i].probLose = 20;
        }

        // Fake post until we have backend in place...
        var deferred = $q.defer();
        deferred.resolve(data);
        return deferred.promise;
      },

      storeUserData: function (data) {
        userData = data;
      },

      getUserData: function () {
        return userData;
      },

      validateEmail: function (email) {

        var fakeUserData = [
          {
            date:'06/12/2014',
            time:'17:00',
            city:'Sāo Paulo',
            stadium:'Arena Corinthians',
            homeTeam:'Brazil',
            homeScore: generateRandomScore(),
            awayTeam:'Croatia',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'13/06/2014',
            time:'13:00',
            city:'Natal',
            stadium:'Estadio das Dunas',
            homeTeam:'Mexico',
            homeScore: generateRandomScore(),
            awayTeam:'Cameroon',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'13/06/2014',
            time:'16:00',
            city:'Salvador',
            stadium:'Arena Fonte Nova',
            homeTeam:'Spain',
            homeScore: generateRandomScore(),
            awayTeam:'Netherlands',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'13/06/2014',
            time:'18:00',
            city:'Cuiaba',
            stadium:'Arena Pantanal',
            homeTeam:'Chile',
            homeScore: generateRandomScore(),
            awayTeam:'Australia',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'14/06/2014',
            time:'13:00',
            city:'Danvan',
            stadium:'Estadio Mineirao',
            homeTeam:'Colombia',
            homeScore: generateRandomScore(),
            awayTeam:'Greece',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'14/06/2014',
            time:'16:00',
            city:'Danvan',
            stadium:'Estadio Castelao',
            homeTeam:'Uruguay',
            homeScore: generateRandomScore(),
            awayTeam:'Costa Rica',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'14/06/2014',
            time:'18:00',
            city:'Danvan',
            stadium:'Arena Amazonia',
            homeTeam:'England',
            homeScore: generateRandomScore(),
            awayTeam:'Italy',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'14/06/2014',
            time:'22:00',
            city:'Danvan',
            stadium:'Arena Pernambuco',
            homeTeam:'Côte D\'Ivoire',
            homeScore: generateRandomScore(),
            awayTeam:'Japan',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'15/06/2014',
            time:'13:00',
            city:'Danvan',
            stadium:'Estadio Nacional',
            homeTeam:'Switzerland',
            homeScore: generateRandomScore(),
            awayTeam:'Ecuador',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'15/06/2014',
            time:'16:00',
            city:'Danvan',
            stadium:'Estadio Beira-Rio',
            homeTeam:'France',
            homeScore: generateRandomScore(),
            awayTeam:'Honduras',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'15/06/2014',
            time:'19:00',
            city:'Danvan',
            stadium:'Maracanã',
            homeTeam:'Argentina',
            homeScore: generateRandomScore(),
            awayTeam:'Bosnia and Herzegovina',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'16/06/2014',
            time:'13:00',
            city:'Danvan',
            stadium:'Arena Fonte Nova',
            homeTeam:'Germany',
            homeScore: generateRandomScore(),
            awayTeam:'Portugal',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'16/06/2014',
            time:'16:00',
            city:'Danvan',
            stadium:'Arena da Baixada',
            homeTeam:'Iran',
            homeScore: generateRandomScore(),
            awayTeam:'Nigeria',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'16/06/2014',
            time:'19:00',
            city:'Danvan',
            stadium:'Estadio das Dunas',
            homeTeam:'Ghana',
            homeScore: generateRandomScore(),
            awayTeam:'USA',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'17/06/2014',
            time:'13:00',
            city:'Danvan',
            stadium:'Estadio Mineirao',
            homeTeam:'Belgium',
            homeScore: generateRandomScore(),
            awayTeam:'Algeria',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'17/06/2014',
            time:'16:00',
            city:'Danvan',
            stadium:'Estadio Castelao',
            homeTeam:'Brazil',
            homeScore: generateRandomScore(),
            awayTeam:'Mexico',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'17/06/2014',
            time:'18:00',
            city:'Danvan',
            stadium:'Arena Pantanal',
            homeTeam:'Russia',
            homeScore: generateRandomScore(),
            awayTeam:'Korea Republic',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'18/06/2014',
            time:'13:00',
            city:'Danvan',
            stadium:'Estadio Beira-Rio',
            homeTeam:'Australia',
            homeScore: generateRandomScore(),
            awayTeam:'Netherlands',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'18/06/2014',
            time:'16:00',
            city:'Danvan',
            stadium:'Maracanã',
            homeTeam:'Spain',
            homeScore: generateRandomScore(),
            awayTeam:'Chile',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'18/06/2014',
            time:'18:00',
            city:'Danvan',
            stadium:'Arena Amazonia',
            homeTeam:'Cameroon',
            homeScore: generateRandomScore(),
            awayTeam:'Croatia',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'19/06/2014',
            time:'13:00',
            city:'Danvan',
            stadium:'Estadio Nacional',
            homeTeam:'Colombia',
            homeScore: generateRandomScore(),
            awayTeam:'Côte D\'Ivoire',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'19/06/2014',
            time:'16:00',
            city:'Danvan',
            stadium:'Arena Corinthians',
            homeTeam:'Uruguay',
            homeScore: generateRandomScore(),
            awayTeam:'England',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'19/06/2014',
            time:'19:00',
            city:'Danvan',
            stadium:'Estadio das Dunas',
            homeTeam:'Japan',
            homeScore: generateRandomScore(),
            awayTeam:'Greece',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'20/06/2014',
            time:'13:00',
            city:'Danvan',
            stadium:'Arena do Dan Van',
            homeTeam:'Italy',
            homeScore: generateRandomScore(),
            awayTeam:'Costa Rica',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'20/06/2014',
            time:'16:00',
            city:'Danvan',
            stadium:'Arena do Dan Van',
            homeTeam:'Switzerland',
            homeScore: generateRandomScore(),
            awayTeam:'France',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'20/06/2014',
            time:'19:00',
            city:'Danvan',
            stadium:'Arena do Dan Van',
            homeTeam:'Honduras',
            homeScore: generateRandomScore(),
            awayTeam:'Ecuador',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'21/06/2014',
            time:'13:00',
            city:'Danvan',
            stadium:'Arena do Dan Van',
            homeTeam:'Argentina',
            homeScore: generateRandomScore(),
            awayTeam:'Iran',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'21/06/2014',
            time:'16:00',
            city:'Danvan',
            stadium:'Arena do Dan Van',
            homeTeam:'Germany',
            homeScore: generateRandomScore(),
            awayTeam:'Ghana',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'21/06/2014',
            time:'18:00',
            city:'Danvan',
            stadium:'Arena do Dan Van',
            homeTeam:'Nigeria',
            homeScore: generateRandomScore(),
            awayTeam:'Bosnia and Herzegovina',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'22/06/2014',
            time:'13:00',
            city:'Danvan',
            stadium:'Arena do Dan Van',
            homeTeam:'Belgium',
            homeScore: generateRandomScore(),
            awayTeam:'Russia',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'22/06/2014',
            time:'16:00',
            city:'Danvan',
            stadium:'Arena do Dan Van',
            homeTeam:'Korea Republic',
            homeScore: generateRandomScore(),
            awayTeam:'Algeria',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'22/06/2014',
            time:'18:00',
            city:'Danvan',
            stadium:'Arena do Dan Van',
            homeTeam:'USA',
            homeScore: generateRandomScore(),
            awayTeam:'Portugal',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'23/06/2014',
            time:'13:00',
            city:'Danvan',
            stadium:'Arena do Dan Van',
            homeTeam:'Netherlands',
            homeScore: generateRandomScore(),
            awayTeam:'Chile',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'23/06/2014',
            time:'13:00',
            city:'Danvan',
            stadium:'Arena do Dan Van',
            homeTeam:'Australia',
            homeScore: generateRandomScore(),
            awayTeam:'Spain',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'23/06/2014',
            time:'17:00',
            city:'Danvan',
            stadium:'Arena do Dan Van',
            homeTeam:'Cameroon',
            homeScore: generateRandomScore(),
            awayTeam:'Brazil',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'23/06/2014',
            time:'17:00',
            city:'Danvan',
            stadium:'Arena do Dan Van',
            homeTeam:'Croatia',
            homeScore: generateRandomScore(),
            awayTeam:'Mexico',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'24/06/2014',
            time:'13:00',
            city:'Danvan',
            stadium:'Arena do Dan Van',
            homeTeam:'Italy',
            homeScore: generateRandomScore(),
            awayTeam:'Uruguay',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'24/06/2014',
            time:'13:00',
            city:'Danvan',
            stadium:'Arena do Dan Van',
            homeTeam:'Costa Rica',
            homeScore: generateRandomScore(),
            awayTeam:'England',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'24/06/2014',
            time:'16:00',
            city:'Danvan',
            stadium:'Arena do Dan Van',
            homeTeam:'Japan',
            homeScore: generateRandomScore(),
            awayTeam:'Colombia',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'24/06/2014',
            time:'17:00',
            city:'Danvan',
            stadium:'Arena do Dan Van',
            homeTeam:'Greece',
            homeScore: generateRandomScore(),
            awayTeam:'Côte D\'Ivoire',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'25/06/2014',
            time:'13:00',
            city:'Danvan',
            stadium:'Arena do Dan Van',
            homeTeam:'Nigeria',
            homeScore: generateRandomScore(),
            awayTeam:'Argentina',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'25/06/2014',
            time:'13:00',
            city:'Danvan',
            stadium:'Arena do Dan Van',
            homeTeam:'Bosnia and Herzegovina',
            homeScore: generateRandomScore(),
            awayTeam:'Iran',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'25/06/2014',
            time:'16:00',
            city:'Danvan',
            stadium:'Arena do Dan Van',
            homeTeam:'Honduras',
            homeScore: generateRandomScore(),
            awayTeam:'Switzerland',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'25/06/2014',
            time:'17:00',
            city:'Danvan',
            stadium:'Arena do Dan Van',
            homeTeam:'Ecuador',
            homeScore: generateRandomScore(),
            awayTeam:'France',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'26/06/2014',
            time:'13:00',
            city:'Danvan',
            stadium:'Arena do Dan Van',
            homeTeam:'Portugal',
            homeScore: generateRandomScore(),
            awayTeam:'Ghana',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'26/06/2014',
            time:'13:00',
            city:'Danvan',
            stadium:'Arena do Dan Van',
            homeTeam:'USA',
            homeScore: generateRandomScore(),
            awayTeam:'Germany',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'26/06/2014',
            time:'17:00',
            city:'Danvan',
            stadium:'Arena do Dan Van',
            homeTeam:'Korea Republic',
            homeScore: generateRandomScore(),
            awayTeam:'Belgium',
            awayScore: generateRandomScore(),
            group:'D'
          },
          {
            date:'26/06/2014',
            time:'17:00',
            city:'Danvan',
            stadium:'Arena do Dan Van',
            homeTeam:'Algeria',
            homeScore: generateRandomScore(),
            awayTeam:'Russia',
            awayScore: generateRandomScore(),
            group:'D'
          }
        ];

        var responseData = {
          isValid: email === 'pedro@rga.com' || email === 'dan@rga.com' ? true : false,
          email: email,
          matchesData: email === 'pedro@rga.com' ? fakeUserData : ''
        };

        // Fake post until we have backend in place...
        var deferred = $q.defer();
        deferred.resolve(responseData);
        return deferred.promise;
      }

		};
	});

})();
