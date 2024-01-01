const Model = require("../../models/marketModel");
const Bid = require("../../models/bidController");
const Result = require("../../models/resultModel");
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
    const { name, open_time, close_time } = req.body;

    // Get today's date
    const today = new Date();

    // Extract hours and minutes from the provided open_time and close_time
    const [openHours, openMinutes] = open_time.split(":").map(Number);
    const [closeHours, closeMinutes] = close_time.split(":").map(Number);

    // Set today's date for open_time
    const parsedOpenTime = new Date(today);
    parsedOpenTime.setHours(openHours, openMinutes, 0, 0);

    // Set today's date for close_time
    const parsedCloseTime = new Date(today);
    parsedCloseTime.setHours(closeHours, closeMinutes, 0, 0);

    const newMarket = new Model({
      name,
      open_time: parsedOpenTime,
      close_time: parsedCloseTime,
    });

    // Save the market to the database
    const result = await newMarket.save();
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};

exports.getByIdandUpdate = async (req, res, next) => {
  try {
    const id = req.params.id;
    let {
      open_time,
      name,
      close_time,
      first_number,
      second_number,
      third_number,
    } = req.body;

    // Check if open_time and close_time are provided, and if so, update them with today's date
    if (open_time && close_time) {
      // Get today's date
      const today = new Date();

      // Extract hours and minutes from the provided open_time and close_time
      const [openHours, openMinutes] = open_time.split(":").map(Number);
      const [closeHours, closeMinutes] = close_time.split(":").map(Number);

      // Set today's date for open_time
      open_time = new Date(today);
      open_time.setHours(openHours, openMinutes, 0, 0);

      // Set today's date for close_time
      close_time = new Date(today);
      close_time.setHours(closeHours, closeMinutes, 0, 0);
    }

    const updatedUser = await Model.findByIdAndUpdate(
      id,
      {
        open_time,
        close_time,
        name,
        first_number,
        second_number,
        third_number,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    
    if (second_number) {

      const bids = await Bid.find({
        game_name: "jodi",
        market_name: id,
      });
      const results = [];
      console.log("BID", bids);

      for (const bid of bids) {
        try {
          const bidArray = JSON.parse(bid.bid);
          console.log("Type of bidArray:", bidArray[0].digit_number);

          if (!Array.isArray(bidArray)) {
            // Handle the case where bidArray is not an array
            console.log("Raw content of bid.bid:", bid.bid);
            continue; // Skip to the next iteration
          }

          for (const item of bidArray) {
            const matchingDigit = item.digit_number === parseInt(second_number);
            const game_status = matchingDigit ? "win" : "loss";
            console.log('item',item.digit_number);
            results.push({
              customer_id: bid.customer_id,
              market_name: bid.market_name,
              digit_number: item.digit_number,
              amount: item.amount,
              game_status,
            });
          }
        } catch (error) {
          console.error("Error parsing bid string:", error);
          continue;
        }
      }
      await Result.insertMany(results);
    }


    
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

exports.getByIdandDelete = async (req, res, next) => {
  try {
    let deletedMarket = await Model.findByIdAndDelete(req.params.id);
    if (!deletedMarket) {
      return res.status(400).json({ error: "No Market with such ID Found!" });
    }
    res.status(200).json({ status: "Succesfully Deleted" });
  } catch (error) {
    next(error);
  }
};
