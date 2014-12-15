var React = require('react'),
    ProductList = require('./components/ProductList.react'),
    Cart = require('./components/Cart.react'),
    products = require('./ExampleProductData');

React.render(
  <div>
    <ProductList products={products} />
    <Cart />
  </div>,
  document.getElementById('content')
);
