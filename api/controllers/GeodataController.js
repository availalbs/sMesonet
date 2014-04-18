/**
 * GeodataController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  getPointInfo:function(req,res){
  	if(typeof req.param("coords")=="undefined"){
  		res.json({responseText:"must send coordinates"})
  	}
  	 	var coords = req.param("coords");
		var sql = "select counties.name as \"County_Name\", nys_assembly.namelsad as \"Assembly_District\", nys_assembly.ad_name, nys_congress.namelsad as \"Congressional_District\", nys_congress.cd_name, nys_senate.namelsad as \"Senate_District\", nys_senate.rep_name, \"hu10\".\"Name\" as \"HU10_Name\", \"HU8\".\"Name\" as \"HU8_Name\", radar1km.sitename as \"RadarSite_1km\", radar1_5km.sitename as \"RadarSite_1_5km\", radar2km.sitename as \"RadarSite_2km\" from counties full join nys_assembly on ST_Contains(ST_Transform(nys_assembly.geom,4326),ST_SetSRID(ST_Point("+ coords[1] +","+ coords[0]+"),4326)) full join nys_congress on ST_Contains(ST_Transform(nys_congress.geom,4326),ST_SetSRID(ST_Point("+ coords[1] +","+ coords[0]+"),4326)) full join nys_senate on ST_Contains(ST_Transform(nys_senate.geom,4326),ST_SetSRID(ST_Point("+ coords[1] +","+ coords[0]+"),4326)) full join \"hu10\" on ST_Contains(ST_Transform(hu10.geom,4326),ST_SetSRID(ST_Point("+ coords[1] +","+ coords[0]+"),4326)) full join \"HU8\" on ST_Contains(ST_Transform(\"HU8\".geom,4326),ST_SetSRID(ST_Point("+ coords[1] +","+ coords[0]+"),4326)) full join radar1km on ST_Contains(ST_Transform(radar1km.geom,4326),ST_SetSRID(ST_Point("+ coords[1] +","+ coords[0]+"),4326)) full join radar1_5km on ST_Contains(ST_Transform(radar1_5km.geom,4326),ST_SetSRID(ST_Point("+ coords[1] +","+ coords[0]+"),4326)) full join radar2km on ST_Contains(ST_Transform(radar2km.geom,4326),ST_SetSRID(ST_Point("+ coords[1] +","+ coords[0]+"),4326)) where ST_Contains(ST_Transform(counties.geom,4326),ST_SetSRID(ST_Point("+ coords[1] +","+ coords[0]+"),4326))";
		console.log(sql);
		Geodata.query(sql,{},function(err,data){
		
			if (err) {res.send('{status:"error",message:"'+err+'"}',500);return console.log(err);}
			res.send(data.rows);
		});

  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to GeodataController)
   */
  _config: {}

  
};
