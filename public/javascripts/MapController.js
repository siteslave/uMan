App.controller('MapController', function ($scope) {

    $scope.mapOptions = {
        center: new google.maps.LatLng(16.4321938, 102.8236214),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };

    $scope.markers = [];

    $scope.addMarker = function (event, param) {
        $scope.lat = param[0].latLng.k;
        $scope.lng = param[0].latLng.D;

        $scope.doClearMarker();

        $scope.markers.push(new google.maps.Marker({
            map: $scope.myMap,
            position: param[0].latLng
        }));
    };

    $scope.doClearMarker = function () {
        for (var i = 0; i < $scope.markers.length; i++) {
            $scope.markers[i].setMap(null);
        }
    };

    $scope.saveMap = function () {



    };

    $scope.showRoute = function () {

        var directionsService = new google.maps.DirectionsService();

        var src_latlng = new google.maps.LatLng(16.430734086914633, 102.81329870223999);
        var dst_latlng = new google.maps.LatLng(16.433975629107803, 102.82168865203857);


        var directionsDisplay;
        var map;

        directionsDisplay = new google.maps.DirectionsRenderer();

        map = new google.maps.Map(document.getElementById("myMap"), {
            center: new google.maps.LatLng(16.4321938, 102.8236214),
            zoom: 7
        });

        directionsDisplay.setMap(map);

        var request = {
          origin:src_latlng,
          destination:dst_latlng,
          travelMode: google.maps.TravelMode.WALKING
        };

        directionsService.route(request, function(result, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
          }
        });
    };

});
