const Model = require("../../models/resultModel");

exports.getAllResult = async (req, res, next) => {
  try {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    // const response = await Model.find().populate(['market_name', 'customer_id']);
    const response = await Model.find({
      createdAt: { $gte: threeDaysAgo },
    })
      .sort({ createdAt: -1 })
      .populate(['market_name', 'customer_id']);
    res.status(200).json({ status: "success", data: response });

  } catch (e) {
    next(e);
  }
};

exports.getByIdAndUpdate = async (req, res, next) => {
  try {
    const id = req.params.id
    const checked = req.body.checked
    const response = await Model.findByIdAndUpdate(id, { checked: checked }, { new: true });
    if (response) {

      res.status(200).json({status: 'success', data: response});
    } else {
      // If the document with the provided id is not found
      res.status(404).json({ message: 'Document not found' });
    }
  } catch (e) {
    next(e);
  }
};


