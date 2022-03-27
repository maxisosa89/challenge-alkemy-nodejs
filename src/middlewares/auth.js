const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
const { User } = require('../db')

module.exports = (req, res, next) => {
    if (!req.headers.authorization){
        console.log("Access not authorized.")
        res.status(401).json({msg: "Access not authorized."})
    } else {
        let token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) {
                console.log("Token not decoded")
                res.status(500).json({msg: "Token not decoded"})
            } else {
                User.findByPk(decoded.user.idUser, /* { include: "role" } */)
                    .then(user => {
                        req.user = user
                        next()
                    }). catch (err => console.log(err))

                
            }
        })
    }
}