'use strict';

angular.module('mean.leads').factory('Leads', ['$resource', function ($resource) {
  return $resource('leads',
    {},
    {
    }
  );
}]);