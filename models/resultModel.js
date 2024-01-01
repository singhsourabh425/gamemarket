const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    type: {
      type: String,
    },
    game_name: {
      type: String,
    },
    market_name: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Market"
    },
    game_status :{
        type:String
    },
    result:{
      type:String
    },
    digit_number :{
      type:Number
    },
    amount:{
      type:Number
    },
  },
  {
    timestamps: true,
  }
);

const Result = mongoose.model("Result", Schema);

module.exports = Result;
