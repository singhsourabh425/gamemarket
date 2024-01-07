const Model = require("../../models/customerModel");
const bcrypt = require("bcrypt");
const { CUSTOMER_SATTA_KEY } = process.env;
const jwt = require("jsonwebtoken");
const Deposite = require("../../models/depositeModel");
const Admin = require("../../models/adminModel");
const accountSid = "ACdbb87cdaf9a66d876a297e291b6f159d";
const authToken = "b975ce2e9a5b5ca8358076c2c7b77310";
const Updates = require('../../models/updateModel')
const client = require("twilio")(accountSid, authToken);

exports.register = async (req, res, next) => {
  try {
    console.log("Customer req Body Create ", req.body);
    let response = await Model.findOne({ mob_no: req.body.mob_no });

    if (response) {
      res
        .status(500)
        .json({ status: "Error", data: "Customer Already Registered" });
      return;
    }
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

//Otp Vetrify Process
// exports.register = async (req, res, next) => {
//   try {
//     const { mob_no, password , name , email} = req.body;

//     const customerExist = await Model.findOne({ mobile: mob_no });
//     if (customerExist) {
//       return res.status(400).send("User Already Exists!");
//     }

//     const otp = Math.floor(1000 + Math.random() * 9000);
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const option = {
//       body: `Your verification code is ${otp}`,
//       to: `+91${mob_no}`,
//       from: "+12017464459",
//     };

//     const response = await client.messages.create(option);

//     if (response.status === "send" || response.status === "queued") {
//       const customer = new Model({
//         mob_no,
//         password: hashedPassword,
//         type: "Unapproved",
//         otp,
//         name,
//         email
//       });

//       const result = await customer.save();

//       const token = jwt.sign({ userId: result._id }, CUSTOMER_SATTA_KEY, {
//         expiresIn: "3d",
//       });

//       return res.status(200).send({message: "OTP Sent Successfully, Customer Created", token : token});
//     }
//   } catch (error) {
//     console.error("An error occurred:", error);
//     return res.status(400).send("Error occurred during registration");
//   }
// };

// exports.verify = async (req, res, next) => {
//   try {
//     const otp = req.body.otp;
//     const mob_no = req.body.mob_no;

//     const customer = await Model.findOne({ mob_no, otp });

//     console.log('customer', customer);
//     if (!customer) {
//       return res.status(400).json({ error: "Invalid OTP" });
//     }
//     customer.type = "approved";
//     await customer.save();
//     return res.status(200).json({ message: "OTP verified successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

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
      const data = new Deposite({
        customer_id: decodedToken.userId,
        amount: req.body.amount,
      });

      await data.save();
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

exports.getAdminUpi = async (req, res, next) => {
  try {
    const data = await Admin.findOne({
      _id: "658863e962889d30b1faa92d",
    }).select("upi");

    res.status(200).json({ status: "success", data: data });
  } catch (e) {
    next(e);
  }
};


exports.getUpdates = async(req,res,next)=>{
  try{
    const response = await Updates.find();
    res.status(200).json({status: 'success', data: response})
  }catch(e){
    next(e)
  }
}