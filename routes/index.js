var express = require('express');
var router = express.Router();

var Product = require('../models/product');
var Cart = require('../models/cart');

router.get('/', function(req, res, next) {
	var successMessage = req.flash("success")[0];
	Product.find(function(err, products){
		productChunks = [];
		chunkSize = 3;
		for (var i = 0; i < products.length; i += 3){
			productChunks.push(products.slice(i, i + chunkSize));
		}
		res.render('shop/index', { title: 'Shopping Cart', products: productChunks, successMessage: successMessage, noMessage: !successMessage});
	});
});

router.get('/add-to-cart/:id', function(req, res, next) {
	var productId = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});

	Product.findById(productId, function(err, product){
		if(err){
			return res.redirect('/');
		}
		cart.add(product, product.id);
		req.session.cart = cart;
		//console.log(req.session.cart);
		res.redirect('/');
	});
});

router.get('/shopping-cart', function(req, res, next) {
	if(!req.session.cart){
		return res.render('shop/shopping-cart', {products: null});
	}
	var cart = new Cart(req.session.cart);
	res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', function(req, res, next) {
	if(!req.session.cart){
		return res.render('/shopping-cart', {products: null});
	}
	var cart = new Cart(req.session.cart);
	var errMsg = req.flash("error")[0];
	res.render('shop/checkout', {products: cart.generateArray(), totalPrice: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/checkout', function(req, res, next) {
	if(!req.session.cart){
		return res.render('/shopping-cart', {products: null});
	}
	var cart = new Cart(req.session.cart);

	var stripe = require("stripe")(
	  "sk_test_W7i26YREGGHgfa2EaSH6ZXzP"
	);

	stripe.charges.create({
	  amount: cart.totalPrice * 100,
	  currency: "usd",
	  source: req.body.stripeToken, // obtained with Stripe.js
	  description: "Charge for stripe testing"
	}, function(err, charge) {
	  if(err){
	  	req.flash("error", err.message);
	  	return res.redirect("/checkout");
	  }
	  req.flash("success", "Successfully bought product!");
	  req.session.cart = null;
	  res.redirect("/");
	});

});

module.exports = router;
