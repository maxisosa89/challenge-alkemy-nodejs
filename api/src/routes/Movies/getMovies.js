const axios = require('axios')
const { Character, Movie, Genre } = require('../../db')
const { Op } = require('@sequelize/core');

const getMovies = ("/", async (req, res, next) => {
    try {
        let result
        const dataReq = {
            idMovie: req.params.idMovie,
            titleMovie: req.query.name,
            genre: req.query.genre,
            order: req.query.order,
        }
        if (dataReq.idMovie){
            result = await Movie.findByPk(dataReq.idMovie, {
                include: {
                    model: Character,
                    attributes: ['nameCharacter'], as: "character",
                    through: {
                        attributes: [],
                    }
                }
            })
        } else if (dataReq.titleMovie){
            result = await Movie.findAll({
                where: {
                    titleMovie: {
                        [Op.iLike]: "%"+dataReq.titleMovie+"%"
                    }
                },
                include: {
                    model: Character,
                    attributes: ['nameCharacter'], as: "character",
                    through: {
                        attributes: [],
                    }
                }
            })
        } else if (dataReq.genre){
            result = await Genre.findByPk(dataReq.genre, {
                include: {
                    model: Movie,
                    attributes: ['titleMovie'], as: "movie",
                    through: {
                        attributes: [],
                    }
                }
            })
        } else if (dataReq.order){
            if (dataReq.order === "ASC"){
                result = await Character.findAll({
                    attributes: ["idMovie", "imgMovie", "titleMovie", "release"],
                    order: [["release", "ASC"]]
                })
            } else if (dataReq.order === "DES"){
                result = await Character.findAll({
                    attributes: ["idMovie", "imgMovie", "titleMovie", "release"],
                    order: [["release", "DESC"]]
                })
            }
        } else {
            result = await Movie.findAll({
                attributes: ["idMovie", "imgMovie", "titleMovie", "release"],
            })
        }

        res.send(result)
    } catch (error) {
        console.log(error);
    }

});

module.exports = { getMovies };