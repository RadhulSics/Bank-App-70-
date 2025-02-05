import React,{useEffect} from "react";
import "../../Asserts/Styles/LandingPage.css";
import ManagerSidebar from "./ManagerSidebar";
import { useNavigate } from "react-router-dom";
function ManagerHome() {

  const navigate=useNavigate()
  
  useEffect(()=>{
    if(localStorage.getItem("managerid")==null){
      navigate("/manager/login")
    }

  },[])
  return (
    <div>
      <div className="row">
        <div className="col-3  ">
        <ManagerSidebar/>
        </div>
        <div className="col-9" id="common">
          <h3 className="mt-4">
            <span className="dashboardheadcolor">Manager</span> DASHBOARD
          </h3>
        </div>
      </div>
    </div>
  );
}

export default ManagerHome;
