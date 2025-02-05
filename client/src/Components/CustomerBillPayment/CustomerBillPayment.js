import React, { useState } from 'react'
import "../../Asserts/Styles/CustomerBillPayment.css"
import CustomerMobileRecharge from './CustomerMobileRecharge';
import CustomerElectricityBill from './CustomerElectricityBill';
import CustomerWaterBill from './CustomerWaterBill';
import UserNavbar from '../User/UserNavbar';
import LandingFooter from '../Main/LandingFooter';


function CustomerBillPayment() {

  const [activeTab, setActiveTab] = useState("mobile");
  return (
  
    <div class="billtype-payment">
    <UserNavbar/>
    <h2 class="container my-4 pt-5">Bill Payment</h2>
    <div class="container card  p-4  rounded-4">
      <div class="d-flex justify-content-start  mb-3 border-bottom">
        <button
          class={`tab-button ${activeTab === "mobile" ? "active" : ""}`}
          onClick={() => setActiveTab("mobile")}
        >
          Mobile Recharge
        </button>
        <button
          class={`tab-button ${activeTab === "electricity" ? "active" : ""}`}
          onClick={() => setActiveTab("electricity")}
        >
          Electricity
        </button>
        <button
          class={`tab-button ${activeTab === "water" ? "active" : ""}`}
          onClick={() => setActiveTab("water")}
        >
          Water
        </button>
      </div>

      <div class="tab-content mt-4">
        {activeTab === "mobile" && (
          <CustomerMobileRecharge/>
        )}

        {activeTab === "electricity" && (
          <CustomerElectricityBill/>
        )}

        {activeTab === "water" && (
         <CustomerWaterBill/>
        )}
      </div>
    </div>
    <div className='mt-5'>    <LandingFooter/>
    </div>
  </div>
);
};


export default CustomerBillPayment