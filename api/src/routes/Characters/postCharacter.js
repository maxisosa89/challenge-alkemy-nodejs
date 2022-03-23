const { Character, Movie } = require('../../db');
const { Op } = require('@sequelize/core');

const postCharacter = ("/", async (req, res, next) => {
    try {
        const { imgCharacter, nameCharacter, age, weight, story, movies } = req.body;
        const [characterCreated, created] = await Character.findOrCreate({
            where: { nameCharacter: { 
                [Op.iLike]: nameCharacter
            } },
            defaults: { imgCharacter, nameCharacter, age, weight, story },
        });
        if (movies && created) {
            movies.map(async(e) => {
                const movie = await Movie.findOne({
                    where: {
                        titleMovie: e
                    }
                })
                characterCreated.addMovie(movie)
            })
        }
        created ? res.send("Character created") : res.send("Character already exists")
        
    
    } catch (error) {
        const errors = []
        error.errors.map(e => {
            errors.push(e.message)
        })
        res.send(errors)
    }

});

module.exports = { postCharacter };