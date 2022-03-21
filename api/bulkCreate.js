const { Genre } = require('./src/db.js');

module.exports = async function createInfo() {
    const genres = [{
        nameGenre: "Action",
        imgGenre: "http://www.elcolombiano.com/blogs/cinefagos/wp-content/uploads/2012/10/indestructibles.jpg"
      },
      {
        nameGenre: "Adventure",
        imgGenre: "https://www.diariocritico.com/fotos/1/325783_indiana_thumb_835.jpg"
      },
      {
        nameGenre: "Comedy",
        imgGenre: "https://www.lovevalencia.com/wp-content/uploads/2012/09/Comedia-americana-Filmoteca-Valencia.jpg"
      }]
    const genresValidate = await Genre.findAll();
    genresValidate.length === 0 &&
    await Genre.bulkCreate(genres)
}