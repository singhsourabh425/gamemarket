const Model = require("../../models/bidController");

exports.create = async (req, res, next) => {
  try {
    const customerId = req.params.id;
    console.log("id", customerId);
    let { bid, type, game_name, market_name } = req.body;

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

    // Save the bank details record
    const savedBidDetails = await bidDetails.save();
    res.status(200).json({ status: "success", data: savedBidDetails });
  } catch (error) {
    next(error);
  }
};
