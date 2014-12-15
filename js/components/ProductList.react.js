var React = require('react'),
    Product = require('./Product.react');

var ProductList = React.createClass({

  getDefaultProps: function() {
    return {
      products: []
    };
  },

  render: function () {
    var products = this.props.products.map(function (product) {
      return <Product key={product.id} value={product} />
    });
    return (
      <div>
        <h2>Products</h2>
        <table>
          {products}
        </table>
      </div>
    );
  }

});

module.exports = ProductList;
