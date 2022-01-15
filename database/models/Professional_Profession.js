const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const alias = "Union Profesional-Rubro";
  const cols = {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    professional_id: Sequelize.STRING,
    profession_id: Sequelize.STRING,
  };
  const config = {
    tableName: "Professionals_Professionals",
    timestamps: false,
  };

  const Professional_Professional = sequelize.define(alias, cols, config);

  return Professional_Professional;
};
