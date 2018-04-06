var Order = require('../models/order');
var mongoose = require('mongoose');
var config = (process.env.NODE_ENV == 'production') ? require('../config/config') : require('../config/config.dev');
require(process.cwd() + '/api/lib/connection');

var orders = [
	new Order({
		name: '김단비',
		gender: 'female',
		hp: '0488445659',
		address: '서울',
		base: 'rich',
		love_theme: {
			first: 'Musk',
			second: 'Fruity'
		},
		hate_theme: ['Watery'],
		love_ingre: ['Raspberry', 'Freesia', 'Star Magnolie'],
		hate_ingre: ['Marine']
	}),
	new Order({
		name: '박재석',
		hp: '01055960317',
		address: '서울',
		base: 'rich',
		love_theme: {
			first: 'Fruity',
			second: 'Musk'
		},
		hate_theme: ['Floral'],
		love_ingre: ['Tangerines', 'Bergamot', 'Currant']
	}),
	new Order({
		name: '이한결',
		hp: '01032112549',
		address: '동작구',
		base: 'fresh',
		love_theme: {
			first: 'Herbal',
			second: 'Green'
		},
		hate_theme: ['Floral'],
		love_ingre: ['Sandalwood', 'Leafy Green', 'Phytoncide'],
		hate_ingre: ['White Musk'],
	}),
	new Order({
		name: '김민찬',
		hp: '01099190205',
		address: '은평구',
		base: 'fresh',
		love_theme: {
			first: 'Citrus',
			second: 'Floral'
		},
		hate_theme: ['Herbal'],
		love_ingre: ['Tulip', 'Leafy Green', 'Violet Green']
	})
];

var done = 0;
for (var i = 0; i < orders.length; i++) {
	orders[i].save(function (err, result) {
		if (err) {
			return handleError(err);
		} else {
			done++;
			if (done === orders.length) {
				exit();
			}
		}
	});
}

function exit() {
	mongoose.disconnect();
}
