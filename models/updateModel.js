const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  text: {
    type: String,
  },
});

const Updates = mongoose.model("Updates", Schema);
module.exports = Updates;
