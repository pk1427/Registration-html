require("dotenv").config();
var cors = require("cors");
const express = require("express");
const app = express();
const connectDB = require("./utils/db");
const User = require("./model/userSchema");
app.use(express.json());
app.use(cors());

const PORT = 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/registration", async (req, res) => {
  console.log(req.body);
  //check if user exists
  // if exist -> tell user to login not register -> use login function
  // if DNE -> create user
  

  await User.create({
    email: req.body.email,
    password: req.body.password,
  });
  res.send({ message: "User Created" });
});
app.post("login", (req, res) => {
  // check if user exists
  // if yes -> check password -> if correct -> login -> if not correct -> tell user to try again
  // if no -> tell user to register
  console.log(req.body);
  res.send({ message: "Test" });
});
