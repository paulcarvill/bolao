(function() {
	'use strict';

	angular.module('BolaoApp')

	.factory('dataService', function ($http, $q) {

		var dataUrl = 'https://spreadsheets.google.com/feeds/list/1cYYbop7mOM153UWLCbIzKHfigrBAamHLfxFqleTpHag/od6/public/values?alt=json-in-script';

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


		return {

			getData: function () {
				return callJsonp(dataUrl);
			},

      postData: function (data) {
        console.log('posting... -> ', data);
      }

		};
	});

})();
