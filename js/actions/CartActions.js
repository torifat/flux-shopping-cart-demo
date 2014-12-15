var AppDispatcher = require('../dispatcher/AppDispatcher'),
    CartConstants = require('../constants/CartConstants');

var CartActions = {

  add: function (product) {
    AppDispatcher.handleViewAction({
      type: CartConstants.CART_ADD,
      product: product
    });
  }

};

module.exports = CartActions;
