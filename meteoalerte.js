exports.action = function(data, callback, config, SARAH){
		// Retrieve config
		config = config.modules.meteoalerte;
		if (!config.numero_departement){
					console.log("Adresse non défini");
					callback({'tts' : 'numéro département non définie'});
					return;
					}
		console.log('dept :'+config.numero_departement);
		//---------------------------------*******************------------------------------------------
		var url = 'http://france.meteofrance.com/vigilance/Bulletin?ZONE=DEPT'+config.numero_departement;
		var request = require('request');
		request({ 'uri' : url }, function (err, response, body){
				//debug
				//console.log(url);
				if (err || response.statusCode != 200) {
												callback({'tts': "Le site Meteo n'est pas disponible"});
												return;
												}
				var $ = require('cheerio').load(body, { xmlMode: false });
				var vigilance=$("body .texte12_bull span").text(); // class TD
				var crue=$("body .verda11 span").text(); // class TD
				// debug
				//console.log(vigilance);
				//console.log(crue);
				callback({'tts' : 'Pour le '+ config.numero_departement +' le '+ vigilance+ ' ' + crue });
				// version 1.2
				
		});
		
		
		
}