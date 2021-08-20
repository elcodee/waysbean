const { Users, Transactions, Orders, Products } = require("../models");

exports.checkAuth = async (req, res) => {
  try {
    const id = req.idUser;

    const userData = await Users.findOne({
      where: {
        id: id,
      },
    });

    switch (!userData) {
      case true:
        return res.status(401).send({
          status: "failed",
          msg: "User Not Registred",
        });
      case false:
        return res.status(200).send({
          status: "success",
          data: {
            id: userData.id,
            email: userData.email,
            fullName: userData.fullName,
            role: userData.role,
          },
        });
      default:
        console.log("unknown");
    }
  } catch (error) {
    console.log("ERR CHECK AUTH: ", error);
    res.status(401).send({
      status: "failed",
      msg: "User Not Registred",
    });
  }
};

exports.GetUser = async (req, res) => {
  try {
    //     console.log("ID USER: ", req.params.id);
    const user = await Users.findOne({
      where: {
        id: req.params.id,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      status: "success",
      msg: `Success GET User ID : ${user.id}`,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(404).send({
      status: "failed",
      msg: `Failed GET User ID : ${user.id}`,
    });
  }
};

exports.GetMyTransactions = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.idUser,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    const transactions = await Transactions.findAll({
      where: {
        user_id: req.idUser,
      },
      attributes: {
        exclude: ["updatedAt", "user_id", "order_id"],
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
        user,
        transactions,
      },
    });
  } catch (error) {
    console.log("ERR TRX: ", error);

    res.status(404).send({
      status: "failed",
      msg: "Failed GET Transactions",
    });
  }
};

exports.PostNewTransaction = async (req, res) => {
  try {
    const data = {
      ...req.body,
      user_id: req.idUser,
      status: "Waiting Approve",
      products: JSON.parse(req.body.products),
    };

    const transaction = await Transactions.create({
      ...data,
      attachment: process.env.IMG_PROOF_URL + req.files.attachment[0].filename,
    });

    data.products.map(async (item) => {
      const productSold = await Products.findOne({
        where: {
          id: item.id,
        },
      });

      const sold = {
        sold: productSold.sold + item.orderQuantity,
      };

      Products.update(sold, {
        where: {
          id: productSold.id,
        },
      });

      Orders.create({
        orderQuantity: item.orderQuantity,
        trx_id: transaction.id,
        product_id: item.id,
      });
    });

    const transactions = await Transactions.findAll({
      where: {
        user_id: req.idUser,
      },
      attributes: {
        exclude: ["updatedAt", "user_id", "order_id"],
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
      status: "Success",
      msg: "Add Success",
      data: transactions,
    });
  } catch (error) {
    console.log("ERROR ADD: ", error);
    res.status(500).send({
      status: "failed",
      msg: "Error Add Transactions",
    });
  }
};
