const { Character, Movie } = require('../../db');

const putCharacter = ("/", async (req, res, next) => {
    try {
        const { idCharacter } = req.params;
        const { imgCharacter, nameCharacter, age, weight, story, addMovies, removeMovies } = req.body
        const characterEdited = await Character.findByPk(idCharacter)
        
        if (nameCharacter || imgCharacter){
            await Character.update({
                imgCharacter, nameCharacter, age, weight, story
            }, {
                where: {
                    idCharacter,
                }
            });
        }
        if (addMovies) {
            addMovies.map(async(e) => {
                const movie = await Movie.findOne({
                    where: {
                        titleMovie: e
                    }
                })
                characterEdited.addMovie(movie)
            })
        }
        if (removeMovies) {
            removeMovies.map(async(e) => {
                const movie = await Movie.findOne({
                    where: {
                        titleMovie: e
                    }
                })
                characterEdited.removeMovie(movie)
            })
        }
        res.send("Character updated")
        
    } catch (error) {
        const errors = []
        error.errors?.map(e => {
            errors.push(e.message)
        })
        res.send(errors)
    }

});

module.exports = { putCharacter };