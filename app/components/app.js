var React = require("react");
var ReactRouter = require("react-router");

var Link = ReactRouter.Link;
var History = ReactRouter.History;

var auth = require("./auth.js");

require("../../node_modules/bootstrap/dist/css/bootstrap.min.css");
require("../../node_modules/bootstrap/dist/js/bootstrap.min.js");

var App = React.createClass({
  mixins: [ History ],

  // initial state
  getInitialState: function() {
    return {
      // the user is logged in
      loggedIn: auth.loggedIn()
    };
  },

  // callback when user is logged in
  setStateOnAuth: function(loggedIn) {
    this.setState({loggedIn:loggedIn});
    this.history.pushState(null, "/news_feed");
  },

  // when the component loads, setup the callback
  componentWillMount: function() {
    auth.onChange = this.setStateOnAuth;
  },

  // logout the user and redirect to home page
  logout: function(event) {
    auth.logout();
    this.history.pushState(null, '/');
  },

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
                {this.state.loggedIn ? (
                <Link to="/news_feed" className="navbar-brand">CrowdYap</Link>
              ) : (
                <a className="navbar-brand" href="/">CrowdYap</a>
              )}
              </div>
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              {this.state.loggedIn ? (
                <ul className="nav navbar-nav">
                  <li><Link to="create_product">Create Product</Link></li>
                  <li><Link to="product/123">Example Listing</Link></li>
                  <li><a href="#" onClick={this.logout}>Logout</a></li>
                </ul>
              ) : (<div></div>)}
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
