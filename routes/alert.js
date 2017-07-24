function init(app, User){
	
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
