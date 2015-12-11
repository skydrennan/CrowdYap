var React = require("react");
var ReactRouter = require("react-router");

var Product = require("./product.js");

// List items component, shows the list of items
var NewsItems = React.createClass({
  // context so the component can access the router
  contextTypes: {
    location: React.PropTypes.object
  },
  // render the list of items
  render: function() {
    // get list of items to show, using the path to the current page
    var shown = this.props.products.filter(function(product) {
      switch (this.context.location.pathname) {
        default:
          return true;
      }
    }, this);

    // using the list of items, generate an Item element for each one
    var news = shown.map(function(product) {
      return (
        <Product key={product.id} product={product} reload={this.props.reload}/>
      );
    }.bind(this));

    // render the list
    return (
      <ul id="todo-list">
	{news}
      </ul>
    );
  }
});

module.exports = NewsItems;
