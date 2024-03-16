// models.js
const { asClass } = require('awilix');
const cartModel = require('../models/cart_model');
const userModel = require('../models/user_model');
const orderModel = require('../models/order_model');
const productModel = require('../models/product_model');

module.exports = (container) => {
  container.register({
    productModel: asClass(productModel),
    cartModel: asClass(cartModel),
    userModel: asClass(userModel),
    orderModel: asClass(orderModel)
  });
};
