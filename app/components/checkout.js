var React = require("react");
var ReactRouter = require("react-router");

var Link = ReactRouter.Link;

// Home page, which shows Login and Register buttons

var Checkout = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Checkout</h1>
        <p>Buy the product page.</p>

      </div>
    );
  }
});

module.exports = Checkout;
