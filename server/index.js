const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");
const authRoute = require("./auth");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));
const PORT = 3000;
app.listen(PORT, () => console.log("server started on port -->" + PORT));
