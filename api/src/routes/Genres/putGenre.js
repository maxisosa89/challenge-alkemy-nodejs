const { Genre, Movie } = require('../../db');

const putGenre = ("/", async (req, res, next) => {
    try {
        const { idGenre } = req.params;
        const { nameGenre, imgGenre, addMovies, removeMovies } = req.body
        const genreEdited = await Genre.findByPk(idGenre)
        
        if (nameGenre || imgGenre){
            await Genre.update({
                nameGenre,
                imgGenre
            }, {
                where: {
                    idGenre,
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
                genreEdited.addMovie(movie)
            })
        }
        if (removeMovies) {
            removeMovies.map(async(e) => {
                const movie = await Movie.findOne({
                    where: {
                        titleMovie: e
                    }
                })
                genreEdited.removeMovie(movie)
            })
        }
        res.send("Genre updated")
        
    } catch (error) {
        const errors = []
        error.errors?.map(e => {
            errors.push(e.message)
        })
        res.send(errors)
    }

});

module.exports = { putGenre };