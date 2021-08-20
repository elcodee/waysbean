const { Router } = require("express");
const route = Router();
const { auth } = require("../middleware/auth");
const { Getproducts, Getproduct } = require("../controller/products");
const { Register, Login } = require("../controller/auth");
const {
  checkAuth,
  GetUser,
  GetMyTransactions,
  PostNewTransaction,
} = require("../controller/member");
const {
  PostProduct,
  GetTransactions,
  PostTransaction,
} = require("../controller/owner");
const { uploadImg } = require("../middleware/upload");

// Products
route.get("/products", Getproducts);
route.get("/product/:id", Getproduct);

// Authentication
route.post("/register", Register);
route.post("/login", Login);
route.get("/check", auth, checkAuth);

// Member
route.get("/user/:id", GetUser);
route.get("/my-transactions", auth, GetMyTransactions);
route.post("/transactionn", auth, uploadImg("attachment"), PostNewTransaction);

// Owner
route.post("/product", auth, uploadImg("photo"), PostProduct);
route.get("/transactions", auth, GetTransactions);
route.patch("/transaction/:id", auth, PostTransaction);

module.exports = route;
