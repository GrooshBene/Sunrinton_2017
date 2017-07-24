function init(app, User){
	var passport = require('passport');
	var KakaoStrategy = require('passport-kakao').Strategy;
	var kakao_token = require('passport-kakao-token')
	passport.use(new KakaoStrategy({
		clientID : "e3465718c3e6bed556d26e1ea1ee562c",
		callbackURL : "http://localhost:3000/oauth"
	}, function(accessToken, refreshToken, profile, done){
			User.findOne({
				_id : profile.id
			}, function(err, user){
				if(err){
					return done(err);
				}
				if(!user){
					user = new User({
						_id : profile.id,
						name : profile._json.name,
						kakao_token : "",
						options : {
							feature_lock : false,
							vibration : false,
							flash : false,
							tts : {
								value : false,
								text : ""
							},
							alarm : false
						}
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
			})

		}))
}
module.exports = init;
