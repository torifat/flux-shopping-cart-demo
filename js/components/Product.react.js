var React = require('react'),
    CartActions = require('../actions/CartActions');

var Product = React.createClass({

  render: function () {
    return (
      <tr>
        <td>{this.props.value.name}</td>
        <td className="text-right">${this.props.value.price}</td>
        <td><button onClick={this._onClick}>Add to Cart</button></td>
      </tr>
    );
  },

  _onClick: function (event) {
    event.preventDefault();
    CartActions.add(this.props.value);
  }

});

module.exports = Product;
