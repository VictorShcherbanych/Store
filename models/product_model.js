const db = require('../db-config/index')

module.exports = {
    getProducts: async function getProducts() {
        try {
            const products = await db('products')
                .select('*')
            return products
        } catch (e) {
            console.error(e);
        }
    },
    postProducts: async function postProducts(name, price, picture, description) {
        try {
            const products = await db('products')
                .insert({
                    name: name,
                    price: price,
                    picture: picture,
                    description: description
                })
            return products
        } catch (e) {
            console.error(e)
        }
    },
    changeProduct: async function changeProduct(id, newData) {
        try {
            await db('products')
                .where({ uuid: id })
                .update(newData)
        } catch (e) {
            console.error(e)
        }
    },
    deleteProduct: async function deleteProduct(id) {
        try{
            await db('products')
                .where({ uuid: id})
                .del()
        } catch (e) {
            console.error(e)
        }
    },
    createUser: async function createUser (login, password, email, phonenumber){
        try{
            await db('users')
            .insert({
                login: login,
                password: password,
                email: email,
                phonenumber: phonenumber,
                role: "role"
            });
        } catch (e) {
            console.error(e)
        }
    },
    getUser: async function getUser(login){
        try{
            const user =  await db('users')
            .where('login', login)
            return user
        } catch (e) {
            console.error(e)
        }
    },
    getCart: async function (userId){
        try{
            const cart = await db('carts')
            .where('user_id', userId)
            return cart
        } catch (e) {
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
                cart_is: cartId,
                product_id: productId
            })
            .update({
                quantity: newQuantity
            })
        }catch(e){
            console.error(e)
        }
    }
}