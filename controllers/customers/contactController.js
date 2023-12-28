const Model = require("../../models/contactModel");

exports.add = async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    console.log("req.bodyjshfhui");
    const { mob_number, number } = req.body;

    const contact = new Model({ mob_number, number });

    // Save the market to the database
    const result = await contact.save();
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};


exports.get = async (req, res, next) => {
    try {
      const contacts = await Model.find();
      res.status(200).json({ status: "success", data: contacts });
    } catch (error) {
      next(error);
    }
  };
  

  