const services = require('../services/genre.services')
const { Genre, Movie } = require('../db');
const { Op } = require('@sequelize/core');

const getGenres = async (req, res, next) => {
    try {
        let response;
        const { idGenre } = req.params;
        if (idGenre){ 
            response = await services.getGenreById(idGenre);
        } else {
            response = await services.getAllGenres();
        }
        res.json(response)
    } catch (error) {
        next(error);
    }
}

const postGenre = async (req, res, next) => {
    try {
        let response;
        const { imgGenre, nameGenre, movies } = req.body;
        response = await services.postGenre(imgGenre, nameGenre, movies);
        res.json(response);
    } catch (error) {
        next(error);
    }
}

const deleteGenre = async (req, res, next) => {
    try {
        const { idGenre } = req.params;
        response = await services.deleteGenre(idGenre);
        res.json(response)
    } catch (error) {
        next(error);
    }
}

const putGenre = async (req, res, next) => {
    try {
        const { idGenre } = req.params;
        const { imgGenre, nameGenre, addMovie, removeMovie } = req.body
        response = await services.putGenre(idGenre, imgGenre, nameGenre, addMovie, removeMovie);
        res.json(response)
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getGenres,
    postGenre,
    deleteGenre,
    putGenre
}