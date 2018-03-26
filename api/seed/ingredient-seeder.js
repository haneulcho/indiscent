var Ingredient = require('../models/ingredient');
var mongoose = require('mongoose');
var config = (process.env.NODE_ENV == 'production') ? require('../config/config') : require('../config/config.dev');
require(process.cwd() + '/lib/connection');

var defaultImgPath = config.web.url + '/imgs/ingredients/';

if (process.env.NODE_ENV == 'production') {
	console.log('프로덕션 모드 접속 완료!');
} else {
	console.log('개발 모드 접속 완료!');
}

var ingredients = [
	new Ingredient({
		no: 1,
		theme: 'Citrus',
		name: 'Bergamot',
		imagePath: defaultImgPath + '1_citrus_Bergamot.png',
		description: 'Bergamot에 대한 설명'
	}),
	new Ingredient({
		no: 2,
		theme: 'Citrus',
		name: 'Tangerines',
		imagePath: defaultImgPath + '1_citrus_Tangerines.png',
		description: 'Tangerines에 대한 설명'
	}),
	new Ingredient({
		no: 3,
		theme: 'Fruity',
		name: 'Currant',
		imagePath: defaultImgPath + '2_fruity_Currant.png',
		description: 'Currant에 대한 설명'
	}),
	new Ingredient({
		no: 4,
		theme: 'Fruity',
		name: 'Plums',
		imagePath: defaultImgPath + '2_fruity_Plums.png',
		description: 'Plums에 대한 설명'
	}),
	new Ingredient({
		no: 5,
		theme: 'Fruity',
		name: 'Raspberry',
		imagePath: defaultImgPath + '2_fruity_Raspberry.png',
		description: 'Raspberry에 대한 설명'
	}),
	new Ingredient({
		no: 6,
		theme: 'Floral',
		name: 'Freesia',
		imagePath: defaultImgPath + '3_floral_Freesia.png',
		description: 'Freesia에 대한 설명'
	}),
	new Ingredient({
		no: 7,
		theme: 'Floral',
		name: 'Mimosa',
		imagePath: defaultImgPath + '3_floral_Mimosa.png',
		description: 'Mimosa에 대한 설명'
	}),
	new Ingredient({
		no: 8,
		theme: 'Floral',
		name: 'Pioney',
		imagePath: defaultImgPath + '3_floral_Pioney.png',
		description: 'Pioney에 대한 설명'
	}),
	new Ingredient({
		no: 9,
		theme: 'Floral',
		name: 'Star Magnolie',
		imagePath: defaultImgPath + '3_floral_StarMagnolie.png',
		description: 'Star Magnolie에 대한 설명'
	}),
	new Ingredient({
		no: 10,
		theme: 'Floral',
		name: 'Tulip',
		imagePath: defaultImgPath + '3_floral_Tulip.png',
		description: 'Tulip에 대한 설명'
	}),
	new Ingredient({
		no: 11,
		theme: 'Floral',
		name: 'Violet Green',
		imagePath: defaultImgPath + '3_floral_VioletGreen.png',
		description: 'Violet Green에 대한 설명'
	}),
	new Ingredient({
		no: 12,
		theme: 'Watery',
		name: 'Marine',
		imagePath: defaultImgPath + '4_watery_Marine.png',
		description: 'Marine에 대한 설명'
	}),
	new Ingredient({
		no: 13,
		theme: 'Green',
		name: 'Leafy Green',
		imagePath: defaultImgPath + '5_green_LeafyGreen.png',
		description: 'Leafy Green에 대한 설명'
	}),
	new Ingredient({
		no: 14,
		theme: 'Herbal',
		name: 'Phytoncide',
		imagePath: defaultImgPath + '6_herbal_Phytoncide.png',
		description: 'Phytoncide에 대한 설명'
	}),
	new Ingredient({
		no: 15,
		theme: 'Woody',
		name: 'Sandalwood',
		imagePath: defaultImgPath + '7_woody_Sandalwood.png',
		description: 'Sandalwood에 대한 설명'
	}),
	new Ingredient({
		no: 16,
		theme: 'Musk',
		name: 'White Musk',
		imagePath: defaultImgPath + '8_musk_WhiteMusk.png',
		description: 'White Musk에 대한 설명'
	}),
];

var done = 0;
for (var i = 0; i < ingredients.length; i++) {
	ingredients[i].save(function (err, result) {
		if (err) {
			return handleError(err);
		} else {
			done++;
			if (done === ingredients.length) {
				exit();
			}
		}
	});
}

function exit() {
	mongoose.disconnect();
}
