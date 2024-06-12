const User = require("../models/user.model");
const createError = require("../utils/createErrors");

exports.deleteUser = async (req, res,next) => {
  try {
    const user = await User.findById(req.params.id);

    if (req.userId !== user._id.toString()) {
      return next(createError(403,"You can delete only your account"));
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("user deleted successfully");
  } catch (err) {
    next(err)
  }
};


exports.getUser = async (req, res,next) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).send(user);
  } catch (err) {
    next(err)
  }
};

exports.updateUser = async (req, res) => {
  res.send("okkkk");
};
