var config = (process.env.NODE_ENV == 'production') ? require('../config/config') : require('../config/config.dev');
var mongoose = require('mongoose');
var db = mongoose.connection;

mongoose.Promise = global.Promise;

db.on('error', function () {
	console.log('통신 오류가 발생했습니다!');
});

if (process.env.NODE_ENV == 'production') {
	console.log('프로덕션 모드 접속 완료!');
} else {
	console.log('개발 모드 접속 완료!');
}

mongoose.connect(config.mongoDB.dbUrl, function (err) {
	if (err) {
		return console.log('데이터베이스에 접속하는 중 문제가 발생했습니다!' + err);
	}
	console.log('데이터베이스 접속 성공!');
});

process.on('SIGINT', function () {
	db.close(function () {
		console.log('데이터베이스 접속이 해제되었습니다.');
		process.exit(0);
	});
});