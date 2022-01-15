const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const alias = "Turnos";
  const cols = {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
    shift : Sequelize.STRING
  };
  const config = {
    tableName: "Shifts",
    timestamps: false,
  };

  const Shift = sequelize.define(alias, cols, config);

  return Shift;
};