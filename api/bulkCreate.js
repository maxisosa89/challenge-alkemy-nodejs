const { Genre, User, Role } = require('./src/db.js');
const bcrypt = require('bcryptjs')

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

    const roles = [{nameRole:"admin"}, {nameRole:"user"}]
    const rolesValidate = await Role.findAll();
    rolesValidate.length === 0 &&
    await Role.bulkCreate(roles)

    let password = bcrypt.hashSync("123456", 10)
    const user = {
      nameUser: "Maxi",
      email: "msosa89@outlook.com",
      password: password
    }
    const userValidate = await User.findAll();
    if (userValidate.length === 0){
      const userDev = await User.create(user)
      const rolesDev = await Role.findAll()
      rolesDev[0].addUser(userDev)
      rolesDev[1].addUser(userDev)
    }



}