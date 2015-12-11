var React = require("react");
var ReactRouter = require("react-router");

//var ListHeader = require("./listheader.js");
//var ListEntry = require("./listentry.js");
var NewsItems = require("./newsitems.js");

var api = require("./api.js");
//var auth = require("./auth.js");

// List page, shows the todo list of items
var news_feed = React.createClass({
  // context so the component can access the router
  contextTypes: {
    location: React.PropTypes.object
  },

  // initial state
  getInitialState: function() {
    return {
      // list of products in the news feed
      products: [],
    };
  },

  // when the component loads, get the list items
  componentDidMount: function() {
    api.getProducts(this.productSet);
  },

  // reload the list of items
  reload: function() {
    api.getProducts(this.productSet);
  },

  // callback for getting the list of items, sets the list state
  productSet: function(status, data) {
    if (status) {
      // set the state for the list of items
      this.setState({
        products: data.products
      });
    }
  },

  // Show the list of items. This component has the following children: ListHeader, ListEntry and ListItems
  render: function() {
    return (
	<section id="main">
	  <NewsItems products={this.state.products} reload={this.reload}/>
	</section>
    );
  }
});

module.exports = news_feed;
