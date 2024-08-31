const moment = require("moment");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: String, default: () => moment.utc().format() },
  updated_at: { type: String, default: () => moment.utc().format() },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  const hash = await bcrypt.hash(
    this.password,
    Number(process.env.BCRYPT_SALT)
  );
  this.password = hash;
  return next();
});

const User = mongoose.model("users", userSchema);

module.exports = User;
