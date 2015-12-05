// ----- Product Page Start -------------------------------------------**********

var React = require("react");
var ReactRouter = require("react-router");

var Link = ReactRouter.Link;
var History = ReactRouter.History;

require("../css/product-page.css");


var ProductGallery = React.createClass({
  render: function() {
    return (
      <div className="pswp" tabIndex="-1" role="dialog" aria-hidden="true">

          <div className="pswp__bg"></div>

          <div className="pswp__scroll-wrap">

              <div className="pswp__container">
                  <div className="pswp__item"></div>
                  <div className="pswp__item"></div>
                  <div className="pswp__item"></div>
              </div>

              <div className="pswp__ui pswp__ui--hidden">

                  <div className="pswp__top-bar">

                      <div className="pswp__counter"></div>

                      <button className="pswp__button pswp__button--close" title="Close (Esc)"></button>

                      <button className="pswp__button pswp__button--share" title="Share"></button>

                      <button className="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

                      <button className="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

                      <div className="pswp__preloader">
                          <div className="pswp__preloader__icn">
                            <div className="pswp__preloader__cut">
                              <div className="pswp__preloader__donut"></div>
                            </div>
                          </div>
                      </div>
                  </div>

                  <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                      <div className="pswp__share-tooltip"></div> 
                  </div>

                  <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                  </button>

                  <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                  </button>

                  <div className="pswp__caption">
                      <div className="pswp__caption__center"></div>
                  </div>

              </div>

          </div>

      </div>
      )
  }
});

var ProductPanel = React.createClass({
  render: function() {
    return (
      <div className="panel panel-default product-panel">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.data.title}</h3>
        </div>
        <div className="panel-body">
          <ProductGallery />
          Panel content
          <br /><br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br /><br />
        </div>
      </div>
      )
  }
});

var DescriptionPanel = React.createClass({
  render: function() {
    return (
      <div className="col-sm-12 panel panel-default product-panel">
        <div className="panel-body">
          {this.props.data.description}
        </div>
      </div>
      )
  }
});

var PricePanel = React.createClass({
  mixins: [ History ],
  followClick: function(index) {
    event.preventDefault();
    alert("You are now following this product!");
  },
  buyNowClick: function(index) {
    event.preventDefault();
    //this.refs.userInput.getDOMNode().value = '';
    this.history.pushState(null, 'checkout');
  },
  render: function() {
    return (
      <div className="col-sm-6 panel panel-default product-panel price-panel">
        <div className="panel-body">
          {this.props.data.priceInfo}
          <br />

          
          <button onClick={this.followClick} type="button" className="btn btn-primary">Follow</button>
          <button onClick={this.buyNowClick} type="button" className="btn btn-primary">Buy Now</button>
        </div>
      </div>
      )
  }
});

var BuyPanel = React.createClass({
  render: function() {
    return (
      <div className="col-sm-5 col-sm-offset-1 panel panel-default product-panel buy-panel">
        <div className="panel-body">
          {this.props.data.sellerInfo}
        </div>
      </div>
      )
  }
});

var data =
  {id: 1, title: "This is a temp Item Title", description:"Here is the description.", 
  sellerInfo: "Here is some seller info.", priceInfo: "Here is some price info."};

var Product = React.createClass({
  render: function() {
    return (
      <div>
        <ProductPanel data={data} />
        <PricePanel data={data} />
        <BuyPanel data={data} />
        <DescriptionPanel data={data} />
      </div>
    );
  }
});

module.exports = Product;