const { User } = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
const sgMail = require('../services/sendgrid')

module.exports = {
    signIn(req, res) {
        let { email, password } = req.body;
        User.findOne({
            where: {
                email,
            }
        }).then(user => {
            if (!user) {
                throw new Error("User not found.")
            } else {
                if (bcrypt.compareSync(password, user.password)) {
                    let token = jwt.sign({ user: user }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    })
                    res.json({
                        user: user,
                        token: token
                    })
                }else {
                    throw new Error("Password incorrect.")
                }
            }
        }).catch(err => {
            res.status(401).send(err)
        })
    },

    signUp(req, res) {
        const { nameUser, email } = req.body;
        if (req.body.password.length < 6) throw new Error("Minimun 6 characters in pass.")
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds))
        User.create({
            nameUser,
            email,
            password
        }).then(user => {
            let token = jwt.sign({ user: user }, authConfig.secret, {
                expiresIn: authConfig.expires
            })

            //ENVIO DE MAIL
            const msg = {
                to: email,
                from: "msosa89@outlook.com",
                subject: "Bienvenido a la API de Disney!",
                text: "Hola! Este es mi proyecto para el challenge de NodeJs. Saludos.",
                mail_settings: {
                    sandbox_mode: {
                        enable: false
                    }
                }
            }
            sgMail.send(msg).then(response => response).catch(err => console.log(err))


            res.json({
                user: user,
                token: token,
                msg: "Registered. Please login."
            })
        }).catch(err => {
            res.send(err.message)
        }) 
    }
}