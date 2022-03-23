const { Character, Movie, Genre } = require('../../db');
const { Op } = require('@sequelize/core');

const postMovie = ("/", async (req, res, next) => {
    try {
        const { imgMovie, titleMovie, release, score, genres, characters } = req.body;
        const [movieCreated, created] = await Movie.findOrCreate({
            where: { titleMovie: { 
                [Op.iLike]: titleMovie
            } },
            defaults: { imgMovie, titleMovie, release, score },
        });
        if (genres && created) {
            genres.map(async(e) => {
                const genre = await Genre.findOne({
                    where: {
                        nameGenre: e
                    }
                })
                movieCreated.addGenre(genre)
            })
        }
        if (characters && created) {
            characters.map(async(e) => {
                const character = await Character.findOne({
                    where: {
                        nameCharacter: e
                    }
                })
                movieCreated.addCharacter(character)
            })
        }
        created ? res.send("Movie created") : res.send("Movie already exists")
        
    
    } catch (error) {
        const errors = []
        error.errors.map(e => {
            errors.push(e.message)
        })
        res.send(errors)
    }

});

module.exports = { postMovie };