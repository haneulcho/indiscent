var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./api/routes/index');
var applicationRoutes = require('./api/routes/application');
var orderRoutes = require('./api/routes/order');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

require('./api/lib/connection');

app.use('/order', orderRoutes);
app.use('/application', applicationRoutes);
app.use('/', routes);

app.listen(port, function () {
	console.log("Server is listening on port 3000");
});
