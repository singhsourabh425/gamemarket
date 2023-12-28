const mongoose = require("mongoose");

const bankDetailsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    accountNumber: {
      type: Number,
    },
    type: {
      type: String,
    },
    ifsc_code: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const BankDetails = mongoose.model("bankDetails", bankDetailsSchema);

module.exports = BankDetails;
