const order_db = require('../models/order_model')
const cart_db = require('../models/cart_model')


module.exports = {
    createOrder: async (req, res) => {
        try{
          if(!req.params) return res.status(400).send('Відсутні вказані данні'); 
          const cart = await cart_db.getCart(userId)
          const cartItems = await cart_db.getCartWithProducts(cart[0].cart_id)
        }catch (e){
            console.error(e)
        }

    }
}