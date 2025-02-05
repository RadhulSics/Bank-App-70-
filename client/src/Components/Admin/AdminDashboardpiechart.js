import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axiosInstance from "../../apis/axiosinstance";
import { IoEye } from "react-icons/io5";
import { Link } from "react-router-dom";

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardCharts = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [userlistdata, setuserdata] = useState([]);
  const [managersCount, setManagersCount] = useState(0);
  const [clerksCount, setClerksCount] = useState(0);
  const [loanData, setLoanData] = useState({
    total: 0,
    rejected: 0,
    pending: 0,
  });

  const userdata = () => {
    axiosInstance.get("/viewusers").then((result) => {
      setuserdata(result.data.data);
    });
  };

  // Fetch data from backend APIs
  useEffect(() => {
    userdata();
    const fetchData = async () => {
      try {
        const usersRes = await axiosInstance.get("/viewusers");
        console.log(usersRes, "l");

        setUsersCount(usersRes.data.data.length);

        const managersRes = await axiosInstance.get("/viewallmangers");
        setManagersCount(managersRes.data.data.length);

        const clerksRes = await axiosInstance.get("/viewallclerks");
        setClerksCount(clerksRes.data.data.length);

        const loanRes = await axiosInstance.get("/viewallloan");
        const loans = loanRes.data;
        console.log(loans, "p");

        const rejected = loans.data.filter(
          (loan) => loan.loanapproval === "Rejected"
        ).length;
        const pending = loans.data.filter(
          (loan) => loan.loanapproval === "Pending"
        ).length;
        const total = loans.data.length;
        setLoanData({ total, rejected, pending });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Data for Users Review Pie Chart
  const usersReviewData = {
    labels: ["Total no of Users", "Total no of Clerks", "Total no of Managers"],
    datasets: [
      {
        data: [usersCount, clerksCount, managersCount],
        backgroundColor: ["#9b59b6", "#3498db", "#1abc9c"],
        borderColor: ["#ffffff"],
        borderWidth: 1,
      },
    ],
  };

  // Data for Loan Pie Chart
  const loanDataChart = {
    labels: ["Total Loans", "Rejected Loans", "Pending Loans"],
    datasets: [
      {
        data: [loanData.total, loanData.rejected, loanData.pending],
        backgroundColor: ["#27ae60", "#e74c3c", "#f1c40f"],
        borderColor: ["#ffffff"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="row ms-5 mt-5">
        <div className="col-5 managerDashboardpiechart">
          <h3>Users Review</h3>
          <div>
            <Pie data={usersReviewData} />
          </div>
        </div>

        <div className="col-5 ms-5 managerDashboardpiechart1">
          <div className="row">
            <div className="col-3">
              <button className="btn ms-4" id="managerDashboardLoanButton">
                Loan
              </button>
            </div>
            <div className="col-4">
              <button className="btn" id="managerDashboardLoanButton">
                Credit Card
              </button>
            </div>
            <div className="col-5">
              <button className="btn" id="managerDashboardLoanButton">
                Life Insurance
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div>
                <Pie data={loanDataChart} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col managerDashboardviewuser">
        <h4>View Users</h4>
      </div>
      {/* table start */}
      <div>
        <table id="managerDashBoardTable">
          <tr>
            <th className="managerDashboardTableHead">S No</th>
            <th className="managerDashboardTableHead">Name</th>
            <th className="managerDashboardTableHead">Phone Number</th>
            <th className="managerDashboardTableHead">Account No</th>
            <th className="managerDashboardTableHead">IFSC Code</th>
            <th className="managerDashboardTableHead">Balance</th>
            <th className="managerDashboardTableHead">Transaction History</th>
            <th className="managerDashboardTableHead">Action</th>
          </tr>
          {userlistdata.map((data) => (
            <tr>
              <td className="managerDashboardTableData">1.</td>
              <td className="managerDashboardTableData">
                {data.username} <br />{" "}
                <span className="managerDashboardsubline">
                {data.useremail} 
                </span>
              </td>
              <td className="managerDashboardTableData">{data.userContact} </td>
              <td className="managerDashboardTableData">{data.userNumber} </td>
              <td className="managerDashboardTableData">{data.userCode} </td>
              <td className="managerDashboardTableData">{data.username} </td>
              <td>
                <Link to="" className="managerDashboardTableDataviewDetails ">
                  View Details
                </Link>{" "}
              </td>
              <td className="managerDashboardTableData">
                <Link to={`/admin/viewuserdetails/${data._id}`} id="managerDashboardeyeicon">
                  <IoEye  />
                </Link>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <br /> <br />
      <div className="row">
        <div className="col"></div>
        <div className="col"></div>
        <div className="col"></div>
        <div className="col">
          <p>
            <Link to="/admin/viewusers" id="managerDashboardViewwallLink">
              View All
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
