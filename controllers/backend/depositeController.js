const Model = require("../../models/depositeModel");

exports.getCustomerDeposite = async (req, res, next) => {
  try {
    const response = await Model.find();
    res.status(200).json({ status: "success", data: response });
  } catch (e) {
    next(e);  
  }
};
