const onlinetransactionschema = require("../Models/OnlineTransaction");

const multer = require("multer");
const jwt = require("jsonwebtoken");
const secret = "";

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("chequeimage");

// Function to add a new Insurance

const createTransaction = async (req, res) => {
  try {
    const { payeename, payamount, ifsccode, accountnumber, userid } = req.body;
    const chequeimage = req.file;

    if (!chequeimage) {
      return res.status(400).json({ message: "Cheque image is required." });
    }

    const transaction = new onlinetransactionschema({
      Payeename: payeename,
      payamount: payamount,
      ifsccode: ifsccode,
      accountnumber: accountnumber,
      chequeimage: chequeimage,
      userid: userid,
    });

    await transaction.save();
    res.status(201).json({ message: "onlinetransactionschema created successfully." });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


module.exports={upload,createTransaction}