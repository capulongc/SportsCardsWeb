angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
    function ($scope, Listings) {

        // check & set access level/auth token
        if (Listings.isLoggedIn()) {
            var token = JSON.parse(Listings.getToken());
            $scope.token = token
            var user = JSON.parse(Listings.getUser());
            $scope.user = user;
            $scope.accessLevel = user.level;
        }
        else {
            $scope.accessLevel = 0;
            console.log("not authenticated");
        }

        //Retrieves information on member
        $scope.info = function (id) {
            Listings.info(id).then(function (response) {
                $scope.member = response.data;
            }, function (error) {
                console.log('Unable to retrieve member:', error);
            });
        }

        //Sends to home page after register confirmation modal is closed
        $('#registerMessage').on('hidden.bs.modal', function () {
            window.location.href = '/home.html';
        })

        //Register user function
        $('#userRegister').submit(function (e) {
            e.preventDefault();
            var newUser = $scope.newUser;
            if (newUser.password == newUser.confirmPassword) {
                Listings.createUser(newUser).then(function (response) {
                    if (response.data.success)
                        $('#registerMessage').modal("show");
                    else
                        console.log("ERROR");
                }, function (error) {
                    console.log('Unable to create member:', error);
                });
            }
            else {
                $('#errorMessage').modal("show");
            }
        });

        //Login user function
        $('#userLogin').submit(function (e) {
            e.preventDefault();
            var loginUser = $scope.login;
            Listings.login(loginUser).then(function (response) {
                console.log(response);
                if (response.data.message)
                    $('#invalidLogin').modal("show");
                if (response.data.success) {
                    Listings.setToken(response.data.token);
                    Listings.setUser(response.data.member[0]);
                    window.location.href = '/user.html';
                }
            }, function (error) {
                console.log('Unable to login member:', error);
            });
        });

        //Logout user function
        $scope.logout = function () {
            Listings.logout();
            window.location.href = '/home.html';
        }

        $scope.verify = function () {
            let regURL = window.location.hash;
            var verUser;
            regURL = regURL.replace('#', '');
            verUser.registrationURL = regURL;
            Listings.verifyUser(verUser).then(function (response) {
                console.log(response);
                if (response.data.success) {
                    window.location.href = '/user.html';
                    window.location.reload();
                }
                else
                    $scope.message = "Error.";
            }, function (error) {
                console.log('Verification failed:', error);
            });
        }

    }
]);