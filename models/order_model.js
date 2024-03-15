class orderModel {
    constructor({db}) {
        this.db = db
    }
    getOrders = async function (userId) {
        try {
            const orders = await this.db('orders')
                .select('*')
                .where('user_id', userId);
            return orders
        } catch (e) {
            console.error(e);
        }
    }
    getOrder = async function (orderId) {
        try {
            const order = await this.db('orders')
                .where("uuid", orderId)
            return order
        } catch (e) {
            console.error(e)
        }
    }
    createOrder = async (data, cartId) => {
        try {
            const order = await this.db('orders')
                .insert({
                    user_id: data.userId,
                    status: data.status,
                    total_amount: data.total_amount,
                    shipping_address: data.shipping_address,
                    payment_method: data.payment_method,
                    payment_status: data.payment_status,
                    shipping_method: data.shipping_method,
                    shipping_cost: data.shipping_cost,
                    comments: data.comments
                })
            await this.db.transaction(async (trx) => {

                const products = await trx
                    .select('product_id', 'quantity', 'price')
                    .from('cart_items')
                    .where({ cart_id: cartId })

                console.log(products)
                const orderId = await trx('orders')
                    .select('uuid')
                    .where({
                        user_id: data.userId
                    })
                const insertData = products.map(product => ({
                    order_id: orderId[0].uuid,
                    product_id: product.product_id,
                    quantity: product.quantity,
                    price: product.price
                })
                );
                await trx('order_items').insert(insertData);
            });
        } catch (e) {
            console.error(e)
        }
    }
    changeStatus = async (orderId, newStatus) => {
        try {
            await this.db('orders')
                .where('uuid', orderId)
                .update('status', newStatus)
        } catch (e) {
            console.error(e)
        }
    }
    deleteCart = async function (cartId) {
        try {
            await this.db.transaction(async (trx) => {
                await trx('cart_items').where('cart_id', cartId).del();
                await trx('carts').where('cart_it', cartId).del()
            })
        } catch (e) {
            console.error(e)
        }
    }
}

module.exports = orderModel