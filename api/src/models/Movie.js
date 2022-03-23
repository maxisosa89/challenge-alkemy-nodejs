const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('movie', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    imgMovie: {
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
    titleMovie: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Name cannot be null."
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
    release: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: "Release must be date."
        },
      } 
    },
    score: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: "Score must be numbers."
        },
        
      }
    },
  });
};
