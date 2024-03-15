// controllers.js
const { asClass } = require('awilix');
const cartController = require('../controllers/cart_controller');
const userController = require('../controllers/user_controller');
const orderController = require('../controllers/order_controller');
const productController = require('../controllers/product_controller');

module.exports = (container) => {
  container.register({
    cartController: asClass(cartController),
    userController: asClass(userController),
    orderController: asClass(orderController),
    productController: asClass(productController),
  });
};
