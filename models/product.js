
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var findOrCreate = require('mongoose-findorcreate')

var productSchema = new Schema({
  title: String,
  created: {type: Date, default: Date.now},
  duration: String,
  category: String,
  description: String,
  highPrice: String,
  lowPrice: String,
  lowPriceFollowers: String,
  quantity: String,
});

productSchema.set('toJSON', {
  virtuals: true
});

productSchema.plugin(findOrCreate);

var Product = mongoose.model('product', productSchema);

module.exports = Product;