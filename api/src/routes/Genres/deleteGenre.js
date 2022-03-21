const { Genre } = require('../../db');

const deleteGenre = ("/", async (req, res, next) => {
    try {
        const { idGenre } = req.params;
        const genreDeleted = await Genre.findByPk(idGenre)
        await genreDeleted.destroy()
        res.send("Genre deleted")
   
    
    } catch (error) {
        console.log(error)
    }

});

module.exports = { deleteGenre };