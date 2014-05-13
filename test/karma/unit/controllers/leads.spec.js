'use strict';

(function() {
  describe('MEAN controllers', function () {
    
    describe('LeadsController', function () {
      beforeEach(function () {
        this.addMatchers({
          toEqualData: function (expected) {
            return angular.equals(this.actual, expected);
          }
        });
      });

      beforeEach(module('mean'));

      var LeadsController,
        scope,
        $rootScope,
        $httpBackend;

      beforeEach(inject(function ($controller, _$rootScope_, _$httpBackend_) {
        scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;

        LeadsController = $controller('LeadsController', {
          $scope: scope,
          $rootScope: _$rootScope_
        });

        $httpBackend = _$httpBackend_;
      }));

      afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('should raise an error because email already registered was sent', function () {
        $httpBackend.when('POST', 'leads').respond(400, {error: 'Email already Registered'});
        scope.lead.email = 'someone@gmail.com';
        scope.createLead({preventDefault: function() {}, stopPropagation: function () {}});
        $httpBackend.flush();

        expect(scope.error).toBe(true);
        expect(scope.errorMessage).toEqual('Email already Registered');
      });

    });
  });
} ());