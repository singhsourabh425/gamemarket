const Customer = require("../../models/customerModel");
const Market = require("../../models/marketModel");
exports.dashboardCount = async (req, res, next) => {
  try {
    const customerCounts = await Customer.countDocuments();
    const marketCounts = await Market.countDocuments();
    const response = {
        customerCounts,
        marketCounts
    };
    res.status(200).json({status: 'success', data: response})
    console.log("response", response);
  } catch (e) {
    next(e);
  }
};
