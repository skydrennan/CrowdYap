var $ = require("jquery");

// API object
var api = {
  //gets items for the news_feed
  getProducts: function(cb) {
    var url = "/api/products";
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'GET',
      success: function(res) {
        if (cb)
          cb(true, res);
      },
      error: function(xhr, status, err) {
        // if there is an error, remove the login token
        //delete localStorage.token;
        if (cb)
          cb(false, status);
      }
    });
  },

  // add an item, call the callback when complete
  getProduct: function(id, cb) {
    var url = "/api/product/"+id;
    $.ajax({
      url: url,
      dataType: 'json',
      headers: {'Authorization': localStorage.token},
      type: 'GET',
      success: function(res) {
        if (cb)
          cb(true, res);
      },
      error: function(xhr, status, err) {
        delete localStorage.token;
        if (cb)
          cb(false, status);
      }
    });
  },

  followProduct: function(id, cb) {
    var url = "/api/follow-product/"+id;
    $.ajax({
      url: url,
      dataType: 'json',
      headers: {'Authorization': localStorage.token},
      type: 'PUT',
      success: function(res) {
        if (cb)
          cb(true, res);
      },
      error: function(xhr, status, err) {
        if (cb)
          cb(false, status);
      }
    });
  },

  addProduct: function(data, cb) {
    var url = "/api/product";
    $.ajax({
      url: url,
      contentType: 'application/json',
      data: JSON.stringify({
        product : data
      }),
      headers: {'Authorization': localStorage.token},
      type: 'POST',
      success: function(res) {
        if (cb)
          cb(true, res);
      },
      error: function(xhr, status, err) {
        delete localStorage.token;
        if (cb)
          cb(false, status);
      }
    });

  }
}

module.exports = api;
