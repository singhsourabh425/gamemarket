const mongoose = require("mongoose");

const upiDetailsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
    },
    upi_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


const UpiDetails = mongoose.model("upiDetails",upiDetailsSchema )

module.exports = UpiDetails