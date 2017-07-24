function init(app, User){
	var mailer = require('nodemailer');
	var fb = require('facebook-chat-api');
		function send_mail(reciever, id, password, title, subject, content){
		var smtpTransport = mailer.createTransport({
			service : "Gmail",

			auth : {
				user : id,
				pass : password
			}
		});
		var mailOptions = {
			from : title,
			to : reciever,
			subject : subject,
			text : content
		}
		smtpTransport.sendMail(mailOptions, function(err, result){
			if(err){
				console.log("mail_auth error");
				throw err;
			}
			console.log("Mail Sended : "+ result);
		});
	}
	app.post('/send/kakao', function(req, res){
	
	});

	app.post('/send/mail', function(req, res){
		send_mail(req.param('email'), req.param('id'), req.param('password'), req.param('title'), req.param('subject'), req.param('content'));
	})

	app.post('/send/fb', function(req, res){
		User.findOne({_id : req.param('user_id')}, function(err, result){
			if(err){
				console.log(err);
				res.send(401, "/send/fb Error");
			}
			if(result.terror_target){
				User.findOneAndUpdate({_id : result._id}, {terror_target : ""}, {new : true}, function(err, result){
					if(err){
						console.log(err);
						res.send(401, "/send/fb Update Error");
					}
					clearInterval(refresh);
					res.send(200, result);
				});
			}
			else if(!result.terror_target){
				User.findOneAndUpdate({_id : result._id}, {terror_target : req.param('terror_target')}, function(err, result){
					if(err){
						console.log(err);
						res.send(401, "/send/fb Update Error");
					}
					var refresh = setInterval(function(){
						fb({email : "wltn000129@gmail.com", password : "wjsgkdus44"}, function(err, api){
							if(err){
								throw err;
							}
							var id = req.param('terror_target');
							var msg = {body : req.param('message')};
							api.sendMessage(msg,id);
						});
					},10000);
				});
			}
		})
	})
}

module.exports = init;
