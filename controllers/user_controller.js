const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

function generateToken(user) {
    return jwt.sign(user, process.env.secret_key, { expiresIn: '1h' });
}

class UserController {

    constructor({ UserModel }) {
        this.UserModel = UserModel
    }

    loginUser = async (req, res) => {
        try {
            const user = await this.UserModel.getUser(req.body.login)
            if (!user) return res.status(400).send('Email or password is wrong');

            const validPassword = bcrypt.compareSync(req.body.password, user[0].password);
            if (!validPassword) return res.status(400).send('Email or password is wrong');

            const token = generateToken({ id: user.id, login: user.login });

            res.header('authorization', token).send(token);
        } catch (err) {
            console.error(err)
        }
    }

    addUser = async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Помилка при реєстрації', errors })
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            await this.UserModel.createUser(req.body.login, hashedPassword, req.body.email, req.body.phonenumber)

            res.status(201).send('User registered successfully');
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = UserController