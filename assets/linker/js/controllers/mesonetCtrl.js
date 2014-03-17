/*jslint node: true */
app.controller('MesonetCtrl', function MesonetCtrl($scope, $modal, sailsSocket, $log,$compile,filterFilter){
  
  $scope.loggedIn = false;
  $scope.user = {};
  $scope.stations = [];

  $scope.$on('sailsSocket:connect', function(ev, data) {
    // Get Session Status
    sailsSocket.get(
      '/admin/getStatus', {},
      function(response) {
				if(response.status == 'loggedIn'){
					$scope.loggedIn = true;
					$scope.user = response.userInfo;
					$scope.getUserStations();
				}else{
					sailsSocket.get(
					'/mesoMap/1',{},
					function(response){
							$scope.stations = response.mapData;
							mesoStation.stations = $scope.stations;
							mesoStation.drawStations();
							mesoStation.setDraggable(false);
							$scope.markers = mesoStation.markers;
							$scope.bindMarkers(false);
				});
			}
				
    });
  });
	
	$scope.$on('sailsSocket:message', function(ev, data) {
    // Example messages:
    //   {model: "todo", verb: "create", data: Object, id: 25}
    //   {model: "todo", verb: "update", data: Object, id: 3}
    //   {model: "todo", verb: "destroy", id: 20}
    $log.debug('New comet message received :: ', data);
  });
  
	// $scope.loadStops = function(){
	// 	console.log('load stops',mesonet.stations);
	// 	sailsSocket.post('/mesomap',{mapData:mesonet.stations,userId:$scope.user.id},function(response){
	// 		console.log(response);
	// 	})
	// };
	
	$scope.getUserStations = function(){
		if($scope.user.mapId != -1 && $scope.user.mapId != null){
			sailsSocket.get(
				'/mesoMap/'+$scope.user.mapId,{},
				function(response){
					console.log('stations',response);
						$scope.stations = response.mapData;
						mesoStation.stations = $scope.stations;
						mesoStation.drawStations();
						mesoStation.setDraggable(true);
						$scope.markers = mesoStation.markers;
						$scope.bindMarkers(true);
						console.log($scope.markers);
			});
		}else{
			$scope.newMap();
		}
	};

	$scope.newMap = function(){
		sailsSocket.get(
			'/mesoMap/1',{},
			function(response){
				console.log('old map data for new map',response)
				var newMap = {};
				newMap.mapData = response.mapData;
				newMap.userId = $scope.user.id;
				sailsSocket.post('/mesoMap/',newMap,function(created){
					console.log(created);
					$scope.user.mapId = created.id;
					sailsSocket.put('/user/'+$scope.user.id, $scope.user,
					function(done) {
						$scope.getUserStations();
					});
				});
		});
	};

	$scope.bindMarkers = function(editable){
		$scope.markers.forEach(function(marker,i){
			$scope.stations[i].currentIndex = i;
			$scope.stations[i].marker = marker;
			var newScope = $scope.$new();
			var e = $compile('<div popup station="stations['+i+']" editable="'+editable+'"></div>')(newScope);
			marker.bindPopup(e[0]);

			marker.on('dragend', function(event){
				var emarker = event.target;
				$scope.stations[i].lng = emarker._latlng.lng;
				$scope.stations[i].lat = emarker._latlng.lat;
				$scope.$apply();
			});
		});
		$scope.$watchCollection('stations',function(){
			console.log('stations updated');
		},true);
	};

	
  //
  // Login modal
  //
  $scope.openModal = function () {
		var modalInstance = $modal.open({
      templateUrl: 'LoginModalContent.html',
      controller: LoginModalCtrl,
      resolve: {}
    });
    
    modalInstance.result.then(function (result) {
			if(result.user){ // Get Stations
				$scope.loggedIn = true;
				$scope.user = result.user;
				$scope.getUserStations();

			}
    });
  };
  //
	// Log Out
	//
	$scope.logout = function () {
		console.log('logging out');
		sailsSocket.post('/logout', {},
			function(response) {
				$scope.user = {};
				$scope.loggedIn = false;
				mesoStation.setDraggable(false);
			});
	};

});

function LoginModalCtrl($scope, $modalInstance,sailsSocket) {
	$scope.username='';
	$scope.password='';
	$scope.message='';
    
  $scope.ok = function (action,u,p) {
		sailsSocket.post('/socketLogin', {username: u,password:p},
			function(response) {
				console.log(response);
				if(response.status == 'failed'){
					$scope.message = response.message;
				}else{
					$modalInstance.close({ user: response.user_info});
				}
		});
		
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}