const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const alias = "Client";
  const cols = {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    cuit: Sequelize.INTEGER,
    mobile: Sequelize.BIGINT,
    avatar: Sequelize.STRING,
    password: Sequelize.STRING,
    adress: Sequelize.STRING,
    city_Id: Sequelize.STRING,
    cart_Id: Sequelize.STRING,
    role: Sequelize.STRING,
  };
  const config = {
    tableName: "clients",
    timestamps: false,
  };

  const Client = sequelize.define(alias, cols, config);

  return Client;
};
