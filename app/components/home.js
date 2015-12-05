var React = require("react");
var ReactRouter = require("react-router");

var Link = ReactRouter.Link;

// Home page, which shows Login and Register buttons
var Home = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Home</h1>
        <p>Put your home page here</p>

      </div>
    );
  }
});

module.exports = Home;
