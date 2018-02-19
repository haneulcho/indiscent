var express = require('express');
var mongoose = require('mongoose');
var Order = require('../models/order');
var Theme = require('../models/theme');
var Ingredient = require('../models/ingredient');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = (process.env.NODE_ENV == 'production') ? require('../config/config') : require('../config/config.dev');

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

var mailOptions = {};
mailOptions = {
	from: config.webMail.from,
	to: config.webMail.to
};

var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('application/step1', { title: '[Indiscent 무료 상담 신청 :: 1. 향기 베이스 선택]' });
});

// 베이스
router.get('/step1', function (req, res, next) {
  res.render('application/step1', { title: '[Indiscent 무료 상담 신청 :: 1. 향기 베이스 선택]' });
});

// 테마
router.get('/step2', function (req, res, next) {
  Theme.find(function (err, docs) {
    res.render('application/step2', { title: '[Indiscent 무료 상담 신청 :: 2. 향기 테마 선택 1]', themes: docs });
  });
});

// 테마
router.get('/step3', function (req, res, next) {
  Theme.find(function (err, docs) {
    res.render('application/step3', { title: '[Indiscent 무료 상담 신청 :: 3. 향기 테마 선택 2]', themes: docs });
  });
});

// 테마
router.get('/step4', function (req, res, next) {
  Theme.find(function (err, docs) {
    res.render('application/step4', { title: '[Indiscent 무료 상담 신청 :: 4. 비선호 향기 선택]', themes: docs });
  });
});

// 선호 원료 3가지
router.get('/step5', function (req, res, next) {
  Ingredient.find(function (err, docs) {
    res.render('application/step5', { title: '[Indiscent 무료 상담 신청 :: 5. 향수 원료 선택]', ingredients: docs });
  });
});

// 비선호 원료
router.get('/step6', function (req, res, next) {
  Ingredient.find(function (err, docs) {
    res.render('application/step6', { title: '[Indiscent 무료 상담 신청 :: 6. 비선호 원료 선택]', ingredients: docs });
  });
});

// 개인정보 입력
router.get('/step7', function (req, res, next) {
  res.render('application/step7', { title: '[Indiscent 무료 상담 신청 :: 7. 개인 정보 입력]' });
});

// 최종 완료
router.post('/complete', function (req, res) {
  var order = new Order();

  order.name = req.body.name;
  order.isEarlyBird = true;
  order.hp = req.body.hp;
  order.address = req.body.address;
  order.base = req.body.base;
  order.love_theme.first = req.body.love_theme_first;
  order.love_theme.second = req.body.love_theme_second;
  order.hate_theme = req.body.hate_theme;
  order.love_ingre = req.body.love_ingre;
  order.hate_ingre = req.body.hate_ingre;

  order.save(function(err) {
    if (err) {
      res.json({result: 0, errors: err});
      return;
    }
    res.json({result: 1});

    if (process.env.NODE_ENV == 'production') {
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
  
      smtpTransport.sendMail(mailOptions, function(error, info) {
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
  });
});

module.exports = router;
