const express = require('express');
require('dotenv').config()
const router = express();
const middleware = require('../middleware')
const { check } = require ('express-validator');
const product_controller = require ('./product_controller')
const user_controller = require('./user_controller');
const cart_controller = require('./cart_controller');
const order_controller = require('./order_controller')

const jsonParser = express.json();

//routes for products
router.get("/api/products", jsonParser, product_controller.getProducts)
router.post("/api/products", jsonParser,  product_controller.postProducts)
router.put("/api/products/:id", jsonParser, middleware, product_controller.changeProduct)
router.delete("/api/products/:id", jsonParser, middleware, product_controller.deleteProduct)

//routes for users
router.post('/api/login', jsonParser, user_controller.loginUser);
router.post('/api/register', jsonParser,
    check('login', 'Поле логіну не може бути порожнім').notEmpty(),
    check('password', 'Пароль повинен мати від 4 до 12 символів').isLength({min:4, max:12}),
    check('email', 'Email некоректний').matches(/[@]/), user_controller.addUser);

//routes for carts
router.get('/api/cart', jsonParser, cart_controller.getCart)
router.post('/api/cart/add', jsonParser, cart_controller.addProduct)
router.post("/api/cart/remove", jsonParser, cart_controller.removeProduct)
router.post("/api/cart/update",jsonParser, cart_controller.updateQuantity)

//routes for orders
router.get('/api/orders', jsonParser, order_controller.getOrders)
router.get('/api/orders/:order_id',jsonParser, order_controller.getOrder)
router.put('/api/orders/:order_id/status', jsonParser, order_controller.changeStatus)
router.post('/api/orders', jsonParser, order_controller.createOrder)

module.exports = router