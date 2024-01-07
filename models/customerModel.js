const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    mob_no: {
      type: String,
    },
    token: {
      type: String,
    },
    amount: {
      type: Number,
    },
    payment_details: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bankDetails",
    },
    upi_details: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "upiDetails",
    },
    otp: {
      type: String,
    },
    type: {
      type: String, 
    }
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
