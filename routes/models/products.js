var mongoose = require('mongoose');

module.exports = mongoose.model('Product', {

	customerName: {type : String, default: ''},
	orderTime: { type: Date, default: Date.now },
	customerEmail: {type : String, default: ''},
	productName : {type : String, default: ''},
	productPrice : {type : Number, default: 0.0}

});
