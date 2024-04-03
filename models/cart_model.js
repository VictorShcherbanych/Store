class CartModel {

    constructor({ db }) {
        this.db = db
    }

    getCart = async (userId) => {
        try {
            const cart = await this.db('carts')
                .where('user_id', userId)
            return cart
        } catch (e) {
            console.error(e)
        }
    }

    getCartWithProducts = async (cartId) => {
        try {
            const products = await this.db('cart_items')
                .where('cart_id', cartId)
            return products
        } catch (e) {
            console.error(e)
        }
    }

    createCart = async (userId) => {
        try {
            await this.db('carts')
                .insert({
                    user_id: userId
                });
        } catch (e) {
            console.error(e)
        }
    }

    addToCard = async (userId, productId, quantity) => {
        try {
            const cartId = await this.db('carts')
                .select('uuid')
                .where({
                    user_id: userId
                })
            const cartData = await this.db('cart_items')
                .insert({
                    cart_id: cartId[0].uuid,
                    product_id: productId,
                    quantity: quantity
                })
            return cartData
        } catch (e) {
            console.error(e)
        }
    }

    removeFromCart = async (userId, productId) => {
        try {
            const cartId = await this.db('carts')
                .select('uuid')
                .where({
                    user_id: userId
                })
            await this.db('cart_items')
                .where({
                    cart_is: cartId,
                    product_id: productId
                })
                .del()
        } catch (e) {
            console.error(e)
        }
    }

    updateQuantity = async (cartId, productId, newQuantity) => {
        try {
            return await this.db('cart_items')
                .where({
                    cart_id: cartId,
                    product_id: productId
                })
                .update({
                    quantity: newQuantity
                })
        } catch (e) {
            console.error(e)
        }
    }
}

module.exports = CartModel