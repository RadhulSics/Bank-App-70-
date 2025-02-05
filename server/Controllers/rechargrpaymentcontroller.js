const Payment = require("../Models/MobilerechargeSchema");
const User = require("../Models/UsersSchema");

const mobilepayment = async (req, res) => {
  
  try {
    const { mobileNumber, operator, planId, amount, month, year, userid } =
      req.body;

    const existingPayment = await Payment.findOne({
      mobileNumber: mobileNumber,
      operator: operator,
      amount: amount,
      month: month,
      year: year,
      userid,
    }).exec(); // Ensure query execution with `.exec()` if not using async/await directly.

    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    // Check if the user has enough balance
    if (user.userBalance < amount) {
      return res
        .status(400)
        .json({ msg: "Insufficient balance for bill payment." });
    }
    if (existingPayment) {
      return res.status(400).json({
        msg: "Payment already made for this month.",
      });
    }
    user.userBalance -= amount;
    await user.save();
    // Create and save a new payment record
    const payment = new Payment({
      mobileNumber,
      operator,
      planId,
      amount,
      month,
      year,
      userid,
    });

    await payment.save();

    // Respond with success message
    res.status(200).json({
      msg: "Payment successful!",
      payment,
    });
  } catch (error) {
    console.error("Error in processing payment:", error);
    res.status(500).json({
      msg: "An error occurred while processing payment.",
    });
  }
};

module.exports = { mobilepayment };
