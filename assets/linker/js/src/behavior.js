$(function(){
	mesonet.datasource = 'http://vis.availabs.org/mesonet/data/getGrid.php';
	mesonet.init('map');
	$('#rainfall_layer_legend').hide();
	$('.leaflet-tile-pane .leaflet-layer').last().css('z-index',4).addClass('rainfall_layer').hide();
	mesonet.map.addLayer(mesonet.floodplanes);
	$('.leaflet-tile-pane .leaflet-layer').last().css('z-index',4).addClass('floodplain_layer').hide();
	$('.county').hide();
	$('#county_legend').hide();
	$('#college_legend').hide();
	$('#water_legend').hide();
	$('#cc_structure_legend').hide();
	$('#cc_rainfall_legend').hide();
	$('#wind_stations_legend').hide();
	$('#libraries_legend').hide();
	$('#schools_legend').hide();
	$('#floodplain_layer_legend').hide();
	$('.huc10').hide();
	$('.huc8').hide();
	$('.college').hide();
	$('.water').hide();
	$('.cc_rainfall').hide();
	$('.cc_structure').hide();
	$('.wind_stations').hide();
	$('.libraries').hide();
	$('.schools').hide();
	
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


	$('#economic li a').on('click',function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$(this).removeClass('active-secret');
			$('.'+$(this).attr('id')).hide(500);
			$('#'+$(this).attr('id')+'_legend').hide(500);
		}else{
			if($(this).hasClass('secret')){
				$(this).addClass('active-secret');
			}
			$(this).addClass('active');
			$('.'+$(this).attr('id')).show(500);
			$('#'+$(this).attr('id')+'_legend').show(500);
		}
	});

});