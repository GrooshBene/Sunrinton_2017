function init(app, User){	
	var passport = require('passport');
	var FacebookTokenStrategy = require('passport-facebook-token');
	app.use(passport.initialize());
	app.use(passport.session());
	passport.serializeUser(function(user, done){
        	done(null, user);
    	});
    	passport.deserializeUser(function(obj, done){
     	   done(null, obj);
    	});

	passport.use(new FacebookTokenStrategy({
        	clientID : "262627810904922",
        	clientSecret : "add26b42eab3f5e2ce79269e0ed610fa"
    	}, function(accessToken, refreshToken, profile, done){
    	    console.log(profile);
    	    User.findOne({
    	        _id : profile.id
    	    }, function(err, user){
    	        if(err){
    	            return done(err);
    	        }
    	        if(!user){
    	            var user = new User({
			_id : profile.id,
			thumbnail : profile.photos,
			name : profile.displayName,
			terror_target : "",
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
                    }
                    else{
                        done(null, profile);
                    }
                });
            }
            else if(user){
                done(null, profile);
            }
        });   
    }));
app.get('/auth/facebook/token', passport.authenticate('facebook-token'), function(req, res){
        console.log("User Token : "+ req.param('access_token'));
        if(req.user){
            User.findOne({_id : req.user.id}, function(err, result){
                if(err){
                    console.log("/auth/facebook/token User Finding Error : " + err);
                    res.send(404, "User Finding DB Error");
                }
                res.send(200, result)
            });
        }
        else if(!req.user){
            res.send(404, "Can't find User On Facebook. It May Be Unusable User Data.");
        }
    });
//	app.get('/auth/register', function(req, res){
//		var user = new User({
//			_id : req.param('id'),
//			thumbnail : req.param('thumbnail'),
//			name : req.param('name'),
//			terror_target : "",
//			options : {
//				feature_lock : false,
//				vibration : false,
//				flash : false,
//				tts : {
//					value : false,
//					text : false
//				},
//				alarm : false
//			},
//			online : false
//		});
//		user.save(function(err){
//			if(err){
//				console.log(err);
//				res.send(401, "/auth/register Error");
//			}
//			console.log("User "+ user.name + " Saved");
//			res.send(200, user);
//		})
//	})
//}
}
module.exports = init;
