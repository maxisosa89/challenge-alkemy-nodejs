const { Character, Movie } = require('../db');
const { Op } = require('@sequelize/core');


const getCharacterById = async (idCharacter) => {
    try {
        const char = await Character.findByPk(idCharacter, {
            include: {
                model: Movie,
                attributes: ['titleMovie'], as: "movie",
                through: {
                    attributes: [],
                }
            }
        });
        if (char){ 
            return char;
        } else {
            throw error;
        }
    } catch(error) {
        error.message = "ID not found."
        throw error
    }
}

const getCharacterByFilters = async (nameCharacter, age, weight, movies) => {
    try{
        let objectWhere = {};
        let objectWhereInclude = {};
        if(nameCharacter) objectWhere.nameCharacter = {[Op.iLike]: "%"+nameCharacter+"%"}
        if(age) objectWhere.age = age
        if(weight) objectWhere.weight = weight
        if(movies) objectWhereInclude.idMovie = movies
        const characters = await Character.findAll({
            where: objectWhere,
            attributes: ["idCharacter", "imgCharacter", "nameCharacter", "age", "weight"],
            include: {
                model: Movie,
                where: objectWhereInclude,
                attributes: ['idMovie', 'titleMovie'], as: "movie",
                through: {
                    attributes: [],
                }
            }
        });
        return characters;
    }catch(error){
        throw error;
    }
}

const getAllCharacters = async () => {
    try {
        const characters = await Character.findAll({
            attributes: ["idCharacter", "imgCharacter", "nameCharacter"],
        });
        return characters;
    } catch(error){
        throw error;
    }
}

const postCharacter = async (imgCharacter, nameCharacter, age, weight, story, movies) => {
    try {
        const characterCreated = await Character.create({imgCharacter, nameCharacter, age, weight, story});
        if (movies) {
            movies.map(async(e) => {
                const movie = await Movie.findOne({
                    where: {
                        titleMovie: e
                    }
                })
                characterCreated.addMovie(movie)
            });
        }
        return "Character created"
    } catch(error) {
        throw error
    }
}

const deleteCharacter = async (idCharacter) => {
    try {
        const characterDeleted = await Character.findByPk(idCharacter);
        await characterDeleted.destroy();
        return "Character deleted";
    } catch(error){
        error.message = "ID not found."
        throw error;
    }
}

const putCharacter = async (idCharacter, imgCharacter, nameCharacter, age, weight, story, addMovies, removeMovies) => {
    try{
        const characterEdited = await Character.findByPk(idCharacter)
        const characterUpdate = await Character.update({
            imgCharacter, nameCharacter, age, weight, story
        }, {
            where: {
                idCharacter,
            }
        }); 
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
        return "Character update.";
    } catch(error){
        throw error;
    }
}

module.exports = {
    getCharacterById,
    getCharacterByFilters,
    getAllCharacters,
    postCharacter,
    deleteCharacter,
    putCharacter
}