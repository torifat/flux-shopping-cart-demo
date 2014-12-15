var AppDispatcher = require('../dispatcher/AppDispatcher'),
  EventEmitter = require('events').EventEmitter,
  CartConstants = require('../constants/CartConstants'),
  assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _products = [];

function _addToCart(product) {
  _products.push(product);
  console.log(_products);
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
