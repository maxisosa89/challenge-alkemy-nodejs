const services = require('../services/auth.services.js')

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const response = await services.login({ email, password })
        res.json(response)
    } catch(error) {
        next(error);
    }
}

const register = async (req, res, next) => {
    try {
        const { nameUser, email, password } = req.body;
        const response = await services.register({ nameUser, email, password })
        res.json(response)
    } catch(error) {
        next(error);
    }
}

module.exports = {
    login,
    register
}