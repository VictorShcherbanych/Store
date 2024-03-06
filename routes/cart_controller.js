const db = require('../models/cart_model')


module.exports = {
    getCart: async (req, res) => {
        try {
            const userId = req.body.userId
            res.json(await db.getCart(userId))
        } catch (e) {
            console.error(e)
        }
    },
    addProduct: async (req, res) => {
        try {
            const {
                body,
                body: {
                    userId,
                    product,
                    quantity,
                }
            } = req;


            const cart = await db.getCart(userId)
            console.log(cart)
            if (!cart[0]) await db.createCart(userId)
            if (!body) return res.status(400).send('Не вказано бажаних позицій');

            res.json(await db.addToCard(userId, product, quantity))
        } catch (e) {
            console.error(e)
        }
    },
    removeProduct: async (req, res) => {
        try {
            const {
                userId,
                product_id
            } = req.body;

            res.json({ success: await db.removeFromCart(userId, product_id) });
        } catch (e) {
            console.error(e)
        }
    },
    updateQuantity: async (req, res) => {
        try {
            const cartId = req.body.cartId
            const productid = req.body.productId
            const newQuantity = req.body.newQuantity
            res.json(await db.updateQuantity(cartId, productid, newQuantity))
        } catch (e) {
            console.error(e)
        }
    }
}