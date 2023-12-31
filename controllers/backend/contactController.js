const Model = require("../../models/contactModel");

exports.add = async (req, res, next) => {
  try {
    const { mob_number, number } = req.body;

    const contact = new Model({ mob_number, number });

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

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { mob_number, number } = req.body;
    const data = await Model.findByIdAndUpdate(
      id,
      { $set: { mob_number, number } },
      { new: true }
    );

    res.status(200).json({ status: "success", data: data });
  } catch (error) {
    next(error);
  }
};
