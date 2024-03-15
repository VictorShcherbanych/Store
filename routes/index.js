const express = require('express');
require('dotenv').config()
const router = express();
const middleware = require('../middleware')
const { check } = require ('express-validator');
const {container, setup} = require('../di-setup/container')

console.log(container.registrations);

const cartController = container.resolve('cartController')
const orderController = container.resolve('orderController')
const userController = container.resolve('userController')
const productController = container.resolve('productController')

const jsonParser = express.json();

//routes for products
router.get("/api/products", jsonParser, productController.getProducts)
router.post("/api/products", jsonParser,  productController.postProducts)
router.put("/api/products/:id", jsonParser, middleware, productController.changeProduct)
router.delete("/api/products/:id", jsonParser, middleware, productController.deleteProduct)

//routes for users
router.post('/api/login', jsonParser, userController.loginUser);
router.post('/api/register', jsonParser,
    check('login', 'Поле логіну не може бути порожнім').notEmpty(),
    check('password', 'Пароль повинен мати від 4 до 12 символів').isLength({min:4, max:12}),
    check('email', 'Email некоректний').matches(/[@]/), userController.addUser);

//routes for carts
router.get('/api/cart', jsonParser, cartController.getCart)
router.post('/api/cart/add', jsonParser, cartController.addProduct)
router.post("/api/cart/remove", jsonParser, cartController.removeProduct)
router.post("/api/cart/update",jsonParser, cartController.updateQuantity)

//routes for orders
router.get('/api/orders', jsonParser, orderController.getOrders)
router.get('/api/orders/:order_id',jsonParser, orderController.getOrder)
router.put('/api/orders/:order_id/status', jsonParser, orderController.changeStatus)
router.post('/api/orders', jsonParser, orderController.createOrder)

module.exports = router