const Model = require("../../models/customerModel");
const mongoosePaginate = require("mongoose-paginate-v2");
exports.addAmountCustomer = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { amount } = req.body;

    const parsedNewAmount = parseFloat(amount);

    if (isNaN(parsedNewAmount)) {
      return res.status(400).json({ msg: "Invalid newAmount value" });
    }

    const customer = await Model.findOne({ _id: id });

    if (!customer) {
      return res.status(404).json({ msg: "No Customer Found" });
    }
    const currentAmount = parseFloat(customer.amount || 0);
    if (isNaN(currentAmount)) {
      return res.status(500).json({ msg: "Invalid customer amount value" });
    }
    customer.amount = currentAmount + parsedNewAmount;
    const updatedCustomer = await customer.save();
    const { password: _, ...customerWithoutPassword } =
      updatedCustomer.toObject();
    res.status(200).json({ status: "success", data: customerWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", msg: "Internal Server Error" });
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const options = {
      page: req.query.page || 1,
      limit: req.query.limit || 10,
    };

    const response = await Model.find();
    res.status(200).json({ status: "success", data: response });
  } catch (e) {
    next(e);
  }
};
