const services = require('../services/character.services')

const getCharacters = async (req, res, next) => {
    try {
        let response;
        const { idCharacter } = req.params;
        const { name, age, weight, movies } = req.query;
        if (idCharacter){ 
            response = await services.getCharacterById(idCharacter);
        } else if (name || age || weight || movies) {
            response = await services.getCharacterByFilters(name, age, weight, movies);
        } else {
            response = await services.getAllCharacters()
        }
        res.json(response)
    } catch(error) {
        next(error);
    }
}

const postCharacter = async (req, res, next) => {
    try {
        const { imgCharacter, nameCharacter, age, weight, story, movies } = req.body;
        response = await services.postCharacter(imgCharacter, nameCharacter, age, weight, story, movies);
        res.json(response);
    } catch (error) {
        next(error);
    }
}

const deleteCharacter = async (req, res, next) => {
    try {
        const { idCharacter } = req.params;
        response = await services.deleteCharacter(idCharacter);
        res.json(response)
    } catch (error) {
        next(error);
    }
}

const putCharacter = async (req, res, next) => {
    try {
        const { idCharacter } = req.params;
        const { imgCharacter, nameCharacter, age, weight, story, addMovies, removeMovies } = req.body
        response = await services.putCharacter(idCharacter, imgCharacter, nameCharacter, age, weight, story, addMovies, removeMovies);
        res.json(response)
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getCharacters,
    postCharacter,
    deleteCharacter,
    putCharacter
}