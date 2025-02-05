import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { IoEye } from "react-icons/io5";
import ClerkSideBar from "./ClerkSideBar";
import "../../Asserts/Styles/clerkdashboard.css";
import axiosInstance from "../../apis/axiosinstance";

function ClerkDashboard() {
  const [userdata,setuserData]=useState([])

  useEffect(() => {
    axiosInstance.get("/viewusers").then((res) => {
      setuserData(res.data.data,"ppppp");
    });
  },[]);
  return (
    <div>
      <div className="row">
        <div className="col-3">
          <ClerkSideBar />
        </div>
        <div className="col-9">
          {" "}
          <div className="clerkDashboardfullbody">
            <h3 className="clerkdashboard">
              <span id="clerkDashboardclerkcolor">CLERK </span>DASHBOARD
            </h3>
            <div>
              <div className="row">
                <div className="col clerkDashboardpiechart">
                  <h5>Users Review</h5>
                  {/*<img src={userReviewPieChart} alt="PieChart" className='clerkDashboardpiechartimg'  />
                <img src={userReviewPieChartDetails} alt="Details" className='clerkDashboardpiechartdetails' />*/}
                </div>

                <div className="col clerkDashboardpiechart1">
                  <div className="row">
                    <div className="col">
                      <Button id="clerkDashboardclerkLoanButton">Loan</Button>
                    </div>
                    <div className="col">
                      <Button id="clerkDashboardclerkCreditcardButton">
                        Credit Card
                      </Button>
                    </div>
                    <div className="col">
                      <Button id="clerkDashboardclerkLifeinduranceButton">
                        Life Insurance
                      </Button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      {/*<img src={userReviewPieChart1} alt="PieChart" className='clerkDashboardpiechartimg' />
                <img src={userReviewPieChartDetails1} alt="Details" className='clerkDashboardpiechartdetails' />*/}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col clerkDashboardviewuser">
                <h4>View Users</h4>
              </div>
              {/* table start */}
              <div>
                <table id="clerkDashBoardTable">
                  <tr>
                    <th className="clerkDashboardTableHead">S No</th>
                    <th className="clerkDashboardTableHead">Name</th>
                    <th className="clerkDashboardTableHead">Phone Number</th>
                    <th className="clerkDashboardTableHead">Account No</th>
                    <th className="clerkDashboardTableHead">IFSC Code</th>
                    <th className="clerkDashboardTableHead">Balance</th>
                    <th className="clerkDashboardTableHead">
                      Transaction History
                    </th>
                    <th className="clerkDashboardTableHead">Action</th>
                  </tr>
                  {userdata.map((data,index)=>(
                  <tr key={index}>
                    <td className="clerkDashboardTableData text-center">{index+1}</td>
                    <td className="clerkDashboardTableData">
                     {data.username} <br />{" "}
                      <span className="clerkDashboardsubline">
                       {data.userMail}
                      </span>
                    </td>
                    <td className="clerkDashboardTableData">{data.userContact}</td>
                    <td className="clerkDashboardTableData">{data.userNumber}</td>
                    <td className="clerkDashboardTableData">{data.userCode}</td>
                    <td className="clerkDashboardTableData">0</td>
                    <td>
                      <a
                        href=""
                        className="clerkDashboardTableDataviewDetails "
                      >
                        View Details
                      </a>{" "}
                    </td>
                    <td className="clerkDashboardTableData">
                      <span id="clerkDashboardeyeicon">
                        <IoEye />
                      </span>
                    </td>
                  </tr>))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClerkDashboard;
