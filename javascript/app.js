var topspotsApp = angular.module("topspotsApp", ['ngRoute', 'uiGmapgoogle-maps'])



.config(function($routeProvider, uiGmapGoogleMapApiProvider) {
    $routeProvider.
    when('/:cityName', {
        templateUrl: 'templates/city.html',
        controller: 'cityCtrl'
    }).
    otherwise({
        redirectTo: '/sandiego'
    });

    

})



.controller('cityCtrl', function($scope, $routeParams, $http, uiGmapGoogleMapApi) {

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

    console.log($scope.map)

    $http.get('mock/' + $scope.city + '.json').success(function(spots) {
        $scope.spots = spots;

        //create marker object array
        $scope.markers = $scope.spots.map(function(spot) {
            var rObj = {};
            rObj.position = { latitude: spot.location[0], longitude: spot.location[1] };
            rObj.map = $scope.map;
            rObj.title = spot.name;
            console.log(rObj);
            return rObj;
        });

    });

    $scope.goToTopSpot = function(spot) {
        window.location.replace('https://www.google.com/maps?q=' + spot.location);
    }
})

.controller('navCtrl', function($scope) {
    $scope.tab = 1;

    $scope.setTab = function(tabId) {
        $scope.tab = tabId;
    };

    $scope.isSet = function(tabId) {
        return $scope.tab === tabId;
    }



});
