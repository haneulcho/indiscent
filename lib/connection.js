var mongoose = require('mongoose');
var config = (process.env.NODE_ENV == 'production') ? require('../config/config') : require('../config/config.dev');

var dbUrl = config.mongoDB.dbUrl;

mongoose.connect(dbUrl, function (err) {
	if (err) {
		return console.log('데이터베이스에 접속하는 중 문제가 발생했습니다!' + err);
	}
	console.log('데이터베이스 접속 성공!');
});

process.on('SIGINT', function () {
	mongoose.connection.close(function () {
		console.log('데이터베이스 접속이 해제되었습니다.');
		process.exit(0);
	});
});
