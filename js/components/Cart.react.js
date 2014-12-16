var React = require('react'),
    CartStore = require('../stores/CartStore'),
    CartItem = require('./CartItem.react');

function _getCartState() {
  return {
    products: CartStore.getAll()
  };
}

var Cart= React.createClass({

  getInitialState: function () {
    return _getCartState();
  },

  componentDidMount: function() {
    CartStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    CartStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var products = this.state.products.map(function (product) {
      return <CartItem key={product.id} value={product} />
    });
    var total = this.state.products.reduce(function (acc, product) {
      return acc + product.subTotal;
    }, 0.0);
    return (
      <div>
        <h2>Cart</h2>
        <table>
          <tbody>
            {products}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="text-right">Total</td>
              <td className="text-right">${total}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  },

  _onChange: function() {
    this.setState(_getCartState());
  }

});

module.exports = Cart;
