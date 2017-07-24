function init(app, User){
var FCM = require('fcm-node');
	var serverKey = "AAAA4b-ROg0:APA91bF76HnaJUTkGv1i3maPxVm2PxQBAMQJ2aoMOPNa5C3BusQTkajxPkCxrHi6oRGzdwQ06PTKsJxsUzaxtgjpGKtmsMloJQbP5V8hrHGTHwK0-ljLDrmEJTsI0qnOgZUkkcz-Z4I8";
	var fcm = new FCM(serverKey);

	function sendPush(fcm_token, content){
		var message = {
			to : fcm_token,
			priority : 'high',
			data : content
		};
		fcm.send(message, function(err, result){
			if(err){
				console.log('FCM message error');
			}
			else{
				console.log('FCM Sended : ' + result)
			}
		})
	}

	app.post('/user/online', function(req, res){
		User.findOneAndUpdate({_id : req.param('id')}, {online : true}, {new : true},function(err, result){
			if(err){
				console.log(err);
				res.send(401, "/user/online Update Error");
			}
			res.send(200, result);
		});
	});

	app.post('/user/offline', function(req, res){
		User.findOneAndUpdate({_id : req.param('id')}, {online : false}, {new : true}, function(err, result){
			if(err){
				console.log(err);
				res.send(401, "/user/offline update error");
			}
			res.send(200, result);
		});
	});

	app.post('/user/option/update', function(req, res){
		User.findOneAndUpdate({_id : req.param('id')}, {options : {
			feature_lock : req.param('feature_lock'),
			vibration : req.param('vibration'),
			flash : req.param('flash'),
			tts : {
				value : req.param('tts_value'),
				text : req.param('tts_text')
			},
			alarm : req.param('alarm')
		}
		}, {new : true}, function(err, result){
			if(err){
				console.log(err);
				res.send(401, "/user/option/update");
			}
			var message = {
				to : req.param('fcm_token'),
				priority : 'high',
				data : result
			}
			fcm.send(message, function(err, response){
				if(err){
					console.log("Something Has Wrong!");
				}
				else{
					console.log("Successfully Sent : " + result);
				}
			})
			res.send(200, result);
		});
	});


	app.post('/user/list', function(req, res){
		User.find({}, function(err, result){
			if(err){
				console.log(err);
				res.send(401, "/user/list update error");
			}
			res.send(200, result);
		});
	});

}
module.exports = init;
