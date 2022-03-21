const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('role', {
    role: {
      type: DataTypes.ENUM(["admin", "user"]),
      allowNull: false
    }
  });
};
