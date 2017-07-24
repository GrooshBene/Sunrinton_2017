function init(app, User){
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
