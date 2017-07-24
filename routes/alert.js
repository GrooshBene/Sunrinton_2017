function init(app, User){
	var FCM = require('fcm-node');
	var serverKey = "";
	var fcm = new FCM(serverKey);

	function sendPush(fcm_token, Title, content){
		var message = {
			to : fcm_token,
			priority : 'high',
			notification : {
				title : Title,
				body : content
			}
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
}

module.exports = init;
