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
      type: String,
    },
    game_status :{
        type:String
    }
  },
  {
    timestamps: true,
  }
);

const Result = mongoose.model("Result", Schema);

module.exports = Result;
