// ----- Product Page Start -------------------------------------------**********

var React = require("react");
var ReactRouter = require("react-router");

var Link = ReactRouter.Link;
var History = ReactRouter.History;


var api = require("./api.js");

require("../css/product-page.css");

require('react-photoswipe/lib/photoswipe.css');

var PhotoSwipe = require('react-photoswipe');
var PhotoSwipeGallery = PhotoSwipe.PhotoSwipeGallery;
//import {PhotoSwipeGallery} from 'react-photoswipe';

var items = [
  {
    src: 'http://lorempixel.com/1200/900/sports/1',
    thumbnail: 'http://lorempixel.com/120/90/sports/1',
    w: 1200,
    h: 900,
    title: 'Image 1'
  },
  {
    src: 'http://lorempixel.com/1200/900/sports/2',
    thumbnail: 'http://lorempixel.com/120/90/sports/2',
    w: 1200,
    h: 900,
    title: 'Image 2'
  }
];

getThumbnailContent = (item) => {
  return (
    <img src={item.thumbnail} width={120} height={90}/>
  );
}



var ProductGallery = React.createClass({
  render: function() {
    return (
      //<p>Hello World</p>
      <PhotoSwipeGallery items={items} thumbnailContent={getThumbnailContent}/>
      )
  }
});

var ProductPanel = React.createClass({
  render: function() {
    return (
      <div className="panel panel-default product-panel">
        <div className="panel-heading">
          <h1 className="panel-title">{this.props.product.title}</h1>
        </div>
        <div className="panel-body">
          <ProductGallery />
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
          {this.props.product.description}
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
    //this.context.router.transitionTo('product/1', {id:1});
    this.history.pushState('checkout');
    //this.history.pushState(null, 'product/1', {id:1});
  },
  render: function() {
    return (
      <div className="col-sm-6 panel panel-default product-panel price-panel">
        <div className="panel-body center">
          <h2>${this.props.product.currentPrice}.00 <small>Current Price</small></h2>
          <button onClick={this.buyNowClick} type="button" className="btn btn-primary">Buy Now</button><h4> {this.props.product.quantity} <small>Remaining </small></h4>
          <h3>{this.props.product.followerCount} <small>People Following</small></h3>
          <button onClick={this.followClick} type="button" className="btn btn-primary">Follow</button>
        </div>
      </div>
      )
  }
});

var BuyPanel = React.createClass({
  render: function() {
    return (
      <div className="col-sm-5 col-sm-offset-1 panel panel-default product-panel buy-panel">
        <div className="panel-body center">

          <h3>Seller: <small>{this.props.product.seller}</small></h3>
          <h4>{this.props.product.lowPriceFollowers} <small>and the price will drop to</small> ${this.props.product.lowPrice}.00</h4>
          {this.props.product.sellerInfo}
        </div>
      </div>
      )
  }
});

var data =
  {id: 1, title: "This is a temp Item Title", description:"Here is the description.", 
  sellerInfo: "Here is some seller info.", priceInfo: "Here is some price info."};

var Product = React.createClass({  
  mixins: [ History ],
  getInitialState: function() {
    return {
      product: {
      }
    };
  },
  componentDidMount: function(){
    var id = this.props.params.id
    api.getProduct(id, this.loadProduct);
  }, 
  loadProduct: function(status, data){
    if (status) {
      this.setState({
        product: data.product
      });
    } else {
      this.history.pushState(null, '/');
    }
  },
  render: function() {
    return (
      <div>
        <ProductPanel product={this.state.product} />
        <PricePanel product={this.state.product} />
        <BuyPanel product={this.state.product} />
        <DescriptionPanel product={this.state.product} />
      </div>
    );
  }
});

module.exports = Product;