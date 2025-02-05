import React,{useEffect} from "react";
import AdminSidebar from "./AdminSidebar";
import "../../Asserts/Styles/LandingPage.css";
import { useNavigate } from "react-router-dom";
import DashboardCharts from "./AdminDashboardpiechart"
function AdminDashboard() {

  const navigate=useNavigate()
  
  useEffect(()=>{
    if(localStorage.getItem("admin")==null){
      navigate("/adminlogin")
    }

  },[])
  return (
    <div>
      <div className="row">
        <div className="col-3  ">
          <AdminSidebar />{" "}
        </div>
        <div className="col-9" id="common">
          <h3 className="mt-4">
            <span className="dashboardheadcolor">ADMIN </span> DASHBOARD
          </h3>
          <DashboardCharts/>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
