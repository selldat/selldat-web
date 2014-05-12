'use strict';

angular.module('mean.leads').controller('LeadsController', ['$scope', 'Leads', function ($scope, Leads) {
  $scope.lead = {email: ''};
  $scope.success = false;
  $scope.error = false;

  $scope.createLead = function ($event) {
    if ($scope.lead.email) {
      $event.preventDefault();
      $event.stopPropagation();

      var lead = new Leads({
        email: $scope.lead.email
      });

      lead.$save(function (response) {
        $scope.success = true;
        $scope.error = false;
      }, function (response) {
        $scope.error = true;
        $scope.success = false;
        $scope.errorMessage = response.data.error;
      });
    }
  };
}]);

  