var React = require("react");
var ReactRouter = require("react-router");

var Link = ReactRouter.Link;
var History = ReactRouter.History;

require("../../node_modules/bootstrap/dist/css/bootstrap.min.css");
require("../../node_modules/bootstrap/dist/js/bootstrap.min.js");

var App = React.createClass({
  mixins: [ History ],

  render: function() {
    return (
      <div>
        <nav className="navbar navbar-default" role="navigation">
          <div className="container">
              <div className="navbar-header">
                 <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                   <span className="sr-only">Toggle navigation</span>
                   <span className="icon-bar"></span>
                   <span className="icon-bar"></span>
                   <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="/">CrowdYap</a>
              </div>
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                  <li><Link to="create_product">Create Product</Link></li>
                  <li><Link to="product">Example Listing</Link></li>
		  <li><Link to="user">Manage Profile</Link></li>
                </ul>
              </div>
            </div>
        </nav>

        <div className="container yap-container">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = App;
