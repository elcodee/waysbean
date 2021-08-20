const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users } = require("../models");

exports.Register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validateData = joi.object({
      fullName: joi.string().min(4).required(),
      email: joi.string().email().required(),
      password: joi.string().min(4).required(),
    });

    const { errors } = validateData.validate(req.body);

    console.log("ERR :", errors);

    if (errors) {
      return res.status(200).send({
        status: "failed",
        msg: errors.details[0].message,
      });
    }

    const checkEmail = await Users.findOne({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return res.status(200).send({
        status: "failed",
        msg: "Email Already Registered",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const dataUser = await Users.create({
      ...req.body,
      password: passwordHash,
    });

    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign(
      {
        id: dataUser.id,
      },
      secretKey
    );

    res.status(201).send({
      status: "success",
      msg: "Register Success",
      data: {
        user: {
          fullName: dataUser.fullName,
          email: dataUser.email,
          token,
        },
      },
    });
  } catch (error) {
    console.log("ERROR REGIS: ", error);
    res.status(500).send({
      status: "failed",
      msg: "Error Authentication",
    });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validateData = joi.object({
      email: joi.string().min(4).required(),
      password: joi.string().min(4).required(),
    });

    const { errors } = validateData.validate(req.body);

    if (errors) {
      return res.status(200).send({
        status: "failed",
        msg: errors.details[0].message,
      });
    }

    const checkEmail = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (!checkEmail) {
      return res.status(401).send({
        status: "failed",
        msg: "Email Or Password Incorrect | Email",
      });
    }

    const checkPassword = await bcrypt.compare(password, checkEmail.password);

    if (!checkPassword) {
      return res.status(401).send({
        status: "false",
        msg: "Email Or Password Incorrect | Password",
      });
    }

    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign(
      {
        id: checkEmail.id,
      },
      secretKey
    );

    res.status(200).send({
      status: "success",
      msg: "Login Success",
      data: {
        user: {
          fullName: checkEmail.fullName,
          email: checkEmail.email,
          role: checkEmail.role,
          token,
        },
      },
    });
  } catch (error) {
    console.log("ERR LOGIN : ", error);
    res.status(500).send({
      status: "false",
      msg: "Error Authentication",
    });
  }
};
