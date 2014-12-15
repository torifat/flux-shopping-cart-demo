var AppDispatcher = require('../dispatcher/AppDispatcher'),
  EventEmitter = require('events').EventEmitter,
  CartConstants = require('../constants/CartConstants'),
  assign = require('object-assign'),
  _ = require('underscore');

var CHANGE_EVENT = 'change';

var _products = [];

function _addToCart(product) {
  var oldProduct = _.findWhere(_products, {id: product.id});
  if (oldProduct) {
    oldProduct.count += 1;
    oldProduct.subTotal += product.price;
  } else {
    var newProduct = _.clone(product);
    newProduct.count = 1;
    newProduct.subTotal = product.price;
    _products.push(newProduct);
  }
}

var CartStore = assign({}, EventEmitter.prototype, {

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function (id) {
    return _products[id];
  },

  getAll: function () {
    return _products;
  }

});

CartStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

  case CartConstants.CART_ADD:
    _addToCart(action.product)
    CartStore.emitChange();
    break;

  default:
    // do nothing
  }

});

module.exports = CartStore;
