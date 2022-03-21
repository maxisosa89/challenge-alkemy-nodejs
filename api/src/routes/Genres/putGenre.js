const { Genre } = require('../../db');

const putGenre = ("/", async (req, res, next) => {
    try {
        const { idGenre } = req.params;
        const { nameGenre, imgGenre } = req.body

        await Genre.update({
            nameGenre,
            imgGenre
        }, {
            where: {
                idGenre,
            }
        });
        res.send("Genre updated!")
        
    } catch (error) {
        const errors = []
        error.errors.map(e => {
            errors.push(e.message)
        })
        res.send(errors)
    }

});

module.exports = { putGenre };