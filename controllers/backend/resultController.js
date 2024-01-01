const Model = require("../../models/resultModel");

exports.getAllResult = async (req, res, next) => {
  try {
    const response = await Model.find().populate(['market_name', 'customer_id']);
    res.status(200).json({ status: "success", data: response });
  } catch (e) {
    next(e);
  }
};


