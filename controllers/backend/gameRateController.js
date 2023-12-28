const Model = require("../../models/gameRateModel");

exports.getAll = async (req, res, next) => {
  try {
    let data = await Model.find();
    res.status(200).json({ status: "success", data: data });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    const { name, rate } = req.body;

    const newGameRate = new Model({
      name,
      rate,
    });

    // Save the market to the database
    const result = await newGameRate.save();
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};

exports.getByIdandUpdate = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, rate } = req.body;

    const updatedGaneRate = await Model.findByIdAndUpdate(
      id,
      {
        name,
        rate,
      },

      { new: true }
    );

    if (!updatedGaneRate) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ status: "success", data: updatedGaneRate });
  } catch (error) {
    next(error);
  }
};
