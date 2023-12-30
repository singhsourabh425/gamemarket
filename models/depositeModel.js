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
  },
  {
    timestamps: true,
  }
);

const Deposite = mongoose.model("Deposite", Schema);

module.exports = Deposite;
