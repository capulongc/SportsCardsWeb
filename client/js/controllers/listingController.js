angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function ($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function (response) {
      $scope.listings = response.data;
    }, function (error) {
      console.log('Unable to retrieve listings:', error);
    });

    var editID;
    $scope.setEdit = function (id) {
        editID = id;
        Listings.get(id).then(function (response) {
            $scope.editListing = response.data;
            document.getElementById("editImgFront").src = $scope.editListing.linkToFrontImage;
            document.getElementById("editImgBack").src = $scope.editListing.linkToBackImage;
            document.getElementById("editPlayerName").value = $scope.editListing.playerName;
            document.getElementById("editSport").value = $scope.editListing.sport;
            document.getElementById("editTeamName").value = $scope.editListing.teamName;
            document.getElementById("editPlayerPosition").value = $scope.editListing.playerPosition;
            document.getElementById("editCardYear").value = $scope.editListing.cardYear;
            document.getElementById("editCardBrand").value = $scope.editListing.cardBrand;
            document.getElementById("editHallOfFame").checked = $scope.editListing.hallOfFame;
            document.getElementById("editFloridaGator").checked = $scope.editListing.floridaGator;
        }, function (error) {
            console.log('Unable to retrieve listings:', error);
        });
    }

    $('#cardEdit').submit(function () {
        $scope.editListing.id = editID;
        (document.getElementById("editHallOfFame").checked) ? $scope.editListing.hallOfFame = true : $scope.editListing.hallOfFame = false;
        (document.getElementById("editFloridaGator").checked) ? $scope.editListing.floridaGator = true : $scope.editListing.floridaGator = false;

        if (document.getElementById('editCardFront').files.length > 0) {
            var uploadFrontPhoto = $.post("/api/v1/upload", $("#cardFront"));
            $scope.editListing.linkToFrontImage = "https://s3.amazonaws.com/sportscardsapp/" + document.getElementById('editCardFront').files.item(0).name;
        }

        if (document.getElementById('editCardBack').files.length > 0) {
            var uploadBackPhoto = $.post("/api/v1/upload", $('#cardBack'));
            $scope.editListing.linkToBackImage = "https://s3.amazonaws.com/sportscardsapp/" + document.getElementById('editCardBack').files.item(0).name;
        }

        alert("Card Successfully Updated");
        Listings.update($scope.editListing).then(function (response) {
            window.location = 'admin.html';
        },
        function (error) {
            console.log('Failed to delete listing:', error);
        });
    });

    $scope.detailedInfo = undefined;

    $('#cardUpload').submit(function () {
        if (document.getElementById('cardFront').files.length == 0
            || document.getElementById('cardBack').files.length == 0
            || document.getElementById('playerName').length == 0) {
            $('#errorMessage').modal("show");
            return false;
        }
        else {
            var uploadFrontPhoto = $.post("/api/v1/upload", $("#cardFront"));
            var uploadBackPhoto = $.post("/api/v1/upload", $('#cardBack'));

            $scope.newListing.linkToFrontImage = "https://s3.amazonaws.com/sportscardsapp/" + document.getElementById('cardFront').files.item(0).name;
            $scope.newListing.linkToBackImage = "https://s3.amazonaws.com/sportscardsapp/" + document.getElementById('cardBack').files.item(0).name;

            ($scope.hallOfFame) ? $scope.newListing.hallOfFame = true : $scope.newListing.hallOfFame = false;
            ($scope.floridaGator) ? $scope.newListing.floridaGator = true : $scope.newListing.floridaGator = false;

            alert("Card Successfully Added");
            Listings.create($scope.newListing).then(function (response) {
                window.location = 'admin.html';
            }, function (error) {
                console.log('Failed to add listing:', error);
            });
        }
     });

    $scope.deleteListing = function (id) {
      Listings.delete(id).then(function (response) {
        window.location = 'admin.html';
      },
        function (error) {
          console.log('Failed to delete listing:', error);
        });

    };
  }
]);