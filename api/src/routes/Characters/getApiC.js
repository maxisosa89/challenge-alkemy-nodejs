const axios = require('axios')
const { Character, Movie } = require('../../db')

const getApiC = ("/", async (req, res, next) => {
    try {
        let result = await Character.findAll({
            include: {
                model: Movie,
                attributes: ['titleMovie'], as: "movie",
                through: {
                    attributes: [],
                }
            }
        })
        res.send(result)
    } catch (error) {
        console.log(error);
    }

});

module.exports = { getApiC };