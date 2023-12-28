const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const GameRate = mongoose.model("gameRate", gameSchema);

module.exports = GameRate;
