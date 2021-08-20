require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const router = require("./router/api");

app.use(cors());
app.use(express.json());

// Route API V1
app.use("/api/v1", router);

// Static Path
app.use(
  "/uploads/beans",
  express.static(path.join(__dirname, "uploads/beans"))
);

app.use(
  "/uploads/proof",
  express.static(path.join(__dirname, "uploads/proof"))
);

// Running On Port
app.listen(5000);
