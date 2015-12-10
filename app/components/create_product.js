// ----- Product Page Start -------------------------------------------**********

var React = require("react");
var ReactRouter = require("react-router");

var Link = ReactRouter.Link;
var History = ReactRouter.History;

require('react-photoswipe/lib/photoswipe.css');

var PhotoSwipe = require('react-photoswipe');
var PhotoSwipeGallery = PhotoSwipe.PhotoSwipeGallery;

var Dropzone = require('react-dropzone');
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

var ProductForm = React.createClass({
  componentWillMount: function() {
    for (var key in this.props.data){
      this.setState({[key]: this.props.data[key]});
    }
    /*this.setState({
      likesIncreasing: nextProps.likeCount > this.props.likeCount
    });*/
  },

  getInitialState: function() {
    return {};
  },
  handleFormSubmit: function(form) {

  }, 
  handleChildStateChange: function(change){
    for (var key in change){
      this.setState({[key]: change[key]});
    }
  },

  render: function() {
    return (
      <div>
          <ProductPanel onStateChange={this.handleChildStateChange} data={data} />
          <ImagePanel data={data} />
          <PricePanel data={data} />
          <AnotherPanel data={data} />
          <PostListingPanel onFormSubmit={this.handleFormSubmit} data={this.props.data} />
      </div>
      )
  }
});

var ProductPanel = React.createClass({

  getInitialState: function() {
    return {title: this.props.data.title,
            category: this.props.data.category,
            description: this.props.data.description};
  },
  handleTitleChange: function(e) {
    this.setState({title: e.target.value});
    this.props.onStateChange({title: e.target.value})
  },
  handleCategoryChange: function(e) {
    this.setState({category: e.target.value});
    this.props.onStateChange({category: e.target.value})
  },
  handleDescriptionChange: function(e) {
    this.setState({description: e.target.value});
    this.props.onStateChange({description: e.target.value})
  },

  render: function() {
    return (
      <div className="panel panel-default product-panel">
        <div className="panel-heading">
          <h3 className="panel-title">New Product to Yap</h3>
        </div>
        <div className="panel-body">
        <div className="form-group">
            <input type="text" className="form-control" value={this.state.title} onChange={this.handleTitleChange} placeholder="Title" />
            <br />
            <label htmlFor="category">Category</label>
            <select className="form-control" id="category" value={this.state.category} onChange={this.handleCategoryChange}>
              <option>Apparel & Accessories</option>
              <option>Electronics</option>
              <option>Beauty & Health</option>
              <option>Handmade</option>
              <option>Events</option>
              <option>Local</option>
            </select>
            <br />
            <textarea className="form-control" rows="3" placeholder="Description" value={this.state.description} onChange={this.handleDescriptionChange}></textarea>
          </div>
        </div>
      </div>
      )
  }
});

var PostListingPanel = React.createClass({


  getInitialState: function() {
    return {checkbox: this.props.data.checkbox};
  },
  handleChange: function(e) {
    this.setState({checkbox: e.target.checked});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var checkbox = this.state.checkbox;
    this.props.onFormSubmit({checkbox: checkbox});
  }, 

  render: function() {
    return (
      <div className="col-sm-12 panel panel-default product-panel">
        <div className="panel-body center">
        <form onSubmit={this.handleSubmit}>
          <div className="checkbox">
            <label>
              <input checked={this.state.checkbox} value={this.state.valuecheckbox} type="checkbox" onChange={this.handleChange}> Agree to terms and conditions </input>
            </label>
          </div>
          <button type="submit" className="btn btn-primary">Post Product Yap</button>
        </form>
        </div>
      </div>
      )
  }
});

var ImagePanel = React.createClass({
  onDrop: function (files) {
    console.log('Received files: ', files);
  },
  onOpenClick: function () {
    this.refs.dropzone.open();
  },
  render: function() {
    var style = {
        backgroundColor: '#C3EFFF',
        borderColor: '#A8DEFF',
    }
    return (
      <Dropzone className="col-sm-12 panel panel-default dropzone-panel" activeStyle={style} ref="dropzone" onDrop={this.onDrop}>
        <div className="panel-body center">Drop or Click to Add Product Images</div>
      </Dropzone>
      )
  }
});

var PricePanel = React.createClass({
  render: function() {
    return (
      <div className="col-sm-6 panel panel-default product-panel price-panel">
        <div className="panel-body">
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-addon">$</div>
              <input type="text" className="form-control" id="highprice" placeholder="High Price" />
              <div className="input-group-addon">.00</div>
            </div>
            <br />
            <div className="input-group">
              <div className="input-group-addon">$</div>
              <input type="text" className="form-control" id="lowprice" placeholder="Low Price" />
              <div className="input-group-addon">.00</div>
            </div>
            <br />
            <label htmlFor="duration">Followers for lowest price</label>
            <select className="form-control" id="max-followers">
              <option>100 Followers</option>
              <option>1000 Followers</option>
              <option>10000 Followers</option>
              <option>100000 Followers</option>
            </select>

          </div>
        </div>
      </div>
      )
  }
});



var AnotherPanel = React.createClass({
  render: function() {
    return (
      <div className="col-sm-5 col-sm-offset-1 panel panel-default product-panel buy-panel">
        <div className="panel-body">
          <div className="form-group">
              <label htmlFor="duration">How long will the post last?</label>
              <select className="form-control" id="category">
                <option>1 Day</option>
                <option>1 Week</option>
                <option>2 Weeks</option>
                <option>1 Month</option>
                <option>3 Months (only for yap store)</option>
              </select>
              <br /> 
              <label htmlFor="duration">How many are for sale?</label>
              <input type="text" className="form-control" id="quantity" placeholder="Quantity" />
          </div>
        </div>
      </div>
      )
  }
});

var data =
  {id: 1, title: "", description:"", 
  category: "Apparel & Accessories", priceInfo: "Here is some price info.", checkbox: false};

var CreateProduct = React.createClass({
  render: function() {
    return (
      <div>
        <ProductForm data={data} />
      </div>
    );
  }
});

module.exports = CreateProduct;