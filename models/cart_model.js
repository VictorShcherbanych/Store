const db = require('../db-config/index')

module.exports = {
    getCart: async function (userId){
        try{
            const cart = await db('carts')
            .where('user_id', userId)
            return cart
        } catch (e) {
            console.error(e)
        }
    },
    getCartWithProducts: async (cartId) =>{
        try{
            const products = await db('cart_items')
                .where('cart_id', cartId)
            return products
        }catch (e){
            console.error(e)
        }
    },
    createCart: async function (userId) {
        try{
            await db('carts')
            .insert({
                user_id: userId
            });
        } catch (e) {
            console.error(e)
        }
    },
    addToCard: async function (userId, productId, quantity){
        try{
            const cartId = await db('carts')
                .select('uuid')
                .where({
                    user_id: userId
                })
            const cartData = await db('cart_items')
            .insert({
                cart_id: cartId[0].uuid,
                product_id: productId,
                quantity: quantity
            })
            return cartData
        }catch(e){
            console.error(e)
        }
    },
    removeFromCart: async function (userId, productId){
        try{
            const cartId = await db('carts')
                .select('uuid')
                .where({
                    user_id: userId
                })
            await db('cart_items')
            .where({
                cart_is: cartId,
                product_id: productId
            })
            .del()
        } catch(e) {
            console.error(e)
        }
    },
    updateQuantity: async function (cartId, productId, newQuantity){
        try{
            return await db('cart_items')
            .where({
                cart_id: cartId,
                product_id: productId
            })
            .update({
                quantity: newQuantity
            })
        }catch(e){
            console.error(e)
        }
    },
}