const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    bid: {
      type: String,
    },
    type:{
      type: String,
    },
    game_name:{
      type:String
    },
    market_name:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Market'
    }
  },
  {
    timestamps: true,
  }
);

const Bid = mongoose.model("Bid", bidSchema);

module.exports = Bid;

