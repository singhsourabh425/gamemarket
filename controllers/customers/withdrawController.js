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

exports.withdraw = async (req, res, next) => {
  try {
    const customerId = req.params.id;
    const { amount, account_type } = req.body;

    const withdrawalAmount = parseInt(amount);

    // if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
    //   return res.status(400).json({ status: "error", message: "Invalid withdrawal amount" });
    // }

    // const customer = await Customer.findById(customerId);

    // if (!customer) {
    //   return res.status(404).json({ status: "error", message: "Customer not found" });
    // }

    // if (customer.amount < withdrawalAmount) {
    //   return res.status(400).json({ status: "error", message: "Insufficient balance" });
    // }

    // customer.amount -= withdrawalAmount;
    // await customer.save();

    const withdraw = new Model({
      customer_id: customerId,
      amount: withdrawalAmount,
      account_type,
    });

    const data = await withdraw.save();

    res.status(200).json({ status: "success", data: data });
  } catch (error) {
    next(error);
  }
};
