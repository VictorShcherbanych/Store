const { compare } = require('bcrypt');
const config = require('../knexfile');
const knex = require('knex');

const db = knex(config.development);

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
    }

}