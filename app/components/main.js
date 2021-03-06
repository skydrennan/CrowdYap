var React = require("react");
var ReactDOM = require('react-dom');
var ReactRouter = require("react-router");

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var App = require("./app.js");
var Product = require("./product.js");
var CreateProduct = require("./create_product.js");
var Checkout = require("./checkout.js");
var Login = require("./login.js");
var Register = require("./register.js");
var Home = require("./home.js");
var news_feed = require("./news_feed.js");

//window.jQuery = window.$ = require("../../node_modules/jquery/dist/jquery");
require("../../node_modules/bootstrap/dist/js/bootstrap.min.js");
require("../../node_modules/bootstrap/dist/css/bootstrap.min.css");
require("../css/app.css");
require("../css/product-page.css");

var routes = (
  <Router>
    <Route name="app" path="/" component ={App}>
      <IndexRoute component = {Home} />
      <Route name="product" path="/product/:id" component={Product} />
      <Route name="create_product" path="create_product" component={CreateProduct} />
      <Route name="checkout" path="checkout" component={Checkout} />
      <Route className="right" name="login" path="/login" component={Login} />
      <Route className="right" name="register" path="/register" component={Register} />
      <Route name="news_feed" path="/news_feed" component={news_feed} />
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('content'));
