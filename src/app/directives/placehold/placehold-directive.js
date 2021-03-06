(function() {
  'use strict';

  angular.module('BolaoApp')

  .directive('placehold', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attr, ctrl) {

        var value;
        var valueHolder;

        var placehold = function () {
          element.val(value);
        };

        var unplacehold = function () {
          element.val('');
        };

        scope.$watch(attr.ngModel, function (val) {
          value = val || '';
        });

        element.bind('focus', function () {
          valueHolder = value;
          unplacehold();
        });

        element.bind('blur', function () {
          if (element.val() === '') {
            placehold();
          }
        });

        ctrl.$formatters.unshift(function (val) {
          if (!val) {
            placehold();
            value = '';
            return attr.placehold;
          }
          return val;
        });
      }
    };
  });

})();
