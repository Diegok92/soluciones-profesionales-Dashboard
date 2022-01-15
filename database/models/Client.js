const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const alias = "Clientes";
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
    city: Sequelize.STRING,
    cart: Sequelize.STRING,
    role: Sequelize.STRING,
  };
  const config = {
    tableName: "Clients",
    timestamps: false,
  };

  const Client = sequelize.define(alias, cols, config);

  return Client;
};
