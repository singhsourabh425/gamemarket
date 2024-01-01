const Model = require("../../models/bidController");

exports.create = async (req, res, next) => {
  try {
    console.log('Body', req.body);
    const customerId = req.params.id;
    console.log("id", customerId);
    let { bid, type, game_name, market_name } = req.body;
    // bid = JSON.stringify(bid);
    type = type.toLowerCase();
    game_name = game_name.toLowerCase();
    market_name = market_name.toLowerCase();
    // Create a new bank details record in the Model
    const bidDetails = new Model({
      bid,
      customer_id: customerId,
      type,
      game_name,
      market_name,
    });

    const savedBidDetails = await bidDetails.save();
    res.status(200).json({ status: "success", data: savedBidDetails });
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const customerId = req.params.id;
    const bidDetails = await Model.find({ customer_id: customerId }).populate([
      "customer_id","market_name"]
    );

    if (!bidDetails || bidDetails.length === 0) {
      throw new Error("No bid details found for the specified customer ID");
    }

    res.status(200).json({ status: "success", data: bidDetails });
  } catch (error) {
    next(error);
  }
};