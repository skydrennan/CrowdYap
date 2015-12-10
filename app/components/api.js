var $ = require("jquery");

// API object
var api = {
  // add an item, call the callback when complete
  addProduct: function(title, cb) {
    var url = "/api/product";
    $.ajax({
      url: url,
      contentType: 'application/json',
      data: JSON.stringify({
        item: {
          'title': title
        }
      }),
      type: 'POST',
      headers: {'Authorization': localStorage.token},
      success: function(res) {
        if (cb)
          cb(true, res);
      },
      error: function(xhr, status, err) {
        // if there is an error, remove the login token
        delete localStorage.token;
        if (cb)
          cb(false, status);
      }
    });

  }

  

module.exports = api;