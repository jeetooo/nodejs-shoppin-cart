var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/', function(req, res, next) {
	Product.find(function(err, products){
		productChunks = [];
		chunkSize = 3;
		for (var i = 0; i < products.length; i += 3){
			productChunks.push(products.slice(i, i + chunkSize));
		}
		res.render('shop/index', { title: 'Shopping Cart', products: productChunks });
	});
});

router.get('/user/signup/', function(req, res, next) {
	res.render('user/signup', { title: 'Signup', csrfToken: req.csrfToken() });
});

router.post('/user/signup/', function(req, res, next) {
	res.redirect('/');
});

module.exports = router;
