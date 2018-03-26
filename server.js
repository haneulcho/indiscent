var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./server/routes/index');
var applicationRoutes = require('./server/routes/application');
var orderRoutes = require('./server/routes/order');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

require('./api/lib/connection');

app.use('/order', orderRoutes);
app.use('/application', applicationRoutes);
app.use('/', routes);

app.listen(port, function () {
	console.log("Server is listening on port 8080");
});
