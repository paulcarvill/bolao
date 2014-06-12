(function() {
	'use strict';

	angular.module('BolaoApp')

	.factory('dataService', function ($http, $q) {

		var dataUrl = 'https://spreadsheets.google.com/feeds/list/1cYYbop7mOM153UWLCbIzKHfigrBAamHLfxFqleTpHag/od6/public/values?alt=json-in-script';
    var apiUrl = 'http://rga-bolao.herokuapp.com/';
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
        return $http.get(apiUrl + 'login/' + email);
      },

      getPredictions: function () {
        return $http.get(apiUrl + 'predictions/');
        // return callJsonp(apiUrl + 'predictions');
      }

		};
	});

})();
