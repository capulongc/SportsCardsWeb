angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function ($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function (response) {
      $scope.listings = response.data;
    }, function (error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;

    $scope.addListing = function () {
      Listings.create($scope.newListing).then(function (response) {
        window.location = 'admin.html';
      }, function (error) {
        console.log('Failed to add listing:', error);
      });

    };

    $scope.deleteListing = function (id) {
      Listings.delete(id).then(function (response) {
        window.location = 'admin.html';
      },
        function (error) {
          console.log('Failed to delete listing:', error);
        });

    };
    
    $scope.showDetails = function (index) {
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);