var mongoose = require("mongoose");

const OnlineTransaction = new mongoose.Schema({
  Payeename: {
    type: String,
    required: true,
  },
  payamount: {
    type: Number,
    required: true,
  },
  ifsccode: {
    type: Number,
    required: true,
  },
  accountnumber: {
    type: Number,
    required: true,
  },
  chequeimage: {
    type: Object,
    required: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("onlinechequetransaction", OnlineTransaction);
