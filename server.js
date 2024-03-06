require("dotenv").config();
var cors = require("cors");
const express = require("express");
const app = express();
const connectDB = require("./utils/db");
const User = require("./model/userSchema");
const path = require("path");
app.use(express.json());
app.use(cors());

const PORT = 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.post("/registration", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //  console.log(req.body);
    //check if user exists
    // if exist -> tell user to login not register -> use login function
    // if DNE -> create user

    const user = await User.findOne({ email: email });

    if (user) {
      res.send({ message: "user already created" });
    } else {
      User.create({
        email: req.body.email,
        password: req.body.password,
      });
      res.send({ message: "User Created" });
    }
  } catch (e) {
    res.send({ message: `Something went wrong`, error: e.message });
  }
});
app.post("login", (req, res) => {
  // check if user exists
  // if yes -> check password -> if correct -> login -> if not correct -> tell user to try again
  // if no -> tell user to register
  // console.log(req.body);

  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "succesfully login", user: user });
      } else {
        res.send({ message: "password didn't match" });
      }
    } else {
      res.send({ message: "user not registered" });
    }
  });

  // res.send({ message: "Test" });
});
