import React, { useState } from "react";
import logo from "../../Asserts/images/Logo.png";
import home from "../../Asserts/images/Home.png";
import manage from "../../Asserts/images/Management.png";
import customer from "../../Asserts/images/Customer Insight.png";
import manager from "../../Asserts/images/Project Manager.png";
import logout from "../../Asserts/images/managerlogout.png";
import loan from "../../Asserts/images/managerloan.png";
import credit from "../../Asserts/images/managercredit.png";
import Nav from "react-bootstrap/Nav";
import transaction from "../../Asserts/images/managertransaction.png";

import "../../Asserts/Styles/admindashboard.css";
import { Link, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const [tooglebtn, setTooglebtn] = useState(false);
  const navigate = useNavigate();

  const togglemangerbtn = () => {
    setTooglebtn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminid");
    alert("Please Login Again");
    navigate("/adminlogin");
  };
  return (
    <div className="sidebardesign">
      <Link to="/admin/dashboard">
        <img src={logo}></img>
      </Link>
      <div className="row mt-5 hover ">
        <div className="col-1"></div>
        <div className="col-1">
          <img src={home}></img>
        </div>
        <Link
          to={"/admin/dashboard"}
          className="col-3 text-decoration-none text-light"
        >
          Dashbaord
        </Link>
      </div>
      <div className="row mt-3 hover">
        <div className="col-1"></div>
        <div className="col-1">
          <img src={customer}></img>
        </div>
        <div className="col-9">
          <Link
            to="/admin/viewusers"
            className="col-3 text-decoration-none text-light"
          >
            {" "}
            Customer Management{" "}
          </Link>
        </div>
      </div>

      <Link
        to="/admin/viewmanages"
        className="text-decoration-none text-light"
      ></Link>
      <div className="row mt-3 hover">
        <div className="col-1"></div>
        <div className="col-1">
          <img src={manage}></img>
        </div>
        <div className="col-9">
          {" "}
          <Link
            to="/admin/viewclerks"
            className="col-3 text-decoration-none text-light"
          >
            Clerk Management
          </Link>
        </div>
        <div className="text-decoration-none text-light">
          <div className="row mt-3 hover">
            <div className="col-1"></div>
            <div className="col-1">
              <img src={manager}></img>
            </div>
            <div className="col-9">
              {" "}
              <label onClick={togglemangerbtn}>Manager Management</label>
              {tooglebtn == true ? (
                <div className="managermainbtn mt-1">
                  <Link
                    to="/admin/addmanagers"
                    className="managerbtn text-light btn"
                  >
                    Add A Manager
                  </Link>
                  <Link
                    to="/admin/viewmanages"
                    className="managerbtn text-light btn mt-1"
                  >
                    {" "}
                    View All Managers
                  </Link>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="row mt-3 hover">
              <div className="col-1"></div>
              <div className="col-1">
                <img src={loan}></img>
              </div>
              <div className="col-9">
                <Link
                  to="/admin/viewusers"
                  className="col-3 text-decoration-none text-light"
                >
                  {" "}
                  Manage Loan{" "}
                </Link>
              </div>
            </div>

            <div className="row mt-3 hover">
              <div className="col-1"></div>
              <div className="col-1">
                <img src={credit}></img>
              </div>
              <div className="col-9">
                <Link
                  to="/admin/viewusers"
                  className="col-3 text-decoration-none text-light"
                >
                  {" "}
                  Credit Card{" "}
                </Link>
              </div>
            </div>

            <div className="row mt-3 hover">
              <div className="col-1"></div>
              <div className="col-1">
                <img src={transaction}></img>
              </div>
              <div className="col-9">
                <Link
                  to="/admin/viewusers"
                  className="col-3 text-decoration-none text-light"
                >
                  {" "}
                  Transaction
                </Link>
              </div>
            </div>

            <div className="row mt-3 hover">
              <div className="col-1"></div>
              <div className="col-1">
                <img src={credit}></img>
              </div>
              <div className="col-9">
                <Link
                  to="/admin/Viewllifeinsurancepolicy"
                  className="col-3 text-decoration-none text-light"
                >
                  {" "}
                  Life Insurance
                </Link>
              </div>
            </div>
            <div className="row mt-3 hover" onClick={handleLogout}>
              <div className="col-1"></div>
              <div className="col-1">
                <img src={logout}></img>
              </div>
              <div className="col-9">Logout</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
