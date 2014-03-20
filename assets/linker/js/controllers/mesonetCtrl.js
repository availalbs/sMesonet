/*jslint node: true */
app.controller('MesonetCtrl', function MesonetCtrl($scope, $modal, sailsSocket, $log,$compile,$timeout,$http){

  var elevator = new google.maps.ElevationService();
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
					'/mesoMap/4',{},
					function(response){
							$scope.mesoMap = response;
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
	
  $scope.getUserStations = function(){
		if($scope.user.mapId != -1 && $scope.user.mapId !== null){
			sailsSocket.get(
				'/mesoMap/4',{},
				function(response){
						$scope.mesoMap = response;
						$scope.stations = response.mapData;
						if($scope.user.stations){
							if($scope.user.stations.length > 0){
								$scope.user.stations.forEach(function(station){
									$scope.stations.push(station);
								});
							}
						}
						mesoStation.stations = $scope.stations;
						mesoStation.drawStations();
						
						if($scope.user.accesslevel == 1) {
							$scope.editable = true;
						}

						mesoStation.setDraggable($scope.editable);
						$scope.markers = mesoStation.markers;
						
						$scope.bindMarkers($scope.editable);
			});
		}else{
			$scope.newMap();
		}
	};

	$scope.exportComments = function (){
		sailsSocket.get('/comment/find',{"where":{"mapId":$scope.mesoMap.id}},
			function(response){
				console.log(response);
				var output  = [['user','station_id','type','body','createdAt']];
				response.forEach(function(comment){
					output.push([comment.username,comment.stationId,comment.type,comment.body,comment.createdAt]);
				})
				downloadCSV(output,"mesonet_comments.csv");
			}
		);
		
	}

	$scope.exportStations = function(){
		var output = [['id','name','type','elevation','lat','lng']];
		$scope.stations.forEach(function(station){
			if(!station.elevation){
				station.elevation = 0;
			}
			output.push([station.id,station.name,station.type,station.elevation,station.lat,station.lng]);
		});
		downloadCSV(output,"meso_stations.csv");
		
	};

	function downloadCSV(output,filename){
		var csvContent = "data:text/csv;charset=utf-8,";
		output.forEach(function(infoArray, index){
			dataString = infoArray.join(",");
			csvContent += dataString+ "\n";
		});
		if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1){
			var encodedUri = encodeURI(csvContent);
			var link = document.createElement("a");
			link.setAttribute("href", encodedUri);
			link.setAttribute("download", filename);
			link.click();
		}else{
			var encodedUri = encodeURI(csvContent);
			window.open(encodedUri);
		}
	};

	mesonet.map.on('click',function(e){
		if($scope.addMarker){
			
			var new_station = $scope.stations[$scope.stations.length-1];
			new_station.id += 1;
			new_station.name = "Station "+new_station.id;
			new_station.lat = e.latlng.lat;
			new_station.lng = e.latlng.lng;

			var marker = {};
			if($scope.user.accesslevel == 1){
				new_station.type='mesonet';
				marker = new L.marker(e.latlng, {icon:mesoStation.mesoIcon, draggable:true});
			}else{
				new_station.type='user';
				marker = new L.marker(e.latlng, {icon:mesoStation.userIcon, draggable:true});

			}
			
			
			mesonet.map.addLayer(marker);
			new_station.marker = marker;
			$scope.stations.push(new_station);
			if($scope.user.accesslevel !== 1){
				if(!$scope.user.stations){
					$scope.user.stations = [];
				}
				$scope.user.stations.push($scope.stations[$scope.stations.length-1]);
			}
			$scope.markers.push(marker);
			
			var newScope = $scope.$new();
			var n = $compile('<div popup station="stations['+($scope.stations.length-1)+']" editable="'+true+'" mapId="'+$scope.mesoMap.id+'"></div>')(newScope);
			marker.bindPopup(n[0]);

			marker.on('dragend', function(event){
				var emarker = event.target;
				$scope.stations[$scope.stations.length-1].lng = emarker._latlng.lng;
				$scope.stations[$scope.stations.length-1].lat = emarker._latlng.lat;
				getElevation($scope.stations[$scope.stations.length-1].lat, $scope.stations[$scope.stations.length-1].lng,$scope.stations.length-1);
				$scope.$apply();
			});

			$scope.addMarker = false;
			$('#map').css('cursor','');
		}else{
		
			//console.log('no add click');
		
		}
	});

	$scope.$on('sailsSocket:message', function(ev, data) {

    $log.debug('New comet message received :: ', data);
  
  });
  
	// $scope.loadStops = function(){
	//	console.log('load stops',mesonet.stations);
	//	sailsSocket.post('/mesomap',{mapData:mesonet.stations,userId:$scope.user.id},function(response){
	//		console.log(response);
	//	})
	// };
	
	

	$scope.saveChanges = function(){
		if($scope.user.accesslevel == 1){
			$scope.mesoMap.mapData = $scope.stations;
			$scope.mesoMap.mapData.forEach(function(d){
				d.marker = [];
				delete d.comments;
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
		}else{
			$scope.user.stations.forEach(function(d){
				d.marker = [];
				delete d.comments;
			});
			sailsSocket.put(
				'/user/'+$scope.user.id,$scope.user,
				function(response){
					console.log('Changes Saved',response);
					$scope.saveChanged = 'Changes Saved';
					$timeout(function(){
	           $scope.saveChanged = '';
	        },3000);
				});
		}
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
	$scope.$on('viewComment',function(evt,station_id){
		var station_index = -1;
		$scope.stations.forEach(function(d,i){
			if(d.id == station_id){
				station_index = i;
			}
		});
		var modalInstance = $modal.open({
      templateUrl: 'ViewCommentModalContent.html',
      controller: ViewCommentModalCtrl,
      resolve: {
				comments: function () { return $scope.stations[station_index].comments; },
      }
    });

	});

	$scope.$on('comment', function(evt,value){
		$scope.current_station = value;
		var modalInstance = $modal.open({
      templateUrl: 'CommentModalContent.html',
      controller: CommentModalCtrl,
      resolve: {
				user: function () { return $scope.user; },
        station_id: function () { return $scope.current_station; },
        map_id: function () { return $scope.mesoMap.id; }
      }
    });
		modalInstance.result.then(function (result) {
			//if()
		});
	});

	$scope.$on('delete_station', function (evt, value) {
		var delete_index = -1;
		$scope.stations.forEach(function(d,i){
			if(d.id == value){
				delete_index = i;
			}
		});
		
		mesonet.map.removeLayer($scope.stations[delete_index].marker);
		$scope.stations.splice(delete_index,1);
		$scope.markers.splice(delete_index,1);
		$scope.bindMarkers($scope.editable);
		$scope.saveChanged = 'Deleted Station '+value;
		$timeout(function(){
       $scope.saveChanged = '';
    },3000);
	
	});

	$scope.bindMarkers = function(editable){
		$scope.markers.forEach(function(marker,i){
			var current_editable = editable;
			if($scope.stations[i].type == 'user') { 
				current_editable = true;
				marker.dragging.enable();
			}
			$scope.stations[i].currentIndex = i;
			$scope.stations[i].marker = marker;
			var newScope = $scope.$new();
			var e = $compile('<div popup station="stations['+i+']" editable="'+current_editable+'" mapId="'+$scope.mesoMap.id+'"></div>')(newScope);
			marker.bindPopup(e[0]);

			marker.on('dragend', function(event){
				var emarker = event.target;
				$scope.stations[i].lng = emarker._latlng.lng;
				$scope.stations[i].lat = emarker._latlng.lat;
				getElevation($scope.stations[i].lat, $scope.stations[i].lng,i);
				$scope.$apply();
			});
			marker.on('click',function(event){
				if(!$scope.stations[i].elevation){
					getElevation($scope.stations[i].lat, $scope.stations[i].lng,i);
				}
				sailsSocket.get('/comment/find',{"where":{"mapId":$scope.mesoMap.id,"stationId":$scope.stations[i].id}},
					function(response){
						$scope.stations[i].comments = response;
					});
			});
		});
	};

	$scope.addStation = function(){
		$scope.addMarker = true;
		$('#map').css('cursor','crosshair');
	};

	function getElevation(lat,lng,i){
		var locations = [];
		var coords =  new google.maps.LatLng(lat, lng);
		locations.push(coords);
		var positionalRequest = {
			'locations': locations
		};
		elevator.getElevationForLocations(positionalRequest, function(results, status) {
			if (status == google.maps.ElevationStatus.OK) {
				// Retrieve the first result
				if (results[0]) {
					$scope.stations[i].elevation =  results[0].elevation.toFixed(2);
				}
			}
		});
		
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

function CommentModalCtrl($scope, $modalInstance,sailsSocket,user,station_id,map_id) {
	$scope.message='';
	$scope.user = user;
	$scope.station_id = station_id;
	$scope.comment = {};
	$scope.comment.mapId = map_id;
	$scope.comment.stationId = station_id;

	console.log('halo',station_id,map_id);
	if($scope.user.id){
	
		$scope.comment.userId = $scope.user.id;
		$scope.comment.username = $scope.user.username;
	
	} else { $scope.comment.userId = -1; }

	$scope.ok = function (action) {
		console.log($scope.comment);
		sailsSocket.post('/comment',$scope.comment,
			function(response){
				$modalInstance.close({comment_id : response.id});
		});
	};
	$scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}

function ViewCommentModalCtrl($scope, $modalInstance,comments) {
	$scope.comments = comments;
	
  $scope.ok = function (action,u,p) {
			$modalInstance.close();
	};
}

function LoginModalCtrl($scope, $modalInstance,sailsSocket) {
	$scope.username='';
	$scope.password='';
	$scope.message='';
    
  $scope.ok = function (action,u,p) {
		sailsSocket.post('/socketLogin', {username: u,password:p},
			function(response) {
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