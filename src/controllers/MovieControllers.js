const services = require('../services/movie.services')

const getMovies = async (req, res, next) => {
    try {
        let response;
        const { idMovie } = req.params;
        const { name, genre, order } = req.query;
        if (idMovie){ 
            response = await services.getMovieById(idMovie);
        }else if (name || genre || order) {
            response = await services.getMovieByFilters(name, genre, order);
        } else {
            response = await services.getAllMovies();
        }
        res.json(response);
    } catch(error){
        next(error);
    }
}

const postMovies = async (req, res, next) => {
    try {
        const { imgMovie, titleMovie, release, score, genres, characters } = req.body;
        response = await services.postMovies(imgMovie, titleMovie, release, score, genres, characters);
        res.json(response)
    } catch(error){
        next(error);
    }
}

const deleteMovies = async (req, res, next) => {
    try {
        const { idMovie } = req.params;
        response = await services.deleteMovies(idMovie);
        res.json(response)
    } catch(error){
        next(error);
    }
}

const putMovies = async (req, res, next) => {
    try {
        const { idMovie } = req.params;
        const { imgMovie, titleMovie, release, score, addCharacter, removeCharacter, addGenre, removeGenre } = req.body
        const response = await services.putMovies(idMovie, imgMovie, titleMovie, release, score, addCharacter, removeCharacter, addGenre, removeGenre);
        res.json(response)
    } catch(error){
        next(error);
    }
}

module.exports = {
    getMovies,
    postMovies,
    deleteMovies,
    putMovies
}