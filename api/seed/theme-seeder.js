var Theme = require('../models/theme');
var mongoose = require('mongoose');
var config = (process.env.NODE_ENV == 'production') ? require('../config/config') : require('../config/config.dev');
require(process.cwd() + '/api/lib/connection');

var defaultImgPath = config.web.url + '/imgs/themes/';

var themes = [
	new Theme({
		no: 1,
		name: 'Citrus',
		ingredients: ['Bergamot', 'Tangerines'],
		imagePath: defaultImgPath + '1_citrus.png'
	}),
	new Theme({
		no: 2,
		name: 'Fruity',
		ingredients: ['Currant', 'Plums', 'Raspberry'],
		imagePath: defaultImgPath + '2_fruity.png'
	}),
	new Theme({
		no: 3,
		name: 'Floral',
		ingredients: ['Freesia', 'Mimosa', 'Pioney', 'Star Magnolie', 'Tulip', 'Violet Green'],
		imagePath: defaultImgPath + '3_floral.png'
	}),
	new Theme({
		no: 4,
		name: 'Watery',
		ingredients: ['Marine'],
		imagePath: defaultImgPath + '4_watery.png'
	}),
	new Theme({
		no: 5,
		name: 'Green',
		ingredients: ['Leafy Green'],
		imagePath: defaultImgPath + '5_green.png'
	}),
	new Theme({
		no: 6,
		name: 'Herbal',
		ingredients: ['Phytoncide'],
		imagePath: defaultImgPath + '6_herbal.png'
	}),
	new Theme({
		no: 7,
		name: 'Woody',
		ingredients: ['Sandalwood'],
		imagePath: defaultImgPath + '7_woody.png'
	}),
	new Theme({
		no: 8,
		name: 'Musk',
		ingredients: ['White Musk'],
		imagePath: defaultImgPath + '8_musk.png'
	})
];

var done = 0;
for (var i = 0; i < themes.length; i++) {
	themes[i].save(function (err, result) {
		if (err) {
			return handleError(err);
		} else {
			done++;
			if (done === themes.length) {
				exit();
			}
		}
	});
}

function exit() {
	mongoose.disconnect();
}
