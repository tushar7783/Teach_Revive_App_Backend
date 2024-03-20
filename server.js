require("dotenv");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
// connection
mongoose
  .connect("mongodb://127.0.0.1:27017/TeachReviveApp")
  .then(() => {
    console.log("Mongodb connect");
  })
  .catch((error) => {
    console.log(error);
  });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("api running");
});

app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`App Listening On PORT: ${PORT}`);
});
