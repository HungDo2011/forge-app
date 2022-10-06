const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../model/User");
const { getPublicToken, getInternalToken } = require("./common/oauth");

const router = express.Router();

//Login to Forge App

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json("Email is not defined!");
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(404).json("Password is invalid!");
  }

  if (validPassword && user) {
    const { password, ...other } = user._doc;

    const token = await getPublicToken();

    res.status(200).json({
      ...other,
      token: {
        access_token: token.access_token,
        expires_in: token.expires_in,
      },
    });
  } else {
    res.status(500).json("Fail!");
  }
});

// Register account Forge

router.post("/register", async (req, res) => {
  try {
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    //Create new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashed,
    });

    //Save to database
    const user = await newUser.save();
    const token = await getPublicToken();

    const { password, ...other } = user._doc;
    //Response
    res.status(200).json({
      ...other,
      token: {
        access_token: token.access_token,
        expires_in: token.expires_in,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
