const { User } = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
const sendMail = require('./sendgrid.services')

const register = async ({ nameUser, email, password }) => {
    try{
        if (password.length < 6) throw new Error("Minimun 6 characters in pass.");
        const passCrypt = bcrypt.hashSync(password, Number.parseInt(authConfig.rounds));
        const userCreated = await User.create({
            nameUser,
            email,
            password: passCrypt
            });
        const token = jwt.sign({ user: userCreated }, authConfig.secret, {
            expiresIn: authConfig.expires
        });
        await sendMail.sendMail({ email, nameUser })
        return ({
            idUser: userCreated.idUser,
            nameUser: userCreated.nameUser,
            email: userCreated.email,
            token: token,
            msg: `Registered. A welcome email has been sent to ${email}.`
        });
    }catch(err) {
        throw err;
    }
}

const login = async ({ email, password }) => {
    try {
        const user = await User.findOne({
            where: {
                email,
            }
        });
        if (!user) {
            throw new Error("User not found.");
        }else {
            if (bcrypt.compareSync(password, user.password)) {
                let token = jwt.sign({ user: user }, authConfig.secret, {
                    expiresIn: authConfig.expires
                })
                return ({
                    idUser: user.idUser,
                    nameUser: user.nameUser,
                    email: user.email,
                    token: token
                })
            }else {
                throw new Error("Password incorrect.")
            }
        }
    } catch(err) {
        throw err
    }
}
        
module.exports = {
    login,
    register
}