const Model = require("../../models/resultModel");

exports.getResult = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("id", id);
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    // const response = await Model.find({customer_id:id}).populate('market_name');
    const response = await Model.find({
      customer_id: id,
      createdAt: { $gte: threeDaysAgo },
    })
      .sort({ createdAt: -1 })
      .populate("market_name");
    res.status(200).json({ status: "success", data: response });
  } catch (e) {
    next(e);
  }
};
