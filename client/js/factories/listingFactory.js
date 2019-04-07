angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
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
    }
  };
  return methods;
});
