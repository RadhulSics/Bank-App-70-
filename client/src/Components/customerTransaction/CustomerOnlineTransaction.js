import React, { useState } from "react";
import axiosInstance from "../../apis/axiosinstance";
import "../../Asserts/Styles/CustomerTransaction.css";
import UserNavbar from "../User/UserNavbar";
import LandingFooter from "../Main/LandingFooter";

function CustomerOnlineTransaction() {
  const [formData, setFormData] = useState({
    payeename: "",
    payamount: "",
    ifsccode: "",
    accountnumber: "",
    chequeimage: null,
  });
  const [errors, setErrors] = useState({});
  const userid = localStorage.getItem("userid");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    setErrors({ ...errors, [name]: "" }); // Clear the error for the current field
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.payeename.trim()) {
      newErrors.payeename = "Payee name is required.";
    }
    if (!formData.payamount || formData.payamount <= 0) {
      newErrors.payamount = "Amount must be greater than 0.";
    }
    if (!formData.accountnumber || formData.accountnumber.length !== 11) {
      newErrors.accountnumber = "Account number must be 11 characters long.";
    }
    if (!formData.ifsccode || formData.ifsccode.length !== 11) {
      newErrors.ifsccode = "IFSC code must be 11 characters long.";
    }
    if (!formData.chequeimage) {
      newErrors.chequeimage = "Cheque image is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data = new FormData();
    data.append("payeename", formData.payeename);
    data.append("payamount", formData.payamount);
    data.append("ifsccode", formData.ifsccode);
    data.append("accountnumber", formData.accountnumber);
    data.append("chequeimage", formData.chequeimage);
    data.append("userid", userid);

    try {
      const response = await axiosInstance.post("/onlinetransaction", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data.message);

      setFormData({
        payeename: "",
        payamount: "",
        ifsccode: "",
        accountnumber: "",
        chequeimage: null,
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
            <h3 className="fw-bold mb-5 online-bill pt-5">
              Online Cheque Transaction
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row mb-4 d-flex justify-content-center gap-3">
              <div className="col-md-4">
                <label className="form-label fw-bold">Payee Name</label>
                <input
                  type="text"
                  name="payeename"
                  className="form-control"
                  placeholder="Enter Name"
                  value={formData.payeename}
                  onChange={handleChange}
                  required
                />
                {errors.payeename && (
                  <span className="text-danger">{errors.payeename}</span>
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
                  required
                />
                {errors.payamount && (
                  <span className="text-danger">{errors.payamount}</span>
                )}
              </div>
            </div>
            <div className="row mb-3 d-flex justify-content-center gap-3">
              <div className="col-md-4">
                <label className="form-label fw-bold">
                  Payee Account Number
                </label>
                <input
                  type="text"
                  name="accountnumber"
                  className="form-control"
                  placeholder="Enter Account number"
                  value={formData.accountnumber}
                  onChange={handleChange}
                  required
                />
                {errors.accountnumber && (
                  <span className="text-danger">{errors.accountnumber}</span>
                )}
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Cheque Image</label>
                <input
                  type="file"
                  name="chequeimage"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
                {errors.chequeimage && (
                  <span className="text-danger">{errors.chequeimage}</span>
                )}
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">IFSC Code</label>
                <input
                  type="text"
                  name="ifsccode"
                  className="form-control"
                  placeholder="Enter IFSC Code"
                  value={formData.ifsccode}
                  onChange={handleChange}
                  required
                />
                {errors.ifsccode && (
                  <span className="text-danger">{errors.ifsccode}</span>
                )}
              </div>
            </div>
            <div className="text-center pb-5">
              <button
                type="submit"
                className="btn paynow-btn rounded-pill mt-4"
              >
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

export default CustomerOnlineTransaction;
