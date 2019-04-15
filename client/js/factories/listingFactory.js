angular.module('listings', []).factory('Listings', function($http) {
    var methods = {
    //**********************
    //----CRUD functions----
    //**********************
    getAll: function() {
      return $http.get('/api/listings');
    },

    get: function (id) {
      return $http.get('/api/listings/' + id);
    },
	
	create: function(listing) {
	  return $http.post('/api/listings', listing);
    }, 

    update: function (listing) {
       return $http.put('/api/listings/', listing);
    }, 

    delete: function(id) {
      return $http.delete('/api/listings/' + id);
    },



    //**********************
    //---Login functions---
    //**********************

    //LogIn user
    login: function (auth) {
        return $http.post('/members/login', auth);
    },

    createUser: function (newUser) {
        return $http.post('/members/register', newUser);
    },

    verifyUser: function (verUser) {
        return $http.post('/members' + newUser.registrationURL, verUser);
    },

    // get variables through local storage
    getUser: function () {
        var user = localStorage.getItem('user');
        return user;
    },

    getToken: function() {
        var token = localStorage.getItem('token');
        return token;
    },

    // set variables through local storage
    setUser: function (user) {
        $window.localStorage.setItem('user', JSON.stringify(user));
    },
    setToken: function (token) {
        $window.localStorage.setItem('token', JSON.stringify(token));
    },

    // log out (delete token + user)
    logout: function () {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        console.log("logged out");
    },

    // check if currently logged in
    isLoggedIn: function () {
        var token = methods.getToken();
        if (token) {
            return true
        } else {
            return false;
        }
    },
  };
  return methods;
});
