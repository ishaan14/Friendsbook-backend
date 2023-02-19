const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//Register
router.post("/register", async (req, res) => {
  try {
    const { password, ...details } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await new User({
      ...details,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(404).json(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      let result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        res.status(200).json("Logged In Successfully");
      } else res.status(400).json("Unauthorized attempt");
    } else {
      res.status(404).json("Account Doesn't Exist");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
