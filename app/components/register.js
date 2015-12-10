var React = require("react");
var ReactRouter = require("react-router");
var History = ReactRouter.History;

var auth = require("./auth.js");

// Register page, shows the registration form and redirects to the list if login is successful
var Register = React.createClass({
  // mixin for navigation
  mixins: [ History ],

  // initial state
  getInitialState: function() {
    return {
      // there was an error registering
      error: false
    };
  },

  // handle regiser button submit
  register: function(event) {
    // prevent default browser submit
    event.preventDefault();
    // get data from form
    var firstname = this.refs.firstname.value;
    var lastname = this.refs.lastname.value;
    var username = this.refs.username.value;
    var password = this.refs.password.value;
    var email = this.refs.email.value;
    var phone = this.refs.phone.value;
    if (!firstname || !username || !password || !lastname || !email || !phone) {
      return;
    }
    // register via the API
    auth.register(firstname, lastname, username, password, email, phone, function(loggedIn) {
      // register callback
      if (!loggedIn)
        return this.setState({
          error: true
        });
      this.history.pushState(null, '/list');
    }.bind(this));
  },

  // show the registration form
  render: function() {
    return (
      <div>
        <h2>Register</h2>
        <form className="form-vertical" onSubmit={this.register}>
          <p>
          <input type="text" placeholder="First Name" ref="firstname" autoFocus={true} />
          <input type="text" placeholder="Last Name" ref="lastname" />
          </p>
          <p>
          <input type="text" placeholder="Username" ref="username"/>
          <input type="password" placeholder="Password" ref="password"/>
          </p>
          <p>
          <input type="email" placeholder="Email" ref="email"/>
          <input type="tel" placeholder="Telephone Number" ref="phone"/>
          </p>
          <p>
          <input className="btn" type="submit" value="Register" />
          </p>
          {this.state.error ? (
             <div className="alert">Invalid username or password.</div>
           ) : null }
        </form>
      </div>
    );
  }
});

module.exports = Register;
