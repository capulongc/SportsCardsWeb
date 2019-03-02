angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('/api/listings');
    },
	
	create: function(listing) {
	  return $http.post('/api/listings', listing);
    }, 

    //Returns result of HTTP delete method
    delete: function(id) {
      return $http.delete('/api/listings/' + id);
    }
  };

  return methods;
});
