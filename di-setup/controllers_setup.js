// controllers.js
const { asClass } = require('awilix');
const CartController = require('../controllers/cart_controller');
const UserController = require('../controllers/user_controller');
const OrderController = require('../controllers/order_controller');
const ProductController = require('../controllers/product_controller');

module.exports = (container) => {
  container.register({
    CartController: asClass(CartController),
    UserController: asClass(UserController),
    OrderController: asClass(OrderController),
    ProductController: asClass(ProductController),
  });
};
