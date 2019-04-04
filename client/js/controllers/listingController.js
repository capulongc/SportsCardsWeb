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
        var frontURL = document.getElementById('cardFront').files.item(0).name; 
        var backURL = document.getElementById('cardBack').files.item(0).name; 
        $scope.newListing.linkToFrontImage = "https://s3.amazonaws.com/sportscardsapp/"+frontURL;
        $scope.newListing.linkToBackImage = "https://s3.amazonaws.com/sportscardsapp/"+backURL;
        Listings.create($scope.newListing).then(function (response) {
          window.location = 'admin.html';
        }, function (error) {
          console.log('Failed to add listing:', error);
        });

     };

    $('#cardUpload').submit(function (res) {
        var uploadFrontPhoto = $.post("/api/v1/upload", $("#cardFront"));
        var uploadBackPhoto = $.post("/api/v1/upload", $('#cardBack'));
        uploadFrontPhoto.then($scope.addListing(), function (error) {
            console.log('Failed to add listing: ', error);
        });
        return true;
    });

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