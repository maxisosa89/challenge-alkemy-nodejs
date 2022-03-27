const { Character, Movie, Genre } = require('../db');
const { Op } = require('@sequelize/core');


const getMovieById = async (idMovie) => {
    try {
        const movie = await Movie.findByPk(idMovie, {
            include:[{
                model: Character,
                attributes: ['nameCharacter'], as: "character",
                through: {
                    attributes: [],
                }
            },
            {
                model: Genre,
                attributes: ['nameGenre'], as: "genre",
                through: {
                attributes: [],
            }}]
            
        });
        return movie;
    } catch(err) {
        throw err;
    }
}

const getMovieByFilters = async (titleMovie, genre, order="ASC") => {
    try{
        let objectWhere = {};
        let objectWhereInclude = {};
        if (titleMovie) objectWhere.titleMovie = {[Op.iLike]: "%"+titleMovie+"%"}
        if(genre) objectWhereInclude.idGenre = genre
        const movies = await Movie.findAll({
            where: objectWhere,
            include: {
                model: Genre,
                where: objectWhereInclude,
                attributes: ['idGenre', 'nameGenre'], as: "genre",
                through: {
                    attributes: [],
                }
            },
            attributes: ["idMovie", "titleMovie", "imgMovie", "release"],
            order: [['release', order]],
        })
        return movies;
    }catch(err){
        throw err;
    }
}

const getAllMovies = async () => {
    try {
        const movies = await Movie.findAll({
            attributes: ["idMovie", "titleMovie", "imgMovie", "release"],
        });
        return movies;
    } catch(err){
        throw err;
    }
}

const postMovies = async (imgMovie, titleMovie, release, score, genres, characters) => {
    try {
        const movieCreated = await Movie.create({imgMovie, titleMovie, release, score});
        if (genres) {
            genres.map(async(e) => {
                const genre = await Genre.findOne({
                    where: {
                        nameGenre: e
                    }
                })
                movieCreated.addGenre(genre)
            });
        }
        if (characters) {
            characters.map(async(e) => {
                const character = await Character.findOne({
                    where: {
                        nameCharacter: e
                    }
                })
                movieCreated.addCharacter(character)
            });
        }
        return "Movie created."
    } catch(err) {
        throw err;
    }
}

const deleteMovies = async (idMovie) => {
    try {
        const movieDeleted = await Movie.findByPk(idMovie);
        await movieDeleted.destroy();
        return "Movie deleted";
    } catch(err){
        throw err;
    }
}

const putMovies = async (idMovie, imgMovie, titleMovie, release, score, addCharacter, removeCharacter, addGenre, removeGenre) => {
    try{
        const movieEdited = await Movie.findByPk(idMovie)
        if(!movieEdited) throw new Error("ID not found.");
        if (titleMovie || imgMovie || release || score){
            await Movie.update({
                imgMovie, titleMovie, release, score
            }, {
                where: {
                    idMovie,
                }
            });
        }
        if (addCharacter) {
            addCharacter.map(async(e) => {
                const character = await Character.findOne({
                    where: {
                        nameCharacter: e
                    }
                })
                movieEdited.addCharacter(character)
            })
        }
        if (removeCharacter) {
            removeCharacter.map(async(e) => {
                const character = await Character.findOne({
                    where: {
                        titleMovie: e
                    }
                })
                movieEdited.removeCharacter(character)
            })
        }
        if (addGenre) {
            addGenre.map(async(e) => {
                const genre = await Genre.findOne({
                    where: {
                        nameGenre: e
                    }
                })
                movieEdited.addGenre(genre)
            })
        }
        if (removeGenre) {
            removeGenre.map(async(e) => {
                const genre = await Genre.findOne({
                    where: {
                        nameGenre: e
                    }
                })
                movieEdited.removeGenre(genre)
            })
        }
        return "Movie updated";
    } catch(err){
        throw err;
    }
}

module.exports = {
    getMovieById,
    getMovieByFilters,
    getAllMovies,
    postMovies,
    deleteMovies,
    putMovies
}