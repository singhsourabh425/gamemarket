const Model = require("../../models/bidController");

exports.create = async (req, res, next) => {
  try {
    const customerId = req.params.id;
    console.log("id", customerId);
    const { bid } = req.body;

    // Create a new bank details record in the Model
    const bidDetails = new Model({
      bid,
      customer_id: customerId,
    });

    // Save the bank details record
    const savedBidDetails = await bidDetails.save();
    res.status(200).json({ status: "success", data: savedBidDetails });
  } catch (error) {
    next(error);
  }
};
