const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    idUser: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    nameUser: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          args: true,
          msg: "Name must be letters."
        },
        notNull: {
          msg: "Name cannot be null."
        }, 
        notEmpty: {
          args: true,
          msg: "Name is require."
        },
        len: {
          args: [2, 50],
          msg: "Name has to be between 2 and 50 characters."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Enter a valid email."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6,255],
          msg: "Minimun 6 characters in pass."
        }
      }
    },
  });
};
