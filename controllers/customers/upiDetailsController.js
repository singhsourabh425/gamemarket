const Model = require("../../models/upiDetailsModel");
const Customer = require("../../models/customerModel");

exports.addAccount = async (req, res, next) => {
  try {
    const customerId = req.params.id;
    const { type, upi_id } = req.body;

    // Create a new bank details record in the Model
    const bankDetails = new Model({
      type,
      upi_id,
    });

    // Save the bank details record
    const savedBankDetails = await bankDetails.save();

    // Update the Customer model with the reference to the bank details record
    const customer = await Customer.findByIdAndUpdate(
      customerId,
      {
        $push: { upi_details: savedBankDetails._id },
      },
      { new: true } // To get the updated customer document
    );

    // Respond with the updated customer document or any other response
    res.status(200).json({ status: "success", data: savedBankDetails });
  } catch (error) {
    next(error);
  }
};

exports.updateAccount = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { type, upi_id } = req.body;

    const updatedUpiDetails = await Model.findByIdAndUpdate(
      id,
      {
        type,
        upi_id,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUpiDetails) {
      return res
        .status(404)
        .json({ status: "fail", message: "Document not found" });
    }

    res.status(200).json({ status: "success", data: updatedUpiDetails });
  } catch (error) {
    next(error);
  }
};
