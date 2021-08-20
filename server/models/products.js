"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Products.belongsToMany(models.Transactions, {
        through: {
          model: "Orders",
        },
        foreignKey: "product_id",
      });
    }
  }
  Products.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.STRING,
      description: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      sold: DataTypes.INTEGER,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Products",
      tableName: "products",
    }
  );
  return Products;
};
