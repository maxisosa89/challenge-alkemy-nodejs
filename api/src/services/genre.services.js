const { Movie, Genre } = require('../db');
const { Op } = require('@sequelize/core');


const getGenreById = async (idGenre) => {
    try {
        const genre = await Genre.findByPk(idGenre, {
            include: {
                model: Movie,
                attributes: ['titleMovie'], as: "movie",
                through: {
                    attributes: [],
                }
            }
        });
        return genre;
    } catch(err) {
        throw err;
    }
}


const getAllGenres = async () => {
    try {
        const genres = await Genre.findAll({
            attributes: ["idGenre", "nameGenre", "imgGenre"],
        });
        return genres;
    } catch(err){
        throw err;
    }
}

const postGenre = async (imgGenre, nameGenre, movies) => {
    try {
        const genreCreated = await Genre.create({imgGenre, nameGenre});
        if (movies) {
            movies.map(async(e) => {
                const movie = await Movie.findOne({
                    where: {
                        titleMovie: e
                    }
                })
                genreCreated.addMovie(movie)
            });
        }
        return "Genre created"
    } catch(error) {
        throw error
    }
}

const deleteGenre = async (idGenre) => {
    try {
        const genreDeleted = await Genre.findByPk(idGenre);
        await genreDeleted.destroy();
        return "Genre deleted";
    } catch(err){
        throw err;
    }
}

const putGenre = async (idGenre, imgGenre, nameGenre, addMovie, removeMovie) => {
    try{
        const genreEdited = await Movie.findByPk(idGenre)
        if (imgGenre || nameGenre){
            await Genre.update({
                imgGenre, nameGenre
            }, {
                where: {
                    idGenre,
                }
            });
        }
        if (addMovie) {
            addMovie.map(async(e) => {
                const movie = await Movie.findOne({
                    where: {
                        titleMovie: e
                    }
                })
                genreEdited.addMovie(movie)
            })
        }
        if (removeMovie) {
            removeMovie.map(async(e) => {
                const movie = await Movie.findOne({
                    where: {
                        titleMovie: e
                    }
                })
                genreEdited.removeMovie(movie)
            })
        }
        return "Genre updated";
    } catch(err){
        throw err;
    }
}

module.exports = {
    getGenreById,
    getAllGenres,
    postGenre,
    deleteGenre,
    putGenre
}