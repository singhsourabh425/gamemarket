const Model = require("../../models/updateModel");

exports.create = async (req, res, next) => {
  try {
    const { text } = req.body;
    const update = new Model({
      text: text,
    });

    const data = await update.save();
    res.status(200).json({ status: "success", data: data });
  } catch (e) {
    next(e);
  }
};
