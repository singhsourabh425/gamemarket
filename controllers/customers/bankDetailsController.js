const Model = require("../../models/bankDetailsModel");
const Customer = require("../../models/customerModel");

exports.addAccount = async (req, res, next) => {
  try {
    const customerId = req.params.id;
    console.log("id", customerId);
    const { name, accountNumber, type, upi_id, ifsc_code } = req.body;

    // Create a new bank details record in the Model
    const bankDetails = new Model({
      name,
      accountNumber,
      type,
      upi_id,
      ifsc_code,
    });

    // Save the bank details record
    const savedBankDetails = await bankDetails.save();

    // Update the Customer model with the reference to the bank details record
    const customer = await Customer.findByIdAndUpdate(
      customerId,
      {
        $push: { payment_details: savedBankDetails._id },
      },
      { new: true } // To get the updated customer document
    );
    console.log("customer ", customer);
    // Respond with the updated customer document or any other response
    res.status(200).json({ status: "success", data: savedBankDetails });
  } catch (error) {
    next(error);
  }
};

exports.updateAccount = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, accountNumber, type, upi_id, ifsc_code } = req.body;

    // Use findByIdAndUpdate to update the existing document
    const updatedBankDetails = await Model.findByIdAndUpdate(
      id,
      {
        name,
        accountNumber,
        type,
        upi_id,
        ifsc_code,
      },
      { new: true, runValidators: true }
    );

    if (!updatedBankDetails) {
      return res
        .status(404)
        .json({ status: "fail", message: "Document not found" });
    }

    res.status(200).json({ status: "success", data: updatedBankDetails });
  } catch (error) {
    next(error);
  }
};
