const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

dotenv.config();

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).exec();

    if (!user) {
      return res
        .status(200)
        .send({ status: false, message: "Invalid email address." });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (isPasswordCorrect) {
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, userEmail: user.email, userLevel: "user" },
        process.env.JWT_SECRET,
        {
          algorithm: "HS256",
          expiresIn: "3d",
        }
      );

      await user.save();

      return res.status(200).send({
        status: true,
        accessToken: token,
        data: user,
        message: "User logged in successfully.",
      });
    } else {
      return res
        .status(200)
        .send({ status: false, message: "Invalid password." });
    }
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email }).exec();

    if (user) {
      return res
        .status(200)
        .send({ status: false, message: "Email address already exists." });
    }

    const newUser = User({
      name,
      email,
      password,
    });

    await newUser.save();

    return res.status(201).send({
      status: true,
      data: newUser,
      message: "User created successfully.",
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};
