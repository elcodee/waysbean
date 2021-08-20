"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transactions.belongsTo(models.Users, {
        as: "user",
        foreignKey: "user_id",
      });

      Transactions.belongsToMany(models.Products, {
        as: "products",
        through: {
          model: "Orders",
        },
        foreignKey: "trx_id",
      });
    }
  }
  Transactions.init(
    {
      user_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      postCode: DataTypes.INTEGER,
      attachment: DataTypes.STRING,
      status: DataTypes.STRING,
      order_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transactions",
      tableName: "Transactions",
    }
  );
  return Transactions;
};
