const { Users, Transactions, Products } = require("../models");

exports.PostProduct = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.idUser,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    switch (user.role) {
      case "owner":
        const productData = await Products.create({
          ...req.body,
          photo: process.env.IMG_URL + req.files.photo[0].filename,
        });

        return res.status(200).send({
          status: "Success",
          msg: "Add Success",
          data: productData,
        });
      case "member":
        return res.status(401).send({
          status: "failed",
          msg: "Dont Have Permission",
        });
      default:
        console.log("ERR PERMISSON");
        break;
    }
  } catch (error) {
    console.log("ERROR ADD: ", error);
    res.status(500).send({
      status: "failed",
      msg: "Error Authentication",
    });
  }
};

exports.GetTransactions = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.idUser,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    switch (user.role) {
      case "owner":
        const transactions = await Transactions.findAll({
          attributes: {
            exclude: ["createdAt", "updatedAt", "user_id", "order_id"],
          },
          include: [
            {
              model: Users,
              as: "user",
              attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
              },
            },
            {
              model: Products,
              as: "products",
              attributes: {
                exclude: ["createdAt", "updatedAt", "stock"],
              },
              through: {
                attributes: [["orderQuantity", "qty"]],
                as: "orderQuantity",
              },
            },
          ],
        });

        return res.status(200).send({
          status: "success",
          msg: "Success GET Transactions",
          data: {
            transactions,
          },
        });
      case "member":
        return res.status(401).send({
          status: "failed",
          msg: "Dont Have Permission",
        });
      default:
        console.log("ERR PERMISSON");
        break;
    }
  } catch (error) {
    console.log("ERR TRX: ", error);

    res.status(404).send({
      status: "failed",
      msg: "Failed GET Transactions",
    });
  }
};

exports.PostTransaction = async (req, res) => {
  try {
    await Transactions.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const transactions = await Transactions.findOne({
      where: {
        id: req.params.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "user_id", "order_id"],
      },
      include: [
        {
          model: Users,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: Products,
          as: "products",
          attributes: {
            exclude: ["createdAt", "updatedAt", "stock"],
          },
          through: {
            attributes: [["orderQuantity", "qty"]],
            as: "orderQuantity",
          },
        },
      ],
    });

    res.status(200).send({
      status: "success",
      msg: "Success Update Transactions",
      data: {
        transactions,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      msg: "Failed Update Transactions",
    });
  }
};
