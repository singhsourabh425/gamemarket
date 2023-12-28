const Model = require("../../models/customerModel");
const bcrypt = require("bcrypt");
const { CUSTOMER_SATTA_KEY } = process.env;
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    console.log("Customer req Body Create ", req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let customer = new Model({ ...req.body, password: hashedPassword });
    const result = await customer.save();
    const token = jwt.sign({ userId: result._id }, CUSTOMER_SATTA_KEY, {
      expiresIn: "3d",
    });

    res.status(201).json({ status: "success", data: result, token });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { mob_no, password } = req.body;
    // console.log("Body", req.body.mob_no);
    const user = await Model.findOne({ mob_no }).exec();
    // console.log("Body", user);
    if (!user) {
      throw new Error("User not found!");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Password is incorrect!");
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, CUSTOMER_SATTA_KEY, {
      expiresIn: "3d",
    });
    user.token = token;
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(200).json({ status: "success", data: userWithoutPassword });
  } catch (error) {
    next(error);
  }
};

exports.profile = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // Verify and decode the token
    const decodedToken = jwt.verify(token, CUSTOMER_SATTA_KEY);

    // Fetch user data based on the decoded token's userId
    const user = await Model.findById(decodedToken.userId)
      .populate("upi_details")
      .populate("payment_details")
      .exec();

    if (!user) {
      throw new Error("User not found!");
    }
    if (user.upi_details instanceof Error) {
      throw user.upi_details;
    }

    if (user.payment_details instanceof Error) {
      throw user.payment_details;
    }

    // Exclude the password from the user data
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(200).json({ status: "success", data: userWithoutPassword });
  } catch (error) {
    next(error);
  }
};

// Update User Profile
exports.updateProfile = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw new Error("Authorization header is missing");
    }

    const token = authorizationHeader.split(" ")[1];

    try {
      const decodedToken = jwt.verify(token, CUSTOMER_SATTA_KEY);

      const user = await Model.findById(decodedToken.userId).exec();

      if (!user) {
        throw new Error("User not found!");
      }

      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      const updatedUser = await user.save();
      const { password: _, ...userWithoutPassword } = updatedUser.toObject();

      res.status(200).json({ status: "success", data: userWithoutPassword });
    } catch (jwtError) {
      if (jwtError.name === "JsonWebTokenError") {
        // Handle malformed token error
        throw new Error("Malformed token");
      } else {
        throw jwtError;
      }
    }
  } catch (error) {
    next(error);
  }
};

exports.addAmount = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw new Error("Authorization header is missing");
    }

    const token = authorizationHeader.split(" ")[1];

    try {
      const decodedToken = jwt.verify(token, CUSTOMER_SATTA_KEY);

      const user = await Model.findById(decodedToken.userId).exec();

      if (!user) {
        throw new Error("User not found!");
      }

      console.log("Req.body", req.body);
      // If the user has an amount, add the new amount to it; otherwise, use the new amount
      const newAmount = req.body.amount || 0;
      user.amount = user.amount
        ? Number(user.amount) + Number(newAmount)
        : Number(newAmount);

      const updatedUser = await user.save();
      const { password: _, ...userWithoutPassword } = updatedUser.toObject();

      res.status(200).json({ status: "success", data: userWithoutPassword });
    } catch (jwtError) {
      if (jwtError.name === "JsonWebTokenError") {
        // Handle malformed token error
        throw new Error("Malformed token");
      } else {
        throw jwtError;
      }
    }
  } catch (error) {
    next(error);
  }
};
