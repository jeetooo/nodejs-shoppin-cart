var express = require('express');
var router = express.Router();

var Product = require('../models/product');

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

module.exports = router;
