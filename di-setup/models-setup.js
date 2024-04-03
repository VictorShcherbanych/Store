// models.js
const { asClass } = require('awilix');
const CartModel = require('../models/cart_model');
const UserModel = require('../models/user_model');
const OrderModel = require('../models/order_model');
const ProductModel = require('../models/product_model');

module.exports = (container) => {
  container.register({
    ProductModel: asClass(ProductModel),
    CartModel: asClass(CartModel),
    UserModel: asClass(UserModel),
    OrderModel: asClass(OrderModel)
  });
};
