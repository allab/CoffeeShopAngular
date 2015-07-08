var express = require('express');
var router = express.Router();
var Product = require('./models/products');


function getProducts(res){
	console.log('getProducts');
	Product.find(function(err, products) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(products); // return all products in JSON format
		});
	};


router.get('/', function(req, res, next) {
  	console.log('router.getProducts');
		// use mongoose to get all products in the database
		getProducts(res);
	});

	// create product and send back all products after creation
	router.post('/', function(req, res) {
		console.log('router.getProducts');
console.log('reqL',req.body);
		// create a product, information comes from AJAX request from Angular
		Product.create({
			customerName: req.body.customerName,
			customerEmail:req.body.customerEmail,
			productName : req.body.name,
			productPrice :req.body.price,
			done : false
		}, function(err, product) {
			if (err)
				res.send(err);

				// get and return all the todos after you create another
		            Product.find(function(err, products) {
		                if (err)
		                    res.send(err)
		                res.json(products);
		            });
		});
	});


	// delete a product
	router.delete('/:product_id', function(req, res, next) {
    console.log('router.deleteProducts');

		Product.remove({
			_id : req.params.product_id
		}, function(err, product) {
			if (err)
				res.send(err);

			getProducts(res);
		});
	});



	router.get('*', function(req, res) {
		console.log('th');
	        res.sendFile('../public/partials/pick.html'); // load the single view file (angular will handle the page changes on the front-end)
	    			});

		router.get('*', function(req, res) {
				console.log('thi');
				res.sendFile('../public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
			});

module.exports = router;
