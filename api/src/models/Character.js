const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('character', {
    idCharacter: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    imgCharacter: {
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
    nameCharacter: {
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
    age: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: "Age must be numbers."
        },
      },
    },
    weight: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: "Weight must be numbers."
        },  
      },
    },
    story: {
      type: DataTypes.TEXT,
      validate: {
        isAlphanumeric: {
          args: true,
          msg: "Story must be letters."
        }
      }
    },
  });
};
