var topspotsApp = angular.module("topspotsApp", ['ngRoute'])



.config(function($routeProvider) {
	$routeProvider.
		when('/sandiego',{
			templateUrl: 'templates/sanDiego.html',
			controller: 'sanDiegoCtrl'
		}).
		when('/portland', {
			template: '<h2>Portland</h2>',
			controller: 'portlandCtrl'
		}).
		otherwise({
			redirectTo: '/sandiego'
		});

})

.factory('getData', function($http) {
	var cityData = {};
	cityData.getJson = function(city) {
		
	}
	};
})

.controller('sanDiegoCtrl', function($scope, $http) {
	 $http.get('mock/sanDiegoTopSpots.json').success(function(spots) {
          $scope.spots = spots;
          
        });

	 $scope.goToTopSpot = function(spot) {
	 	window.location.replace('https://www.google.com/maps?q=' + spot.location);
	 }

})

.controller('portlandCtrl', function($scope, $http) {
	$http.get('mock/portlandTopSpots.json').success(function(spots) {
          $scope.spots = spots;
    });
});




