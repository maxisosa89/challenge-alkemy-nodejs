const { Character } = require('../../db');

const deleteCharacter = ("/", async (req, res, next) => {
    try {
        const { idCharacter } = req.params;
        const characterDeleted = await Character.findByPk(idCharacter)
        await characterDeleted.destroy()
        res.send("Character deleted")
   
    
    } catch (error) {
        console.log(error)
    }

});

module.exports = { deleteCharacter };