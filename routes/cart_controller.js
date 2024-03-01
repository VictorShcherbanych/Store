const db = require('../models/cart_model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    gerCart: async (req,res) => {
        try{
            const userId = req.body.userId
            res.json(await db.getCart(userId))
        }catch(e){
            console.error(e)
        }
    },
    addProduct: async (req, res) => {
        try {
            const cart = await db.getCart(req.body.userId)
            if(!cart[0]) await db.createCart(req.body.userId)
            if (!req.body) return res.status(400).send('Не вказано бажаних позицій');
            const userId = req.body.userId
            const product = req.body.productId
            const quantity = req.body.quantity
            res.json(await db.addToCard(userId, product, quantity))
        } catch (e) {
            console.error(e)
        }
    },
    removeProduct: async (req, res) => {
        try{
            const userId = req.body.userId
            const product_id = req.body.productId
            await db.removeFromCart(userId, product_id)
            res.json('Товар видалено')
        }catch(e){
            console.error(e)
        }
    },
    updateQuantity: async (req, res) => {
        try{
            const cartId = req.body.cartId
            const productid = req.body.productId
            const newQuantity = req.body.newQuantity
            res.json(await db.updateQuantity(cartId, productid, newQuantity))
        }catch (e) {
            console.error(e)
        }
    }
}