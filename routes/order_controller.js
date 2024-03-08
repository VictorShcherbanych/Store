const order_db = require('../models/order_model')
const cart_db = require('../models/cart_model')


module.exports = {
    createOrder: async (req, res) => {
        try {
            const {
                body,
                body: {
                    userId,
                    status,
                    total_amount,
                    shipping_address,
                    payment_method,
                    payment_status,
                    shipping_method,
                    shipping_cost,
                    comments
                }
            } = req;
            if (!body) return res.status(400).send('Відсутні вказані данні');
            const cart = await cart_db.getCart(req.body.userId)
            const order = await order_db.createOrder(body, cart[0].uuid)
            res.status(201).send('Замовлення прийнято');
        } catch (e) {
            console.error(e)
        }
    },
    getOrder: async (req, res) => {
        try{
            orderId = req.params.order_id
            res.send(await order_db.getOrder(orderId))
        }catch(e){
            console.error(e)
        }
    },

    getOrders: async (req, res) =>{
        try{
            const userId = req.body.userId
            res.send(await order_db.getOrders(userId))
        }catch(e){
            console.error(e)
        }
    },

    changeStatus: async (req, res) => {
        try{
            if(!req.params) res.status(404).send('Не вказано id замовлення')
            const newStatus = req.body.status
            const orderId = req.params.order_id
            await order_db.changeStatus(orderId, newStatus)
            res.send('Статус успішно змінено')
        }catch(e) {
            console.error(e)
        }
    }
}