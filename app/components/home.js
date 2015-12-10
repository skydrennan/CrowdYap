var React = require("react");
var ReactRouter = require("react-router");

var Link = ReactRouter.Link;

// Home page, which shows Login and Register buttons
var Home = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Welcome to CrowdYap</h1>
        <p>We are your one-stop site for social buying.</p>
        <p>Let's get started! Choose login or register from above to continue.</p>
      </div>
    );
  }
});

module.exports = Home;
