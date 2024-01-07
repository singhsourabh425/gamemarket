const mongoose = require("mongoose");

const marketSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    open_time: {
      type: Date,
    },
    close_time: {
      type: Date,
    },
    first_number:{
      type: Number,
    },
    second_number:{
      type: String,
    },
    third_number:{
      type: Number,
    }

  },
  {
    timestamps: true,
  }
);

const Market = mongoose.model("Market", marketSchema);

module.exports = Market;
