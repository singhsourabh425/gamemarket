const Model = require("../../models/adminModel");
const bcrypt = require("bcrypt");
const { ADMIN_SATTA_KEY } = process.env;
// const jwt = require('jwt')

exports.create = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(
      req.body.password + ADMIN_SATTA_KEY,
      10
    );
    let admin = new Model({ ...req.body, password: hashedPassword });
    const result = await admin.save();

    res.status(201).json({ status: "sucess", data: result });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { mob_no, password } = req.body;
    console.log("Body", req.body.mob_no);
    const user = await Model.findOne({ mob_no }).exec();
    console.log("Body", user);
    if (!user) {
      throw new Error("User not found!");
    }
    const passwordMatch = await bcrypt.compare(
      password + ADMIN_SATTA_KEY,
      user.password
    );

    if (!passwordMatch) {
      throw new Error("Password is incorrect!");
    }
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(200).json({ status: "success", data: userWithoutPassword });
  } catch (error) {
    next(error);
  }
};

exports.getByIdandUpdate = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { mob_no, name } = req.body;
    const updatedUser = await Model.findByIdAndUpdate(
      id,
      { mob_no, name },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

exports.getByIdandDelete = async (req, res, next) => {
  try {
    let deletedUser = await Model.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(400).json({ error: "No User with such ID Found!" });
    }
    res.status(200).json({ status: "Succesfully Deleted" });
  } catch (error) {
    next(error);
  }
};
