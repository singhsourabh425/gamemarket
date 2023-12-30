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
    account_type :{
        type: mongoose.Schema.Types.ObjectId,
    }
  },
  {
    timestamps: true,
  }
);

const Withdraw = mongoose.model("Withdraw", Schema);

module.exports = Withdraw;
