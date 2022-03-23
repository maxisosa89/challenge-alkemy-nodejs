const { Character, Movie } = require('../../db');

const putMovie = ("/", async (req, res, next) => {
    try {
        const { idMovie } = req.params;
        const { imgMovie, titleMovie, release, score, addCharacter, removeCharacter, addGenre, removeGenre } = req.body
        const movieEdited = await Movie.findByPk(idMovie)
        
        if (titleMovie || imgMovie || release || score){
            await Movie.update({
                imgMovie, titleMovie, release, score
            }, {
                where: {
                    idMovie,
                }
            });
        }
        if (addCharacter) {
            addCharacter.map(async(e) => {
                const character = await Character.findOne({
                    where: {
                        nameCharacter: e
                    }
                })
                movieEdited.addCharacter(character)
            })
        }
        if (removeCharacter) {
            removeCharacter.map(async(e) => {
                const character = await Character.findOne({
                    where: {
                        titleMovie: e
                    }
                })
                movieEdited.removeCharacter(character)
            })
        }
        if (addGenre) {
            addGenre.map(async(e) => {
                const genre = await Genre.findOne({
                    where: {
                        nameGenre: e
                    }
                })
                movieEdited.addGenre(genre)
            })
        }
        if (removeGenre) {
            removeGenre.map(async(e) => {
                const genre = await Genre.findOne({
                    where: {
                        nameGenre: e
                    }
                })
                movieEdited.removeGenre(genre)
            })
        }
        res.send("Movie updated")
        
    } catch (error) {
        const errors = []
        error.errors?.map(e => {
            errors.push(e.message)
        })
        res.send(errors)
    }

});

module.exports = { putMovie };