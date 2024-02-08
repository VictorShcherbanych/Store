const config = require('../knexfile');
const knex = require('knex');

const db = knex(config.development);

module.exports = {
    getProducts: async function getProducts() {
        try {
            const products = await db('products')
                .select('*')
            console.log(products)
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
}