const Model = require("../../models/depositeModel");

exports.getCustomerDeposite = async (req, res, next) => {
  try {
    const id = req.params.id;

    const response = await Model.find({ customer_id: id });

    res.status(200).json({ status: "success", data: response });
  } catch (e) {
    next(e);
  }
};
