(function() {
	'use strict';

	angular.module('BolaoApp')

	.factory('dataService', function ($http, $q) {

		var dataUrl = 'https://spreadsheets.google.com/feeds/list/1cYYbop7mOM153UWLCbIzKHfigrBAamHLfxFqleTpHag/od6/public/values?alt=json-in-script';
    var apiUrl = 'http://boiling-mountain-6619.herokuapp.com/';
    var userData;
    var userVerified;

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

    /*var generateRandomScore = function () {
      return Math.floor(Math.random() * 3) + 0;
    };*/


		return {

			getData: function () {
				return callJsonp(dataUrl);
			},

      postData: function (email, data) {
        /*email = email;

        for (var i = 0; i < data.length; i++) {
          data[i].probWin = 50;
          data[i].probDraw = 30;
          data[i].probLose = 20;
        }

        // Fake post until we have backend in place...
        var deferred = $q.defer();
        deferred.resolve(data);
        return deferred.promise;*/

        // remove angular hash properties
        for (var i = 0; i < data.length; i++) {
          delete data[i].$$hashKey;
        }

        return $http({
          url: apiUrl + 'user/' + email,
          method: 'POST',
          data: JSON.stringify(data),
          headers: {'Content-Type': 'application/json'}
        });
      },

      storeUserData: function (data) {
        userData = data;
      },

      getUserData: function () {
        return userData;
      },

      resetUserData: function () {
        userData = null;
      },

      verifyUser: function () {
        userVerified = true;
      },

      isUserVerified: function () {
        return userVerified;
      },

      resetUserVerification: function () {
        userVerified = false;
      },

      validateEmail: function (email) {
        return $http.get(apiUrl + 'login/' + email)
          .then(function (response) {
            return validateResponse(response);
          }, function (response) {
            return validateResponse(response);
          });
      }

		};
	});

})();
