const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    number: { type: Number},
    mob_number: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
