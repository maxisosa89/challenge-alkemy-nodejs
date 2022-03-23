const axios = require('axios')
const { Character, Movie } = require('../../db')
const { Op } = require('@sequelize/core');

const getCharacters = ("/", async (req, res, next) => {
    try {
        let result
        const dataReq = {
            idCharacter: req.params.idCharacter,
            nameCharacter: req.query.name,
            age: req.query.age,
            weight: req.query.weight,
            movies: req.query.movies
        }
        if (dataReq.idCharacter){
            result = await Character.findByPk(dataReq.idCharacter, {
                include: {
                    model: Movie,
                    attributes: ['titleMovie'], as: "movie",
                    through: {
                        attributes: [],
                    }
                }
            })
        } else if (dataReq.nameCharacter){
            result = await Character.findAll({
                where: {
                    nameCharacter: {
                        [Op.iLike]: "%"+dataReq.nameCharacter+"%"
                    }
                },
                include: {
                    model: Movie,
                    attributes: ['titleMovie'], as: "movie",
                    through: {
                        attributes: [],
                    }
                }
            })
        } else if (dataReq.age){
            result = await Character.findAll({
                where: {
                    age: dataReq.age
                },
                include: {
                    model: Movie,
                    attributes: ['titleMovie'], as: "movie",
                    through: {
                        attributes: [],
                    }
                }
            })
        } else if (dataReq.weight){
            result = await Character.findAll({
                where: {
                    weight: dataReq.weight
                },
                include: {
                    model: Movie,
                    attributes: ['titleMovie'], as: "movie",
                    through: {
                        attributes: [],
                    }
                }
            })
        } else if (dataReq.movies){
            result = await Movie.findByPk(dataReq.movies, {
                include: {
                    model: Character,
                    attributes: ['nameCharacter', 'imgCharacter'], as: "character",
                    through: {
                        attributes: [],
                    }
                }
            })
        } else {
            result = await Character.findAll({
                attributes: ["idCharacter", "imgCharacter", "nameCharacter"],
            })
        }

        res.send(result)
    } catch (error) {
        console.log(error);
    }

});

module.exports = { getCharacters };