const Model = require("../../models/gameRateModel");

exports.getAll = async (req, res, next) => {
  try {
    let data = await Model.find();
    res.status(200).json({ status: "success", data: data });
  } catch (error) {
    next(error);
  }
};
