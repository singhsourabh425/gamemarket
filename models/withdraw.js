const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    amount: {
      type: Number,
    },
    account_type: {
      type: String
    },
    status: {
      type: String,
      default: 'pending'
    },
  },
  {
    timestamps: true,
  }
);

const Withdraw = mongoose.model("Withdraw", Schema);

module.exports = Withdraw;
