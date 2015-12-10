var app = require('./express.js');
var Product = require('./product.js');
var User = require('./user.js');

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

// setup body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//
// API
//

// register a user
app.post('/api/users/register', function (req, res) {
  // find or create the user with the given username
  User.findOrCreate({username: req.body.username}, function(err, user, created) {
    if (created) {
      // if this username is not taken, then create a user record
      user.name = req.body.name;
      user.set_password(req.body.password);
      user.save(function(err) {
	if (err) {
	  res.sendStatus("403");
	  return;
	}
        // create a token
	var token = User.generateToken(user.username);
        // return value is JSON containing the user's name and token
        res.json({firstname: user.firstname, token: token});
      });
    } else {
      // return an error if the username is taken
      res.sendStatus("403");
    }
  });
});

// login a user
app.post('/api/users/login', function (req, res) {
  // find the user with the given username
  User.findOne({username: req.body.username}, function(err,user) {
    if (err) {
      res.sendStatus(403);
      return;
    }
    // validate the user exists and the password is correct
    if (user && user.checkPassword(req.body.password)) {
      // create a token
      var token = User.generateToken(user.username);
      // return value is JSON containing user's name and token
      res.json({name: user.name, token: token});
    } else {
      res.sendStatus(403);
    }
  });
});
