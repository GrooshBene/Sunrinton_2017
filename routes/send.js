function init(app, User){
	var mailer = require('nodemailer');
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
}

module.exports = init;
