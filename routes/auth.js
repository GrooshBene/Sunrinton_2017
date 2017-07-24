function init(app, User){	
	app.get('/auth/register', function(req, res){
		var user = new User({
			_id : req.param('id'),
			thumbnail : req.param('thumbnail'),
			name : req.param('name'),
			kakao_token : "",
			options : {
				feature_lock : false,
				vibration : false,
				flash : false,
				tts : {
					value : false,
					text : false
				},
				alarm : false
			},
			online : false
		});
		user.save(function(err){
			if(err){
				console.log(err);
				res.send(401, "/auth/register Error");
			}
			console.log("User "+ user.name + " Saved");
			res.send(200, user);
		})
	})
}
module.exports = init;
