exports.action = function(data, callback, config, SARAH){
		// Retrieve config
		config = config.modules.meteoalerte;
		if (!config.numero_departement){
					console.log("Adresse non défini");
					callback({'tts' : 'numéro département non définie'});
					return;
					}
		console.log('dept :'+config.numero_departement);
		/*
		// Le site de meteo france 
		// Ne donne pas la couleur du departement quand supérieur a jaune
		// var url = 'http://france.meteofrance.com/vigilance/Bulletin?ZONE=DEPT'+config.numero_departement;
		//
		*/
		var url = 'http://meteo.mytinn.fr/sarah_al_meteo.php?dept='+config.numero_departement;
		var request = require('request');
		request({ 'uri' : url }, function (err, response, body){
				if (err || response.statusCode != 200) {
												callback({'tts': "Le site Meteo n'est pas disponible"});
												return;
												}
				/*
				var $ = require('cheerio').load(body, { xmlMode: false });
				var vigilance=$("body .texte12_bull span").text(); // class TD
				var crue=$("body .verda11 span").text(); // class TD
				 debug
				console.log(vigilance);
				console.log(crue);
				*/
				callback({'tts' : body });
				// version 1.2
				
		});
		
		
		
}