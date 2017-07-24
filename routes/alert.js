function init(app, User){
	var FCM = require('fcm-node');
	var serverKey = "";
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
