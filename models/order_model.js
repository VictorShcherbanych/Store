const config = require('../knexfile');
const knex = require('knex');

const db = knex(config.development);

module.exports = {
    getOrders: async function (userId) {
        try{
            const orders = await db('orders')
                .select('*')
                .where('user_id', userId);
            return orders
        }catch(e){
            console.error(e);
        }
    },
    getOrder: async function (orderId) {
        try{
            const order = await db('orders')
                .where("uuid", orderId)
            return order
        }catch(e){
            console.error(e)
        }
    },
    createOrder: async (userId, 
        status, 
        totalAmount, 
        shippingAddress, 
        paymentMethod, 
        paymentStatus, 
        shippingMethod, 
        shippingCost, 
        comments,
        cartId) => {
            try{
            const order = await db('orders')
                .insert({
                    user_id: userId,
                    status: status,
                    total_amount: totalAmount,
                    shipping_address: shippingAddress,
                    payment_method: paymentMethod,
                    payment_status: paymentStatus,
                    shipping_method: shippingMethod,
                    shipping_cost: shippingCost,
                    comments: comments
                })
            await knex.transaction(async (trx) => {
                const products = await trx
                  .select('product_id', 'quantity', 'price')
                  .from('cart_items')
                  .where({ card_id: cartId })

                const insertData = products.map(product => ({
                    order_id: order[0].uuid,
                    product_id: product.id,
                    quantity: product.quantity,
                    price: product.price
                })
                );

                await trx('order_items').insert(insertData);
            });
            } catch(e){
                console.error(e)
            }
    },
    changeStatus: async (orderId, newStatus) => {
        try{
            await db('orders')
                .where('uuid', orderId)
                .update('status', newStatus)
        }catch(e){
            console.error(e)
        }
    },
    deleteCart: async function (cartId){
        try{
            await db.transaction(async (trx) => {
                await trx('cart_items').where('cart_id', cartId).del();
                await trx('carts').where('cart_it', cartId).del()
            })
        }catch(e){
            console.error(e)
        }
    }
}