const Model = require("../../models/withdraw");
const Customer = require("../../models/customerModel");
exports.getCustomerWithdraw = async (req, res, next) => {
  try {
    const response = await Model.find();
    res.status(200).json({ status: "success", data: response });
  } catch (e) {
    next(e);
  }
};

exports.withdrawStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    const newStatus = req.body.status;
    const data = await withdraw.findByIdAndUpdate(
      id,
      { $set: { status: newStatus } },
      { new: true }
    );
    res.status(200).json({ status: "success", data: data });
  } catch (error) {
    next(error);
  }
};

exports.getPendingWithdraw = async (req, res, next) => {
  try {
    const response = await Model.find({ status: "pending" }).populate(
      "customer_id"
    );
    res.status(200).json({ status: "success", data: response });
  } catch (e) {
    next(e);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    let newStatus = req.body.status.toLowerCase();

    const data = await Model.findByIdAndUpdate(
      id,
      { $set: { status: newStatus } },
      { new: true }
    );
    res.status(200).json({ status: "success", data: data });
  } catch (error) {
    next(error);
  }
};
