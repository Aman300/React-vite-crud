const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    user_email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    user_password: {
      type: String,
      require: true,
      trim: true,
    },
    user_name: {
      type: String,
      require: true,
      trim: true,
    },
    user_dob: {
      type: String,
      trim: true,
    },
    user_address: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
