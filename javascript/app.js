var topspotsApp = angular.module("topspotsApp", ['ngRoute'])



.config(function($routeProvider) {
    $routeProvider.
    when('/:cityName', {
        templateUrl: 'templates/city.html',
        controller: 'cityCtrl'
    }).
    otherwise({
        redirectTo: '/sandiego'
    });

    

})

.factory('dataSetFactory', function($http, $routeParams) {
    return {
          getTopSpots: function(){
            
            return $http.get('http://localhost:62152/api/TopSpot');
          },
          postTopSpots: function(topspots) {
            return $http.post('http://localhost:62152/api/TopSpot', topspots);
          },
          deleteTopSpot: function(index) {
            console.log(index);
            return $http.delete('http://localhost:62152/api/TopSpot/' + index);
          }
        };

})



.controller('cityCtrl', ['$scope', '$routeParams', '$http', 'dataSetFactory', function($scope, $routeParams, $http, dataSetFactory) {

    $scope.city = $routeParams.cityName;

    

    var cityLatitude = '';
    var cityLongitude = '';
    $scope.map = {};

    if ($scope.city === 'sandiego') {
        $scope.title = 'San Diego';
        cityLatitude = 32.7157;
        cityLongitude = -117.1611;
    } else if ($scope.city === 'portland') {
        $scope.title = 'Portland';
        cityLatitude = 45.5231;
        cityLongitude = -122.6765;
    } else {
        window.location.replace('error/error.html');
    }

    

    $scope.markers = [];

   dataSetFactory.getTopSpots().then(
        function(response) {
            $scope.spots = response.data;
        },
        function(error) {

        }
    ); 

 $scope.goToTopSpot = function(spot) {
        window.location.replace('https://www.google.com/maps?q=' + spot.location);
    }


    $scope.pushToSpotsArray = function() {
        alert("in push to top spots function")
        $scope.spots.push({name: $scope.newName, description: $scope.newDescription, location: [$scope.newCoordX, $scope.newCoordY]});
        dataSetFactory.postTopSpots($scope.spots).then(
        ); 
    }

    $scope.deleteFromTopSpots = function(spot) {
        alert("delete ran...")
        var index = $scope.spots.indexOf(spot);


        dataSetFactory.deleteTopSpot(index).then(
            function(response) {
                $scope.spots = response.data;
            }

            )
    }

}])

.controller('navCtrl', function($scope) {
    $scope.tab = 1;

    $scope.setTab = function(tabId) {
        $scope.tab = tabId;
    };

    $scope.isSet = function(tabId) {
        return $scope.tab === tabId;
    }



});
