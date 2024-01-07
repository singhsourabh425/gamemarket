const Model = require("../../models/updateModel");

exports.create = async (req, res, next) => {
  try {
    const { text1, text2 } = req.body;
    const update = new Model({
      text1: text1,
      text2: text2,
    });

    const data = await update.save();
    res.status(200).json({ status: "success", data: data });
  } catch (e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { text1, text2 } = req.body;
    let id = req.params.id;
  
    let result = await Model.findOneAndUpdate(
      { _id: id }, 
      { $set: { text1: text1, text2: text2 } },
      { new: true }
    );
    
    if (!result) {
      return res.status(404).json({ status: "error", message: "Document not found" });
    }
  
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
