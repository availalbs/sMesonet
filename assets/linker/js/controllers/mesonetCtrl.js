/*jslint node: true */
app.controller('MesonetCtrl', function MesonetCtrl($scope, $modal, sailsSocket, $log,$compile,$timeout,filterFilter){
  
  $scope.loggedIn = false;
  $scope.user = {};
  $scope.stations = [];
  $scope.mesoMap = {};
  $scope.addMarker = false;
  $scope.editable = false ;
  $scope.saveChanged = '';
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
							$scope.bindMarkers($scope.editable);
				});
			}
    });
  });
	
	mesonet.map.on('click',function(e){
		if($scope.addMarker){
			
			var new_station = $scope.stations[$scope.stations.length-1];
			new_station.id += 1;
			new_station.name = "Station "+new_station.id;
			new_station.lat = e.latlng.lat;
			new_station.lng = e.latlng.lng;
			
			var marker = new L.marker(e.latlng, {icon:mesoStation.mesoIcon, draggable:$scope.editable});
			mesonet.map.addLayer(marker);
			new_station.marker = marker;
			$scope.stations.push(new_station);
			$scope.markers.push(marker);
			
			var newScope = $scope.$new();
			var n = $compile('<div popup station="stations['+($scope.stations.length-1)+']" editable="'+true+'"></div>')(newScope);
			marker.bindPopup(n[0]);

			marker.on('dragend', function(event){
				var emarker = event.target;
				$scope.stations[i].lng = emarker._latlng.lng;
				$scope.stations[i].lat = emarker._latlng.lat;
				$scope.$apply();
			});

			$scope.addMarker = false;
		
		}else{
		
			//console.log('no add click');
		
		}
	});

	$scope.$on('sailsSocket:message', function(ev, data) {

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
						$scope.mesoMap = response;
						$scope.stations = response.mapData;
						mesoStation.stations = $scope.stations;
						mesoStation.drawStations();
						mesoStation.setDraggable(true);
						$scope.markers = mesoStation.markers;
						$scope.editable = true;
						$scope.bindMarkers($scope.editable);
			});
		}else{
			$scope.newMap();
		}
	};

	$scope.saveChanges = function(){
		$scope.mesoMap.mapData = $scope.stations;
		$scope.mesoMap.mapData.forEach(function(d){
			d.marker = [];
		});
		console.log($scope.mesoMap);
		sailsSocket.put(
			'/mesoMap/',$scope.mesoMap,
			function(response){
				console.log('Changes Saved',response);
				$scope.saveChanged = 'Changes Saved';
				$timeout(function(){
           $scope.saveChanged = '';
        },3000);
		});
	};



	$scope.newMap = function(){
		sailsSocket.get(
			'/mesoMap/1',{},
			function(response){
				
				var newMap = {};
				newMap.mapData = response.mapData;
				newMap.userId = $scope.user.id;
				sailsSocket.post('/mesoMap/',newMap,function(created){
				
					$scope.user.mapId = created.id;
					sailsSocket.put('/user/'+$scope.user.id, $scope.user,
						function(done) {
							$scope.getUserStations();
					});
				});
		});
	};
	
	$scope.$on('delete_station', function (evt, value) {
		var delete_index = -1;
		$scope.stations.forEach(function(d,i){
			if(d.id == value){
				delete_index = i;
			}
		});
		console.log('delete station',$scope.stations[delete_index]);
		mesonet.map.removeLayer($scope.stations[delete_index].marker);
		$scope.stations.splice(delete_index,1);
		$scope.markers.splice(delete_index,1);
	});

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
			//console.log('stations updated');
		},true);
	};

	$scope.addStation = function(){
		$scope.addMarker = true;
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