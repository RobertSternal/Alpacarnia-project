import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.json({
    message: "API test message",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(
      errorHandler(401, "Możesz aktualizować tylko swoje własne konto")
    );
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          pfpicture: req.body.pfpicture,
        },
      },
      { new: true }
    );

    const { password, ...userInfo } = updatedUser._doc;

    res.status(200).json(userInfo);
  } catch (error) {
    next(error);
  }
};
