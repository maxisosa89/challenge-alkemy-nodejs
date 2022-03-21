const { Genre } = require('../../db');

const getGenres = ("/", async (req, res, next) => {
    try {
        const genres = await Genre.findAll();
        res.send(genres)
    } catch (error) {
        console.log(error);
    }

});

module.exports = { getGenres };