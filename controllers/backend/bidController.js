const Model = require("../../models/bidController");

exports.get = async (req, res, next) => {
  try {
    const customerId = req.params.id;
    console.log("id", customerId);
    const bidDetails = await Model.find({ customer_id: customerId }).populate("customer_id");

    if (!bidDetails || bidDetails.length === 0) {
      throw new Error("No bid details found for the specified customer ID");
    }

    res.status(200).json({ status: "success", data: bidDetails });
  } catch (error) {
    next(error);
  }
};
