mesoStation = {
	markers : [],
	stations: [],
	icon_size : 20,
	draggable : false,
	mesoIcon:L.icon({iconUrl: '/linker/js/images/green.png',iconSize: [12, 12],iconAnchor: [ 12/2,12/2],popupAnchor: [0,0]}),
	sunyIcon:L.icon({iconUrl: '/linker/js/images/blue.png',iconSize: [12, 12],iconAnchor: [ 12/2,12/2],popupAnchor: [0,0]}),
	profilerIcon:L.icon({iconUrl: '/linker/js/images/orange.png',iconSize: [12, 12],iconAnchor: [ 12/2,12/2],popupAnchor:[0,0]}),
	high_impactIcon:L.icon({iconUrl: '/linker/js/images/high_impact.png',iconSize: [12, 12],iconAnchor: [ 12/2,24],popupAnchor:[0,-18]}),
	deficiencyIcon:L.icon({iconUrl: '/linker/js/images/deficient.png',iconSize: [24, 24],iconAnchor: [ 24/2,24],popupAnchor:[0,-18]}),
	other_sectorsIcon:L.icon({iconUrl: '/linker/js/images/beneficial.png',iconSize: [24, 24],iconAnchor: [ 24/2,24],popupAnchor:[0,-18]}),
	snowIcon:L.icon({iconUrl: '/linker/js/images/snowy.png',iconSize: [24, 24],iconAnchor: [ 24/2,24],popupAnchor:[0,-18]}),
	userIcon:L.icon({iconUrl: '/linker/js/images/imp_forecasting.png',iconSize: [24, 24],iconAnchor: [ 24/2,24],popupAnchor:[0,-18]}),
	drawStations : function() {

		if(mesoStation.markers.length > 0) { mesoStation.clearMarkers(); }

		mesoStation.stations.forEach(function(d,i){
			var station = L.marker([d.lat,d.lng],{draggable:mesoStation.draggable,alt:d.type});
			
			switch(d.type){
				case "mesonet":
					station.setIcon(mesoStation.mesoIcon);
					break;
				case "suny":
					station.setIcon(mesoStation.sunyIcon);
					break;
				case "profiler":
					station.setIcon(mesoStation.profilerIcon);
					break;
				case 'high-impact':
					station.setIcon(mesoStation.high_impactIcon);
					break;
				case 'deficiency':
					station.setIcon(mesoStation.deficiencyIcon);
					break;
				case 'other-sectors':
					station.setIcon(mesoStation.other_sectorsIcon);
					break;
				case 'snow':
					station.setIcon(mesoStation.snowIcon);
					break;
				case 'user':
					station.setIcon(mesoStation.userIcon);
					break;
			}

			mesoStation.markers.push(station);
	
		});
		mesoStation.setStations();
	},
	setStations : function() {
		mesoStation.markers.forEach(function(station,i){
			station.addTo(mesonet.map);
		});
	},
	setDraggable : function(true_or_false){
		mesoStation.draggable = true_or_false;
		mesoStation.markers.forEach(function(station,i){
			if(mesoStation.draggable){
				station.dragging.enable();
			}else{
				station.dragging.disable();
				//console.log(station.dragging.enabled());
			}
		});
	},
	clearMarkers : function(){
		mesoStation.markers.forEach(function(m){
			mesonet.map.removeLayer(m);
		});
		mesoStation.markers = [];
	},
	popupMarkup : function(index){
		var markup = '';
		return markup;
	}
};