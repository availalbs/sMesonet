$(function(){
	mesonet.datasource = 'http://vis.availabs.org/mesonet/data/getGrid.php';
	mesonet.init('map');
	$('#rainfall_layer_legend').hide();
	//$('.leaflet-tile-pane .leaflet-layer').last().css('z-index',4).addClass('rainfall_layer').hide();//
	//mesonet.map.addLayer(mesonet.floodplanes);
	//$('.leaflet-tile-pane .leaflet-layer').last().css('z-index',4).addClass('floodplain_layer').hide();//
	$('.county').hide();
	$('#county_legend').hide();
	$('#floodplain_layer_legend').hide();
	
	//var map = {"200":2645,"199":2648,"198":,}

	$('#interval_slider').on('change',function(){
		$('#interval_text').val($('#interval_slider').val());
		mesonet.interval = $('#interval_slider').val()*1;
		mesonet.updateMap();
	})

	$('#interval_text').on('change',function(){
		$('#interval_slider').val($('#interval_text').val());
		mesonet.interval = $('#interval_text').val()*1;
		mesonet.updateMap();
	});

	$('#long_adjust').on('change',function(){
		$('#long-shift').html(($('#long_adjust').val()*100).toPrecision(2));
		mesonet.longshift = $('#long_adjust').val()*1;
		mesonet.updateMap();

	});

	$('#lat_adjust').on('change',function(){
		$('#lat-shift').html(($('#lat_adjust').val()*100).toPrecision(2));
		mesonet.latshift = $('#lat_adjust').val()*1;
		mesonet.updateMap();
	});

	$('#export_csv').on('click',function(){
		var outputs = [];
		mesonet.markers.forEach(function(d,i){
			var marker = {};
			marker.id = (i*1+1);
			marker.lat = mesonet.markers[i]._latlng.lat;
			marker.lon = mesonet.markers[i]._latlng.lng;
			outputs.push(marker);
		})

		$.ajax({url:'http://vis.availabs.org/mesonet/data/export_csv.php',
				type : 'POST',
				data: {markers:outputs},
				dataType:'json',
				async:false
		})
		.done(function(data) {
			$('#download').html("<a href='http://vis.availabs.org/mesonet/data/exports/mesonet_stations.csv'>[Download]</a>")
		})
		.fail(function(data) { console.log(data.responseText); });


	})
	$('#economic li a').on('click',function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$('.'+$(this).attr('id')).hide(500);
			$('#'+$(this).attr('id')+'_legend').hide(500);
		}else{
			$(this).addClass('active');
			$('.'+$(this).attr('id')).show(500);
			$('#'+$(this).attr('id')+'_legend').show(500);
		}
	});

});