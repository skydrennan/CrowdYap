var app = require('./express.js');
var Product = require('./product.js');
var User = require('./user.js');


// setup body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// add an product
app.post('/api/product', function (req,res) {
  user = User.verifyToken(req.headers.authorization, function(user) {
    if (user) {
      Product.create({
  		  title: req.body.product.title,
  		  duration: req.body.product.duration,
  		  category: req.body.product.category,
  		  description: req.body.product.description,
  		  highPrice: req.body.product.highPrice,
  		  lowPrice: req.body.product.lowPrice,
  		  lowPriceFollowers: req.body.product.lowPriceFollowers,
        seller: user.id,
  		  quantity: req.body.product.quantity}, function(err,product) {
        	if (err) {
        	  res.sendStatus(403);
        	  return;
        	}
          res.json(product.id);
      });
    } else {
      res.sendStatus(403);
    }
  });
});

app.get('/api/product/:id', function (req,res) {
  // validate the supplied token
  user = User.verifyToken(req.headers.authorization, function(user) {
    if (user) {
      Product.findById(req.params.id, function(err, product) {
        if (err) {
          res.sendStatus(403);
          return;
        }
        productObj = product.toObject();
        productObj.currentPrice = productObj.highPrice;
        productObj.followerCount = "0";
        productObj.seller = user.username;
        res.json({product:productObj});
      });
    } else {
      res.sendStatus(403);
    }
  });
});

app.get('/api/products', function(req,res) {

    Product.find({}, function(err, products) {
      if(err) {
        res.sendStatus(403);
        return;
      }
    });
      // return value is the list of products as JSON
      res.json({products: products});
});


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
