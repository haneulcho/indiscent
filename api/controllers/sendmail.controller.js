var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = (process.env.NODE_ENV == 'production') ? require('../config/config') : require('../config/config.dev');

exports.admin = function (order) {
	if (process.env.NODE_ENV == 'production') {
		var smtpTransport = nodemailer.createTransport(smtpTransport ({
			service: 'Gmail',
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: config.webMail.user,
				pass: config.webMail.pass
			},
			tls: {
				// do not fail on invalid certs
				rejectUnauthorized: false
			}
		}));
		
		var mailOptions = {
			from: config.webMail.from,
			to: config.webMail.to
		};

		mailOptions.subject = '[인디센트 상담 신청] ' + req.body.name + '님'
		mailOptions.html = '';
		mailOptions.html += '이름: ' + req.body.name + '<br>';
		mailOptions.html += '휴대폰: ' + req.body.hp + '<br>';
		mailOptions.html += '지역: ' + req.body.address + '<br><br>';
		mailOptions.html += '베이스 향: ' + req.body.base + '<br>';
		mailOptions.html += '가장 좋아하는 향(테마): ' + req.body.love_theme_first + '<br>';
		mailOptions.html += '두번째 친숙하게 느끼는 향(테마): ' + req.body.love_theme_second + '<br>';
		if (req.body.hate_theme) {
			mailOptions.html += '비선호, 싫어하는 향(테마): ' + req.body.hate_theme + '<br><br>';
		}
		mailOptions.html += '향수에 넣고 싶은 원료 3가지: ' + req.body.love_ingre + '<br>';
		if (req.body.hate_ingre) {
			mailOptions.html += '비선호 원료: ' + req.body.hate_ingre + '<br>';
		}

		smtpTransport.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log("메시지 전송 완료: " + info.messageId, info.response);
			}
			smtpTransport.close();
		});
	} else {
		console.log('개발 모드로 이메일 전송을 하지 않습니다.');
	}
};
