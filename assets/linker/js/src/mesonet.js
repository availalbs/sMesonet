var mesonet = {
	container:'',
	opacity:1,
	map:{},
	svg:{},
	g:{},
	datasource:'',
	geodata: {"mesonet":[{"id":1,"lat":42.1612,"lng":-79.4297},{"id":2,"lat":42.1612,"lng":-79.0967},{"id":3,"lat":42.3209857,"lng":-79.1762352},{"id":4,"lat":42.1612,"lng":-78.7637},{"id":5,"lat":42.4942,"lng":-78.7637},{"id":6,"lat":42.64291681,"lng":-78.64051223},{"id":7,"lat":43.1602,"lng":-78.7637},{"id":8,"lat":42.1612,"lng":-78.4307},{"id":9,"lat":42.4942,"lng":-78.4307},{"id":10,"lat":42.8272,"lng":-78.4307},{"id":11,"lat":43.1602,"lng":-78.4307},{"id":12,"lat":42.24478536,"lng":-78.11691284},{"id":13,"lat":42.4942,"lng":-78.0977},{"id":14,"lat":42.8272,"lng":-78.0977},{"id":15,"lat":43.1602,"lng":-78.0977},{"id":17,"lat":42.00032515,"lng":-73.49853516},{"id":19,"lat":43.1602,"lng":-77.7647},{"id":20,"lat":42.1612,"lng":-77.4317},{"id":21,"lat":42.4942,"lng":-77.4317},{"id":22,"lat":42.8272,"lng":-77.4317},{"id":23,"lat":43.25426767,"lng":-77.32804298},{"id":24,"lat":42.1612,"lng":-77.0987},{"id":25,"lat":42.4942,"lng":-77.0987},{"id":26,"lat":42.8272,"lng":-77.0987},{"id":27,"lat":43.1602,"lng":-77.0987},{"id":28,"lat":42.04521346,"lng":-76.61315918},{"id":29,"lat":42.4942,"lng":-76.7657},{"id":30,"lat":42.9483814,"lng":-76.81640625},{"id":31,"lat":43.1602,"lng":-76.7657},{"id":32,"lat":42.19189902,"lng":-76.31652832},{"id":33,"lat":42.4942,"lng":-76.4327},{"id":34,"lat":42.8272,"lng":-76.4327},{"id":37,"lat":42.00830167,"lng":-74.34690714},{"id":39,"lat":42.8272,"lng":-76.0997},{"id":40,"lat":43.32517768,"lng":-75.83055496},{"id":41,"lat":43.49010528,"lng":-76.10641479},{"id":42,"lat":43.82090429,"lng":-76.11328125},{"id":43,"lat":44.1592,"lng":-76.0997},{"id":45,"lat":42.4942,"lng":-75.7667},{"id":46,"lat":42.8272,"lng":-75.7667},{"id":47,"lat":43.15435386,"lng":-75.76034546},{"id":48,"lat":43.49458852,"lng":-75.75613976},{"id":49,"lat":43.68838753,"lng":-75.74403763},{"id":50,"lat":44.15770137,"lng":-75.76167583},{"id":51,"lat":42.1612,"lng":-75.4337},{"id":52,"lat":42.4942,"lng":-75.4337},{"id":53,"lat":42.8272,"lng":-75.4337},{"id":55,"lat":43.49268941,"lng":-75.43079853},{"id":56,"lat":43.8264775,"lng":-75.43187141},{"id":57,"lat":44.15594639,"lng":-75.43856621},{"id":58,"lat":44.49215838,"lng":-75.43169975},{"id":59,"lat":41.8282,"lng":-75.1007},{"id":60,"lat":42.16034956,"lng":-75.11764526},{"id":62,"lat":42.8272,"lng":-75.1007},{"id":63,"lat":42.99661232,"lng":-73.9050293},{"id":64,"lat":43.49810639,"lng":-75.09919167},{"id":65,"lat":43.81409962,"lng":-75.09476066},{"id":66,"lat":44.16084171,"lng":-75.0936985},{"id":67,"lat":44.48989293,"lng":-75.09748578},{"id":68,"lat":44.83030868,"lng":-75.08975029},{"id":69,"lat":41.4952,"lng":-74.7677},{"id":70,"lat":41.8282,"lng":-74.7677},{"id":72,"lat":42.4942,"lng":-74.7677},{"id":73,"lat":42.8272,"lng":-74.7677},{"id":74,"lat":43.1602,"lng":-74.7677},{"id":75,"lat":43.49003522,"lng":-74.75803614},{"id":77,"lat":44.12949232,"lng":-74.64712143},{"id":78,"lat":44.49081902,"lng":-74.77481604},{"id":79,"lat":44.8252,"lng":-74.7677},{"id":80,"lat":41.67586088,"lng":-74.3231535},{"id":81,"lat":41.8282,"lng":-74.4347},{"id":82,"lat":42.1612,"lng":-74.4347},{"id":83,"lat":42.4942,"lng":-74.4347},{"id":84,"lat":42.8272,"lng":-74.4347},{"id":85,"lat":43.15566875,"lng":-74.43928242},{"id":86,"lat":43.47285414,"lng":-74.41194534},{"id":87,"lat":43.85542662,"lng":-74.4233501},{"id":88,"lat":43.98393743,"lng":-74.22240973},{"id":89,"lat":44.48141205,"lng":-74.40937042},{"id":90,"lat":44.8252,"lng":-74.4347},{"id":91,"lat":41.1622,"lng":-74.1017},{"id":92,"lat":41.44272638,"lng":-74.05883789},{"id":93,"lat":41.81840821,"lng":-74.12321091},{"id":94,"lat":42.1879403,"lng":-74.12073255},{"id":95,"lat":42.4942,"lng":-74.1017},{"id":96,"lat":42.8272,"lng":-74.1017},{"id":97,"lat":43.16167933,"lng":-74.10853386},{"id":98,"lat":43.39161582,"lng":-74.01724756},{"id":99,"lat":43.84491185,"lng":-74.1454196},{"id":100,"lat":44.05595001,"lng":-74.11273956},{"id":101,"lat":44.69546293,"lng":-73.88285816},{"id":102,"lat":44.85021004,"lng":-74.14767265},{"id":103,"lat":41.1622,"lng":-73.7687},{"id":104,"lat":41.4952,"lng":-73.7687},{"id":105,"lat":41.8282,"lng":-73.7687},{"id":107,"lat":42.49440153,"lng":-73.76650929},{"id":108,"lat":42.68344493,"lng":-73.46694946},{"id":109,"lat":43.1489531,"lng":-73.76352668},{"id":110,"lat":43.49686115,"lng":-73.76441717},{"id":111,"lat":43.83369095,"lng":-73.77636909},{"id":112,"lat":44.15018848,"lng":-73.76838684},{"id":113,"lat":44.3672289,"lng":-73.90633821},{"id":114,"lat":44.81843762,"lng":-73.77242088},{"id":116,"lat":42.4942,"lng":-73.4357},{"id":117,"lat":42.8272,"lng":-73.4357},{"id":118,"lat":43.15523046,"lng":-73.43725204},{"id":119,"lat":43.49116385,"lng":-73.43038559},{"id":120,"lat":43.8262,"lng":-73.4357},{"id":121,"lat":44.15844029,"lng":-73.43300343},{"id":122,"lat":44.49032154,"lng":-73.43570709},{"id":125,"lat":40.96849281,"lng":-72.27905273}],"suny":[{"id":"Suny Plattsburgh","lat":44.6888,"lng":-73.46976111},{"id":"SUNY Cortland Outdoor Education Center","lat":43.82539722,"lng":-74.64746389},{"id":"State University of New York at Oswego","lat":43.45090278,"lng":-76.54401111},{"id":"Syracuse University","lat":43.03873333,"lng":-76.13416389},{"id":"SUNY Institute of Technology","lat":43.13558889,"lng":-75.22984722},{"id":"State University of New York Geneseo","lat":42.79600556,"lng":-77.82386389},{"id":"SUNY Cortland","lat":42.58941389,"lng":-76.19938333},{"id":"Cornell University","lat":42.43839722,"lng":-76.24622222},{"id":"SUNY Oneonta","lat":42.468975,"lng":-75.062575},{"id":"Alfred University","lat":42.253425,"lng":-77.78795833},{"id":"Binghamton University","lat":42.08882778,"lng":-75.96697222},{"id":"The College Golf Course at Delhi","lat":42.24896944,"lng":-74.91791667},{"id":"Columbia Green Community College","lat":42.21766944,"lng":-73.81764444},{"id":"Long Island University","lat":40.81775,"lng":-73.58892778}],"profiler":[{"id":"Buffalo","lat":42.944062,"lng":-78.729738},{"id":"Rochester","lat":43.121074,"lng":-77.664974},{"id":"Syracuse","lat":43.115431,"lng":-76.115832},{"id":"Utica","lat":43.144043,"lng":-75.387443},{"id":"Plattsburgh","lat":44.684928,"lng":-73.52392},{"id":"Glens Falls","lat":43.341237,"lng":-73.612457},{"id":"Albany (Albany International Airport)","lat":42.747323,"lng":-73.799346},{"id":"Columbia County","lat":42.298067,"lng":-73.710903},{"id":"Poughkeepsie (Dutchess County Airport)","lat":41.631989,"lng":-73.878981},{"id":"Floyd Bennett Field (Gateway NRA)","lat":40.588633,"lng":-73.880303},{"id":"Upton,OKX","lat":40.866667,"lng":-72.866667},{"id":"Governor’s Island (NYC)","lat":40.689984,"lng":-74.015451},{"id":"Belvedere Castle (Central Park NYC)","lat":40.779421,"lng":-73.968953},{"id":"Queens College (NYC - Queens)","lat":40.736305,"lng":-73.820299},{"id":"Fort Hamilton (NYC - Brooklyn)","lat":40.6101,"lng":-74.022173},{"id":"Fresh Kills (NYC - Staten Island)","lat":40.570501,"lng":-74.194527},{"id":"Randall’s Island (NYC)","lat":40.794726,"lng":-73.924021}]},
	interval:3330,
	latshift:0,
	longshift:0,
	ll:5,
	path:{},
	feature:{},
	nys:{},
	brewer_index:26,
	asos:{},
	asos_stations:{},
	asos_g:{},
	markers: [],
	icon_size : 20,
	stations: [],
	Icon:L.icon({iconUrl: '/linker/js/images/anemometer_g1_2.png',iconSize: [24, 24],iconAnchor: [ 24/2,0]}),
	sIcon:L.icon({iconUrl: '/linker/js/images/anemometer_p1_3.png',iconSize: [24, 24],iconAnchor: [ 24/2,0]}),
	pIcon:L.icon({iconUrl: '/linker/js/images/anemometer_g1_3.png',iconSize: [24, 24],iconAnchor: [ 24/2,0]}),
	ny_counties:ny_county_geo,
	counties:{layer:{},brewer:['YlGn','YlGnBu','GnBu','BuGn','PuBuGn','PuBu','BuPu','RdPu','PuRd','OrRd','YlOrRd','YlOrBr','Purples','Blues','Greens','Oranges','Reds','Greys','PuOr','BrBG','PRGn','PiYG','RdBu','RdGy','RdYlBu','Spectral','RdYlGn','Accent','Dark2','Paired','Pastel1','Pastel2','Set1','Set2','Set3'],ll:7},
	init : function(container) {
		if(typeof container != 'undefined'){ mesonet.container = container; }
		loader.push(mesonet.loadNYS);
		//if(mesonet.datasource !== '' ){ loader.push(mesonet.loadData); }
		loader.push(mesonet.initMap);
		loader.push(mesonet.loadASOS);
		loader.push(mesonet.drawCounties);
		loader.push(mesonet.drawASOS);
		loader.run();
		toggles.init();
		popup.init();
		
	},
	loadNYS :function(){
		$.ajax({url:'http://vis.availabs.org/mesonet/data/getNYS.php',
				type : 'POST',
				dataType:'json',
				async:false
		})
		.done(function(data) {
			mesonet.nys = data;
		})
		.fail(function(data) { console.log(data.responseText); });
		loader.run();
	},
	loadASOS :function(){
		$.ajax({url:'http://vis.availabs.org/mesonet/data/getASOS.php',
				type : 'POST',
				dataType:'json',
				async:false
		})
		.done(function(data) {
			mesonet.asos = data;

		})
		.fail(function(data) { console.log(data.responseText); });
		loader.run();
	},
	loadData : function() {
		$.ajax({url:mesonet.datasource,
				type : 'POST',
				data : {interval:mesonet.interval,lat:mesonet.latshift,lon:mesonet.longshift},
				dataType:'json',
				async:false
		})
		.done(function(data) {
			mesonet.geodata = data;
			//console.log(mesonet.geodata);
			$('#num_stations').html(data.count);
		})
		.fail(function(data) { console.log(data.responseText); });
		loader.run();
	},
	drawCounties:function(){
			mesonet.bounds = d3.geo.bounds(mesonet.ny_counties);
			path = d3.geo.path().projection(mesonet.project);
			mesonet.counties.max = 0;
			mesonet.counties.min = 1000000;

			mesonet.ny_counties.features.forEach(function(f){
				f.properties["P0010001"] = (f.properties["P0010001"]*1);
				f.properties["P0010001"] = (f.properties["P0010001"]*1);
				if(f.properties['P0010001'] > mesonet.counties.max){
					mesonet.counties.max = f.properties['P0010001'];
				}
				else if(f.properties['P0010001'] < mesonet.counties.min){
					mesonet.counties.min= f.properties['P0010001'];
				}
			});

			mesonet.counties.ll = 7;

			mesonet.counties.legend_domain = d3.scale.quantile()
				.domain([mesonet.counties.min,mesonet.counties.max/5])
				.range(colorbrewer[mesonet.counties.brewer[mesonet.brewer_index]][mesonet.counties.ll]);


			mesonet.counties.color = d3.scale.threshold()
				.domain(mesonet.counties.legend_domain.quantiles())
				.range(colorbrewer[mesonet.counties.brewer[mesonet.brewer_index]][mesonet.counties.ll].reverse());

			mesonet.counties.layer = mesonet.g.selectAll("path.county")
				.data(mesonet.ny_counties.features)
				.enter()
				.append("path")
				.attr("d", path)
				.attr("class", "county")
				.attr("c_name",function(d){ return d.properties.NAME+" "+d.properties.LSAD;})
				.attr("pop",function(d){ return d.properties['P0010001'];})
				.style("fill",function(d){
					if(d.properties['P0010001'] === null){
						return "#f00";
					}else{
						return mesonet.counties.color(d.properties['P0010001']);
					}

				})
				.style("stroke",'#333')
				.on("mouseover", function(self) {
					self = $(this);
					var text = "<p><strong>"+ self.attr("c_name") +"</strong><br>Population: "+number_format(self.attr("pop"))+"</p>";
					$("#info").show().html(text);
				})
				.on("mouseout", function(self) {
					self = $(this);
					$("#info").hide().html("");
				});
				mesonet.setLegend();
			loader.run();
	},
	setLegend : function(){
		var legendText = '<hr><h3>County Population</h3><ul id="tangle-legend">';
		var prev = 0;
		var numbers = ["zero","one","two","three","four","five","six","seven","eight","nine"];
		mesonet.counties.color.domain().forEach(function(d,i){
			
			if(i === 0){
				legendText += '<li><svg width="20" height="20"><rect width="300" height="100" fill="'+colorbrewer[mesonet.counties.brewer[mesonet.brewer_index]][mesonet.counties.ll][i]+'"></rect></svg><span>&lt;= '+number_format(mesonet.counties.color.domain()[i].toFixed(0))+' </span></li>';
			}
			else{
				legendText += '<li><svg width="20" height="20"><rect width="300" height="100" fill="'+colorbrewer[mesonet.counties.brewer[mesonet.brewer_index]][mesonet.counties.ll][i]+'"></rect></svg><span> '+number_format(mesonet.counties.color.domain()[i-1].toFixed(0))+' - '+number_format(mesonet.counties.color.domain()[i].toFixed(0))+'</span></span></li>';
			}
		});
		
		legendText += '<li><svg width="20" height="20"><rect width="300" height="100" fill="'+colorbrewer[mesonet.counties.brewer[mesonet.brewer_index]][mesonet.counties.ll][mesonet.counties.color.domain().length]+'"></rect></svg><span>&gt; '+number_format(mesonet.counties.color.domain()[mesonet.counties.color.domain().length-1].toFixed(0))+'</span></li>';
			
		legendText +="</ul>";
		$("#county_legend").html(legendText);
		legendText = '<hr><h3>Anual Average Rainfall (in inches)</h3><ul id="tangle-legend">';
		var rainfall_legend = [{'value':84962.7,'color':'rgba(26,150,65,255)'},{'value':99541.8,'color':'rgba(166,217,106,255)'},{'value':114121,'color':'rgba(255,255,192,255)'},{'value':128700,'color':'rgba(253,174,97,255)'},{'value':143279,'color':'rgba(215,25,28,255)'}];

		rainfall_legend.forEach(function(d,i){
			if(i === 0){
				legendText += '<li><svg width="20" height="20"><rect width="300" height="100" fill="'+d.color+'"></rect></svg><span>&lt;= '+(rainfall_legend[i].value * 0.000393701).toFixed(2)+'\" </span></li>';
			}
			else{
				legendText += '<li><svg width="20" height="20"><rect width="300" height="100" fill="'+d.color+'"></rect></svg><span> '+(rainfall_legend[i-1].value * 0.000393701).toFixed(2)+'\" - '+(rainfall_legend[i].value * 0.000393701).toFixed(2)+'\"</span></span></li>';
			}
		});
		$("#rainfall_layer_legend").html(legendText);
			//
	},
	drawASOS : function(){
		mesonet.asos_g = mesonet.svg.append("g").attr("class", "leaflet-zoom-hide asos_stations");
		mesonet.asos_stations = mesonet.asos_g.selectAll("circle.asos")
			.data(mesonet.asos)
				.enter()
				.append("circle")
				.classed("asos", true)
				.attr({
					r: 4,
					cx: function(d,i) {
						return mesonet.project([d.longitude*1,d.latitude*1])[0];
					},
					cy: function(d,i) {
						return mesonet.project([d.longitude*1,d.latitude*1])[1];
					},
					"fill": "#e74c3c",
					"station_name": function(d,i) {
						return d.station_name;
					},

				})
				.on("mouseover", function(self) {
					self = $(this);
					var text = "<p><strong>ASOS Station<br></strong>" + self.attr("station_name") + "</p>";
					$("#info").show().html(text);
				})
				.on("mouseout", function(self) {
					self = $(this);
					$("#info").hide().html("");
				});
				
		//console.log(mesonet.asos_stations);
		mesonet.map.on("viewreset", mesonet.reset);
		mesonet.reset();
		loader.run();
	},
	initMap : function(){
		var satellite = new L.TileLayer("http://{s}.tiles.mapbox.com/v3/am3081.h0pml9h7/{z}/{x}/{y}.png");
		var terrain = new L.TileLayer("http://{s}.tiles.mapbox.com/v3/am3081.h0pna3ah/{z}/{x}/{y}.png");
		var streets = new L.TileLayer("http://{s}.tiles.mapbox.com/v3/am3081.h0po4e8k/{z}/{x}/{y}.png");
		mesonet.rainfall = new L.tileLayer('http://vis.availabs.org/mesonet/data/tiles/{z}/{x}/{y}.png', {minZoom: 5, maxZoom: 10,tms: true,opacity:0.5});
		mesonet.floodplanes = new L.tileLayer('http://vis.availabs.org/mesonet/data/flood_planes/{z}/{x}/{y}.png', {minZoom: 5, maxZoom: 12,tms: true,opacity:1});
		var baseMaps = {
			"Streets": streets,
			"Satellite": satellite,
			"Terrain": terrain
		};
		
		mesonet.map = new L.Map(mesonet.container, {
			center: [42.76314586689494,-74.7509765625],
			zoom: 7,
			attributionControl:false,
			layers: [terrain, streets, satellite]//
		});
		L.control.layers(baseMaps,{},{position:'topleft'}).addTo(mesonet.map);
		mesonet.map.addLayer(mesonet.rainfall);
		L.control.scale().addTo(mesonet.map);
			
		mesonet.svg = d3.select(mesonet.map.getPanes().overlayPane).append("svg");
		mesonet.g = mesonet.svg.append("g").attr("class", "leaflet-zoom-hide stations");
		mesonet.path = d3.geo.path().projection(mesonet.project);
		loader.run();
	},
	reset : function() {
			
		var bottomLeft = mesonet.project(mesonet.bounds[0]),
			topRight = mesonet.project(mesonet.bounds[1]);
			
		mesonet.svg.attr("width", topRight[0] - bottomLeft[0])
			.attr("height", bottomLeft[1] - topRight[1])
			.style("margin-left", bottomLeft[0] + "px")
			.style("margin-top", topRight[1] + "px");
		mesonet.g.attr("transform", "translate(" + -bottomLeft[0] + "," + -topRight[1] + ")");
		mesonet.asos_g.attr("transform", "translate(" + -bottomLeft[0] + "," + -topRight[1] + ")");



		mesonet.counties.layer.attr("d", mesonet.path);
		//mesonet.feature.attr("d", mesonet.path);
		mesonet.asos_stations
			.attr("cx", function(d) {
				return mesonet.project([d.longitude*1,d.latitude*1])[0];
			})
			.attr("cy", function(d) {
				return mesonet.project([d.longitude*1,d.latitude*1])[1];
			});

	},
	project : function(x) {
		var point = mesonet.map.latLngToLayerPoint(new L.LatLng(x[1], x[0]));
		return [point.x, point.y];
	},
	updateMap : function() {
		loader.push(mesonet.loadData);
		loader.run();

		mesonet.geodata.features.forEach(function(d,i,s){
			if(typeof mesonet.markers[i] !== 'undefined' ){
				mesonet.markers[i].setLatLng(d.geometry.coordinates.reverse());
				mesonet.markers[i].update();
				mesonet.markers[i].getPopup().setContent("<strong>Station "+i+"</strong><br>["+mesonet.markers[i]._latlng.lat+","+mesonet.markers[i]._latlng.lng+"]");
			}else{
				var station = L.marker(d.geometry.coordinates.reverse(),{icon:mesonet.Icon,draggable:true});
				station.addTo(mesonet.map);
				station.on('dragend', function(event){
					var marker = event.target;
					marker.getPopup().setContent("<strong>Station "+i+"</strong><br>["+marker._latlng.lat+","+marker._latlng.lng+"]");
				});
				mesonet.markers.push(station);
				mesonet.markers[i].bindPopup("<strong>Station "+(i*1+1)+"</strong><br>["+mesonet.markers[i]._latlng.lat+","+mesonet.markers[i]._latlng.lng+"]");
			}
			
		});
		if(mesonet.markers.length > mesonet.geodata.features.length){
			for(var x =mesonet.geodata.features.length; x < mesonet.markers.length;x++ ){
				mesonet.markers[x].setLatLng([0,0]);
				mesonet.markers[x].update();
			}
		}
		

		//mesonet.reset();

	}
};
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
var toggles = {

    init : function() {

		$("#legend h2 a").on("click", function() {
			$(this).toggleClass("closed");
			$("#legend-detail").slideToggle(300);
			return false;
		});
		$("#info-tab h2 a").on("click", function() {
			$(this).toggleClass("closed");
			$("#info-detail").slideToggle(300);
			return false;
		});
	}
};

var popup = {

    init : function() {

		// position popup
		windowW = $(window).width();
		$("#map").on("mousemove", function(e) {
			
			var x = e.pageX + 20;
			var y = e.pageY;
			var windowH = $(window).height();
			if (y > (windowH - 100)) {
				y = e.pageY - 100;
			} else {
				y = e.pageY - 20;
			}

			$("#info").css({
				"left": x,
				"top": y
			});
		});

	}

};

//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
var loader = {
	queue: [],
	push: function(fn, scope, params) {
		this.queue.push(function(){ fn.apply(scope||window, params||[]); });
	},
	run: function(){
		if(this.queue.length) this.queue.shift().call();
	}
};

//------------------------------------------------------------------------------------------------------------
// Helper Functions
//--------------------------------------------------------------------------------------------------------------
function number_format(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
	

