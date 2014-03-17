app.directive('popup', function () {
  return {
    restrict: 'A',
    templateUrl: '/linker/js/directives/popupTemplate.html',
    scope: {
      station : '=',
      editable : '=',
      deletes:'&'
    },
    controller: function($scope, $timeout) {
      //console.log($scope.editable);
      // if($scope.editable == 'true'){
      //   $scope.editable = true;
      // }else{
      //   $scope.editable = false;
      // }
      $scope.$watchCollection('stations',function(){
        //console.log('stations updated directive');
      },true);

      $scope.deleteStation = function(station_id){
        $scope.$emit('delete_station', station_id);   
      };

      $scope.changeIcon = function(station){
        switch(station.type){
          case "mesonet":
            station.marker.setIcon(mesoStation.mesoIcon);
            break;
          case "suny":
            station.marker.setIcon(mesoStation.sunyIcon);
            break;
          case "profiler":
            station.marker.setIcon(mesoStation.profilerIcon);
            break;
          case 'high-impact':
            station.marker.setIcon(mesoStation.high_impactIcon);
            break;
          case 'deficiency':
            station.marker.setIcon(mesoStation.deficiencyIcon);
            break;
          case 'other-sectors':
            station.marker.setIcon(mesoStation.other_sectorsIcon);
            break;
          case 'snow':
            station.marker.setIcon(mesoStation.snowIcon);
            break;
        }
      };

   
      $scope.addComment = function(id){
        console.log('add comment to:'+id);
      };
    }
  };
});