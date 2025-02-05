import React, { useState } from "react";
import axiosInstance from "../../apis/axiosinstance";
import "../../Asserts/Styles/CustomerTransaction.css";
import UserNavbar from "../User/UserNavbar";
import LandingFooter from "../Main/LandingFooter";

function NormalTransaction() {
  const [formData, setFormData] = useState({
    payeename: "",
    payamount: "",
    ifsccode: "",
    accountnumber: "",
    transactiontype: "",
  });
  const [errors, setErrors] = useState({});
  const [dailyTotal, setDailyTotal] = useState(0); // Tracks daily transaction total
  const userid = localStorage.getItem("userid");

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = {
      ...formData,
      [name]: value,
    };

    // Set IFSC Code for internal transactions
    if (name === "transactiontype" && value === "internal") {
      updatedFormData.ifsccode = "UNICREDIT001";
    }

    setFormData(updatedFormData);
    setErrors({ ...errors, [name]: "" }); // Clear the error for the current field
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.transactiontype) {
      newErrors.transactiontype = "Transaction type is required.";
    }
    if (!formData.payeename.trim()) {
      newErrors.payeename = "Payee name is required.";
    }
    if (!formData.payamount || formData.payamount <= 0) {
      newErrors.payamount = "Amount must be greater than 0.";
    } else if (formData.payamount > 20000) {
      newErrors.payamount = "Amount cannot exceed ₹20,000 for a single transaction.";
    } else if (dailyTotal + Number(formData.payamount) > 100000) {
      newErrors.payamount = "Daily transaction limit of ₹1,00,000 exceeded.";
    }
    if (!formData.accountnumber || formData.accountnumber.length !== 11) {
      newErrors.accountnumber = "Account number must be 11 characters long.";
    }
    if (!formData.ifsccode) { 
      newErrors.ifsccode = "IFSC code is required.";
  } else if (formData.ifsccode.length !== 12) {
      newErrors.ifsccode = "IFSC code must be exactly 12 characters long.";
  } else if (formData.transactiontype === "internal" && formData.ifsccode !== "UNICREDIT001") {
      newErrors.ifsccode = "Invalid IFSC Code for internal transactions.";
  }
  

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data = {
      payeename: formData.payeename,
      payamount: formData.payamount,
      ifsccode: formData.ifsccode,
      accountnumber: formData.accountnumber,
      transactiontype: formData.transactiontype,
      userid,
    };

    try {
      const response = await axiosInstance.post("/normaltransaction", data);
      alert(response.data.message);

      // Update daily transaction total
      setDailyTotal((prevTotal) => prevTotal + Number(formData.payamount));

      // Reset form data
      setFormData({
        payeename: "",
        payamount: "",
        ifsccode: "",
        accountnumber: "",
        transactiontype: "",
      });
    } catch (error) {
      console.error("Error submitting transaction:", error);
      alert("Transaction failed. Please try again.");
    }
  };

  return (
    <div>
      <UserNavbar />
      <div className="onlinetransaction">
        <div className="container">
          <div className="text-center">
            <h3 className="fw-bold mb-5 online-bill pt-5">Make a Transaction</h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="col-md-4 m-auto mb-5">
              <label className="fw-bold">Transaction Type</label>
              <select
                name="transactiontype"
                className="form-control transaction-select"
                value={formData.transactiontype}
                onChange={handleChange}
              >
                <option value="">Choose Transaction Type</option>
                <option value="internal">Internal</option>
                <option value="external">External</option>
              </select>
              {errors.transactiontype && (
                <span className="text-danger">{errors.transactiontype}</span>
              )}
            </div>
            <div className="row mb-4 d-flex justify-content-center gap-3">
              <div className="col-md-4">
                <label className="form-label fw-bold">IFSC Code</label>
                <input
                  type="text"
                  name="ifsccode"
                  className="form-control"
                  placeholder="Enter IFSC Code"
                  value={formData.ifsccode}
                  onChange={handleChange}
                  readOnly={formData.transactiontype === "internal"}
                />
                {errors.ifsccode && (
                  <span className="text-danger">{errors.ifsccode}</span>
                )}
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Payee Name</label>
                <input
                  type="text"
                  name="payeename"
                  className="form-control"
                  placeholder="Enter Name"
                  value={formData.payeename}
                  onChange={handleChange}
                />
                {errors.payeename && (
                  <span className="text-danger">{errors.payeename}</span>
                )}
              </div>
            </div>
            <div className="row mb-3 d-flex justify-content-center gap-3">
              <div className="col-md-4">
                <label className="form-label fw-bold">Payee Account Number</label>
                <input
                  type="text"
                  name="accountnumber"
                  className="form-control"
                  placeholder="Enter Account number"
                  value={formData.accountnumber}
                  onChange={handleChange}
                />
                {errors.accountnumber && (
                  <span className="text-danger">{errors.accountnumber}</span>
                )}
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Amount</label>
                <input
                  type="number"
                  name="payamount"
                  className="form-control"
                  placeholder="₹0/-"
                  value={formData.payamount}
                  onChange={handleChange}
                />
                {errors.payamount && (
                  <span className="text-danger">{errors.payamount}</span>
                )}
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn paynow-btn rounded-pill mt-4">
                Pay now ₹{formData.payamount || 0}/-
              </button>
            </div>
          </form>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
}

export default NormalTransaction;
