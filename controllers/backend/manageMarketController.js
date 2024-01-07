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
    //Jodi
    if (second_number.length == 2) {
      const bids = await Bid.find({
        game_name: "jodi",
        market_name: id,
        marked: "no",
      });
      if (bids) {
        const results = [];
        for (const bid of bids) {
          try {
            const bidArray = JSON.parse(bid.bid);
            // console.log("Type of bidArray:", bidArray[0].digit_number);

            if (!Array.isArray(bidArray)) {
              // Handle the case where bidArray is not an array
              console.log("Raw content of bid.bid:", bid.bid);
              continue;
            }

            for (const item of bidArray) {
              const matchingDigit = item.digit_number === second_number + "";
              console.log("matchingDigit", matchingDigit);
              const game_status = matchingDigit ? "win" : "loss";
              // return
              results.push({
                customer_id: bid.customer_id,
                market_name: bid.market_name,
                digit_number: item.digit_number,
                amount: item.amount,
                game_status: game_status,
                game_name: bid.game_name,
                type: bid.type,
                winning_number: second_number,
              });
            }
          } catch (error) {
            console.log("error", error);
            res.status(500).json({ status: "error", data: error });
          }
        }
        const data = await Result.insertMany(results);
        if (data) {
          const bids = await Bid.updateMany(
            {
              game_name: "jodi",
              market_name: id,
              marked: "no",
            },
            {
              $set: {
                marked: "yes",
              },
            }
          );
        }
      }
    }
    //Single Digit Open
    if (second_number) {
      const second_number_string = second_number.toString();
      const firstDigit = second_number_string[0];

      const bids = await Bid.find({
        game_name: "singledigit",
        type: "open",
        market_name: id,
        marked: "no",
      });
      // console.log("bidsssssss", bids);
      if (bids) {
        const results = [];
        for (const bid of bids) {
          try {
            const bidArray = JSON.parse(bid.bid);

            if (!Array.isArray(bidArray)) {
              // Handle the case where bidArray is not an array
              console.log("Raw content of bid.bid:", bid.bid);
              continue;
            }

            for (const item of bidArray) {
              const matchingDigit =
                parseInt(item.digit_number) === parseInt(firstDigit);

              console.log("number ", item.digit_number, "jj ", firstDigit);

              const game_status = matchingDigit ? "win" : "loss";
              // return
              results.push({
                customer_id: bid.customer_id,
                market_name: bid.market_name,
                digit_number: item.digit_number,
                amount: item.amount,
                game_status: game_status,
                game_name: bid.game_name,
                type: bid.type,
                winning_number: second_number,
              });
            }
          } catch (e) {
            next(e);
          }
        }
        const data = await Result.insertMany(results);
        if (data) {
          const bids = await Bid.updateMany(
            {
              game_name: "singledigit",
              type: "open",
              market_name: id,
              marked: "no",
            },
            {
              $set: {
                marked: "yes",
              },
            }
          );
        }
      }
    }
    //Single Digit Close
    if (second_number.length==2) {
      const second_number_string = second_number.toString();
      const lastDigit = second_number_string[1];

      const bids = await Bid.find({
        game_name: "singledigit",
        type: "close",
        market_name: id,
        marked: "no",
      });
      if (bids) {
        const results = [];
        for (const bid of bids) {
          try {
            const bidArray = JSON.parse(bid.bid);

            if (!Array.isArray(bidArray)) {
              // Handle the case where bidArray is not an array
              console.log("Raw content of bid.bid:", bid.bid);
              continue;
            }

            for (const item of bidArray) {
              const matchingDigit =
                parseInt(item.digit_number) === parseInt(lastDigit);

              console.log("number ", item.digit_number, "jj ", lastDigit);

              const game_status = matchingDigit ? "win" : "loss";
              // return
              results.push({
                customer_id: bid.customer_id,
                market_name: bid.market_name,
                digit_number: item.digit_number,
                amount: item.amount,
                game_status: game_status,
                game_name: bid.game_name,
                type: bid.type,
                winning_number: second_number,
              });
            }
          } catch (e) {
            next(e);
          }
        }
        const data = await Result.insertMany(results);
        if (data) {
          const bids = await Bid.updateMany(
            {
              game_name: "singledigit",
              type: "close",
              market_name: id,
              marked: "no",
            },
            {
              $set: {
                marked: "yes",
              },
            }
          );
        }
      }
    }
    // panna open
    if (first_number) {
      const bids = await Bid.find({
        game_name: {
          $in: ["panna", "singlepanna", "doublepanna", "triplepanna"],
        },
        type: "open",
        market_name: id,
        marked: "no",
      });

      if (bids) {
        const results = [];
        for (const bid of bids) {
          try {
            const bidArray = JSON.parse(bid.bid);

            if (!Array.isArray(bidArray)) {
              // Handle the case where bidArray is not an array
              console.log("Raw content of bid.bid:", bid.bid);
              continue;
            }

            for (const item of bidArray) {
              const matchingDigit =
                parseInt(item.digit_number) === parseInt(first_number);

              console.log("number ", matchingDigit);
              const game_status = matchingDigit ? "win" : "loss";
              // return
              results.push({
                customer_id: bid.customer_id,
                market_name: bid.market_name,
                digit_number: item.digit_number,
                amount: item.amount,
                game_status: game_status,
                game_name: bid.game_name,
                type: bid.type,
                winning_number: first_number,
              });
            }
          } catch (e) {
            next(e);
          }
        }
        const data = await Result.insertMany(results);
        if (data) {
          const bids = await Bid.updateMany(
            {
              game_name: {
                $in: ["panna", "singlepanna", "doublepanna", "triplepanna"],
              },
              type: "open",
              market_name: id,
              marked: "no",
            },
            {
              $set: {
                marked: "yes",
              },
            }
          );
        }
      }
    }

    // panna close
    if (third_number) {
      const bids = await Bid.find({
        game_name: {
          $in: ["panna", "singlepanna", "doublepanna", "triplepanna"],
        },
        type: "close",
        market_name: id,
        marked: "no",
      });

      if (bids) {
        const results = [];
        for (const bid of bids) {
          try {
            const bidArray = JSON.parse(bid.bid);

            if (!Array.isArray(bidArray)) {
              // Handle the case where bidArray is not an array
              console.log("Raw content of bid.bid:", bid.bid);
              continue;
            }

            for (const item of bidArray) {
              const matchingDigit =
                parseInt(item.digit_number) === parseInt(third_number);

              console.log("number ", matchingDigit);
              const game_status = matchingDigit ? "win" : "loss";
              // return
              results.push({
                customer_id: bid.customer_id,
                market_name: bid.market_name,
                digit_number: item.digit_number,
                amount: item.amount,
                game_status: game_status,
                game_name: bid.game_name,
                type: bid.type,
                winning_number: third_number,
              });
            }
          } catch (e) {
            next(e);
          }
        }
        const data = await Result.insertMany(results);
        if (data) {
          const bids = await Bid.updateMany(
            {
              game_name: { $in: ["panna", "singlepanna", "doublepanna"] },
              type: "close",
              market_name: id,
              marked: "no",
            },
            {
              $set: {
                marked: "yes",
              },
            }
          );
        }
      }
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// exports.getByIdandUpdate = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     let {
//       open_time,
//       name,
//       close_time,
//       first_number,
//       second_number,
//       third_number,
//     } = req.body;

//     // Check if open_time and close_time are provided, and if so, update them with today's date
//     if (open_time && close_time) {
//       // Get today's date
//       const today = new Date();

//       // Extract hours and minutes from the provided open_time and close_time
//       const [openHours, openMinutes] = open_time.split(":").map(Number);
//       const [closeHours, closeMinutes] = close_time.split(":").map(Number);

//       // Set today's date for open_time
//       open_time = new Date(today);
//       open_time.setHours(openHours, openMinutes, 0, 0);

//       // Set today's date for close_time
//       close_time = new Date(today);
//       close_time.setHours(closeHours, closeMinutes, 0, 0);
//     }

//     const updatedUser = await Model.findByIdAndUpdate(
//       id,
//       {
//         open_time,
//         close_time,
//         name,
//         first_number,
//         second_number,
//         third_number,
//       },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     if (second_number) {
//       const bids = await Bid.find({
//         game_name: "jodi",
//         market_name: id,
//       });
//       const results = [];
//       for (const bid of bids) {
//         try {
//           const bidArray = JSON.parse(bid.bid);
//           // console.log("Type of bidArray:", bidArray[0].digit_number);

//           if (!Array.isArray(bidArray)) {
//             // Handle the case where bidArray is not an array
//             console.log("Raw content of bid.bid:", bid.bid);
//             continue;
//           }

//           for (const item of bidArray) {
//             const matchingDigit =
//             parseInt(item.digit_number) === parseInt(second_number);

//             console.log("number ", matchingDigit);
//             const game_status = matchingDigit ? "win" : "loss";
//             // return
//             results.push({
//               customer_id: bid.customer_id,
//               market_name: bid.market_name,
//               digit_number: item.digit_number,
//               amount: item.amount,
//               game_status: game_status,
//               game_name: bid.game_name,
//               type: bid.type
//             });
//           }
//         } catch (error) {
//           console.error("Error parsing bid string:", error);
//           continue;
//         }
//       }
//       await Result.insertMany(results);
//     }

//     res.status(200).json(updatedUser);
//   } catch (error) {
//     next(error);
//   }
// };
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
