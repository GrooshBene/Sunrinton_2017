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
	
	app.post('/alert/test', function(req, res){
		var message = {
			to : req.param('fcm_token'),
			priority : 'high',
			notification : {
				title : "asdf",
				body : "asdf"
			}
		};

		fcm.send(message, function(err, result){
			if(err){
				console.log("Something Has Wrong!");
			}
			else{
				console.log("Successfully Sent : " + result);
			}
		})
	})
}

module.exports = init;
