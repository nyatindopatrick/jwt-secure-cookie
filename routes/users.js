const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/register", (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    console.log("please fill all fields");
  }
  const newUser = new User({
    name,
    email,
    password,
    role
  });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      newUser.password = hash;
      if (err) {
        console.log(err);
      }
      newUser
        .save()
        .then(user => {
          res.status(200).json({ user });
        })
        .catch(err => console.log(err));
    });
  });
});

router.post("/login", (req, res) => {
  const { email, password, role } = req.body;
});

module.exports = router;
