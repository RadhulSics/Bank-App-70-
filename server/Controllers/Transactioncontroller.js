const normaltransactionschema = require("../Models/NormalTransactionschema");
const createNormalTransaction = async (req, res) => {
  console.log(req.body);
  try {
    const { payeename, payamount, ifsccode, accountnumber, transactiontype ,userid} =
      req.body;

    const transaction = new normaltransactionschema({
      Payeename: payeename,
      payamount: payamount,
      ifsccode: ifsccode,
      accountnumber: accountnumber,
      transactiontype: transactiontype,
      userid: userid,
    });

    await transaction.save();
    res.status(201).json({ message: "transaction done successfully." });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { createNormalTransaction };
