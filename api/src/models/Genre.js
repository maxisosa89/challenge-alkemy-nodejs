const { DataTypes, ValidationError } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genre', {
    idGenre: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    nameGenre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name cannot be null."
        },
        isAlphanumeric: {
          args: true,
          msg: "Name must be letters."
        },
        notEmpty: {
          args: true,
          msg: "Name is require."
        },
        len: {
          args: [2, 255],
          msg: "Name has to be between 2 and 255 characters."
        }
      }
    },
    imgGenre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          args: true,
          msg: "Image must be url."
        },
        notNull: {
          msg: "Image cannot be null."
        },
        notEmpty: {
          args: true,
          msg: "Image is require."
        },
      },
    },
  });
};
