// ----- Product Page Start -------------------------------------------**********

var React = require("react");
var ReactRouter = require("react-router");

var Link = ReactRouter.Link;
var History = ReactRouter.History;

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

var options = {
  //http://photoswipe.com/documentation/options.html
};

getThumbnailContent = (item) => {
  return (
    <img src={item.thumbnail} width={120} height={90}/>
  );
}



var ProductGallery = React.createClass({
  render: function() {
    return (
      //<p>Hello World</p>
      <PhotoSwipeGallery items={items} options={options} thumbnailContent={getThumbnailContent}/>
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