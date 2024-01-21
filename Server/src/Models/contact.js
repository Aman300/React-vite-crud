const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contactSchema = new Schema(
  {
    contactName: {
      type: String,
      require: true,
      trim: true,
    },
    contactNumber: {
      type: Number,
      require: true,
      trim: true,
    },
    address: {
      type: String,
      require: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
