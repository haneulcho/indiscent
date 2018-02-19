var config = {};

config.mongoDB = {};
config.web = {};
config.webMail = {};

config.web.url = 'http://localhost:3000';
config.mongoDB.dbUrl = 'mongodb://localhost:27017/application';
config.webMail.user = 'username@gmail.com';
config.webMail.pass = 'userpassword';
config.webMail.from = 'username <from@gmail.com>';
config.webMail.to = 'to@gmail.com';

module.exports = config;
