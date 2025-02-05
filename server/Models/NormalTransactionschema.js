var mongoose = require("mongoose")

const normalTransaction = new mongoose.Schema({
 Payeename: {
    type: String,
    required: true,
  },
  payamount: {
    type: Number,
    required: true,
  },
  ifsccode: {3
    type: String,
    required: true,
  },
  accountnumber: {
    type: Number,
    required: true,
  },
  transactiontype: {
    type: String,
    required: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
    
})

module.exports= mongoose.model("normaltransaction",normalTransaction)
