const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  text1: {
    type: String,
  },
  text2: {
    type: String,
  },
});

const Updates = mongoose.model("Updates", Schema);
module.exports = Updates;
