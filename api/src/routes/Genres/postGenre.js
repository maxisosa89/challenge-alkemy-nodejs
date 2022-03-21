const { Genre } = require('../../db');
const { Op } = require('@sequelize/core');

const postGenre = ("/", async (req, res, next) => {
    try {
        const { nameGenre, imgGenre, movies } = req.body;
        const [genreCreated, created] = await Genre.findOrCreate({
            where: { nameGenre: { 
                [Op.iLike]: nameGenre
            } },
            defaults: { nameGenre, imgGenre },
        });
        created ? res.send("Genre created") : res.send("Genre already exists")
        
    
    } catch (error) {
        const errors = []
        error.errors.map(e => {
            errors.push(e.message)
        })
        res.send(errors)
    }

});

module.exports = { postGenre };