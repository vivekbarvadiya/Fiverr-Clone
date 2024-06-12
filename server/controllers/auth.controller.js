const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("../utils/createErrors");
require("dotenv").config();

exports.register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();

    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createError(404, "User not found"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return next(createError(404, "Wrong Password"));

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );

    const { password, ...others } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(others);
  } catch (error) {
    next(error);
  }
};

exports.logOut = (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out");
};
