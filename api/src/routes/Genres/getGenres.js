const { Genre, Movie } = require('../../db');

const getGenres = ("/", async (req, res, next) => {
    try {
        const genres = await Genre.findAll({
            include: {
                model: Movie,
                attributes: ['titleMovie'], as: "movie",
                through: {
                    attributes: [],
                }
            }
        });
        res.send(genres)
    } catch (error) {
        console.log(error);
    }

});

module.exports = { getGenres };