var app = require('./express.js');
var Product = require('./product.js');


// add an product
app.post('/api/product', function (req,res) {
  //user = User.verifyToken(req.headers.authorization, function(user) {
    //if (user) {
      // if the token is valid, create the item for the user
      Product.create({    	
		  title: req.body.product.title,
		  duration: req.body.product.duration,
		  category: req.body.product.category,
		  description: req.body.product.description,
		  highPrice: req.body.product.highPrice,
		  lowPrice: req.body.product.lowPrice,
		  lowPriceFollowers: req.body.product.followers,
		  quantity: req.body.product.quantity}, function(err,item) {
	if (err) {
	  res.sendStatus(403);
	  return;
	//}
      //});
    } else {
	  res.json({product:product});
      res.sendStatus(403);
    }
  });
});