const { Movie } = require('../../db');

const deleteMovie = ("/", async (req, res, next) => {
    try {
        const { idMovie } = req.params;
        const movieDeleted = await Movie.findByPk(idMovie)
        await movieDeleted.destroy()
        res.send("Movie deleted")
   
    
    } catch (error) {
        console.log(error)
    }

});

module.exports = { deleteMovie };