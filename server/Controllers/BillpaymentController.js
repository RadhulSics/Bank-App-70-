const waterbillschema = require("../Models/WaterbillSchema");
const ElectricBillSchema = require("../Models/ElectricbillSchema");
const User = require("../Models/UsersSchema");

const validateUserAndBalance = async (userid, amount) => {
  const user = await User.findById(userid);
  if (!user) {
    throw new Error("User not found.");
  }
  if (user.userBalance < amount) {
    throw new Error("Insufficient balance for bill payment.");
  }
  return user;
};

const checkExistingElectricBillPayment = async ({ userid, billnumber, accountnumber, month, year }) => {
  const existingPayment = await ElectricBillSchema.findOne({
    userid,
    billnumber,
    accountnumber,
    month,
    year,
  }).exec();
  return !!existingPayment; // Return true if payment exists, false otherwise.
};

const payElectricBill = async (req, res) => {
  try {
    const { userid, billnumber, accountnumber, amount, month, year } = req.body;

    // Validate input
    if (!userid || !billnumber || !accountnumber || !amount || !month || !year) {
      return res.status(400).json({ msg: "All fields are required." });
    }
    if (amount <= 0) {
      return res.status(400).json({ msg: "Invalid amount." });
    }

    // Check if payment already exists
    const hasExistingPayment = await checkExistingElectricBillPayment({
      userid,
      billnumber,
      accountnumber,
      month,
      year,
    });

    if (hasExistingPayment) {
      return res.status(400).json({
        msg: "Payment already made for this month.",
      });
    }

    // Validate user and balance
    const user = await validateUserAndBalance(userid, amount);

    // Deduct balance and save user
    user.userBalance -= amount;
    await user.save();

    // Create and save new electric bill record
    const newBill = new ElectricBillSchema({
      userid,
      billnumber,
      accountnumber,
      amount,
      month,
      year,
    });

    const savedBill = await newBill.save();

    res.status(200).json({
      msg: "Electric bill payment successful.",
      data: {
        bill: savedBill,
        remainingBalance: user.userBalance,
      },
    });
  } catch (error) {
    console.error("Error processing electric bill payment:", error);
    res.status(500).json({ msg: error.message });
  }
};

const payWaterBill = async (req, res) => {
  console.log(req.body,"p");
  
  try {
    const { userid, billnumber, accountnumber, amount, month, year } = req.body;

    // Validate input
    if (!userid || !billnumber || !accountnumber || !amount || !month || !year) {
      return res.status(400).json({ msg: "All fields are required." });
    }
    if (amount <= 0) {
      return res.status(400).json({ msg: "Invalid amount." });
    }

    const user = await validateUserAndBalance(userid, amount);

    // Check if payment already exists
    const existingPayment = await waterbillschema.findOne({
      billnumber,
      accountnumber,
      year,
      month,
    }).exec()

    if (existingPayment) {
      return res.status(400).json({
        msg: "Payment already made for this month.",
      });
    }

    // Deduct balance and save user
    user.userBalance -= amount;
    await user.save();

    // Create new water bill record
    const newBill = new waterbillschema({
      userid,
      billnumber,
      accountnumber,
      amount,
      month,
      year,
    });

    const savedBill = await newBill.save();

    res.status(200).json({
      msg: "Water bill payment successful.",
      data: {
        bill: savedBill,
        remainingBalance: user.userBalance,
      },
    });
  } catch (error) {
    console.error("Error processing water bill payment:", error);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { payElectricBill, payWaterBill };
