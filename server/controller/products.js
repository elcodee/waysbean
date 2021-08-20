const { Products, Orders } = require("../models");

exports.Getproducts = async (req, res) => {
  try {
    const data = await Products.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log("ERR :", error);
  }
};

exports.Getproduct = async (req, res) => {
  try {
    const data = await Products.findOne({
      where: {
        id: req.params.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log("ERR :", error);
  }
};
