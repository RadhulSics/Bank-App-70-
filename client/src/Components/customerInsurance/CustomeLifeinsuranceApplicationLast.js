import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaLongArrowAltRight } from "react-icons/fa";
import "../../Asserts/Styles/Loan.css";
import axiosInstance from "../../apis/axiosinstance";
import { useLocation, useNavigate } from "react-router-dom";
import LandingFooter from "../Main/LandingFooter";
import UserNavbar from "../User/UserNavbar";

function CustomeLifeinsuranceApplicationLast() {
  const [formApply, setFormApply] = useState({
    existingconditions: "",
    smoking: "",
    currentmedication: "",
    idproof: null,
    incomeproof: null,
    medicalreport: null,
  });

  const userid= localStorage.getItem("userid")
  const location = useLocation();

  const { insuranceDetails, formState } = location.state
  

  useEffect(() => {
    console.log("Received insurance Details:", insuranceDetails,formState);
  }, [insuranceDetails,formState]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormApply((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    // Append form data
    formData.append("existingconditions", formApply.existingconditions);
    formData.append("smoking", formApply.smoking);
    formData.append("currentmedication", formApply.currentmedication);
    if (formApply.idproof) formData.append("idproof", formApply.idproof);
    if (formApply.incomeproof) formData.append("incomeproof", formApply.incomeproof);
    if (formApply.medicalreport) formData.append("medicalreport", formApply.medicalreport);

    // Append insuranceDetails if needed
    formData.append("planid", insuranceDetails.planid);
    formData.append("userid", insuranceDetails.userId);
    formData.append("nomineename",formState.nomineename );
    formData.append("nomineerelationship",formState.nomineerelationship );
    formData.append("nomineecontactnumber",formState.nomineecontactnumber );
    formData.append("nomineeaddress",formState.nomineeaddress );
    try {
      const response = await axiosInstance.post(
        "/applyinsuranceapplication",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("API Response:", response.data);
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit the application.");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="CustLoanPersonalDetails">
    <UserNavbar/>

      <Container>
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <div className="progress-bar-container">
              <div>
                <div className="circle active">1</div>
                <span className="progress-text">Personal Details</span>
              </div>

              <div className="profildetaildline"></div>
              <div>
                <div className="circle active">2</div>
                <span className="progress-text">Policy & Nominee</span>
              </div>

              <div className="profildetaildline"></div>

              <div>
                <div className="circle active">3</div>
                <span className="progress-text">Health & Document</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="my-5">
        <Card
          className="CustLoanPersonalDetailshorizontal-card mx-auto"
          style={{ maxWidth: "900px" }}
        >
          <Card.Body>
            <h5 className="text-center" style={{ color: "#9A00FF" }}>
              Health Information
            </h5>
            <Row>
              <Col md={6}>
                <div className="mb-4">
                  <label>Pre-existing Conditions</label>
                  <textarea
                    className="form-control CustLoanPersonalDetailsformcontrol"
                    name="existingconditions"
                    value={formApply.existingconditions}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label>Smoking</label>
                  <input
                    className="form-control CustLoanPersonalDetailsformcontrol"
                    type="text"
                    name="smoking"
                    value={formApply.smoking}
                    onChange={handleInputChange}
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-4">
                  <label>Current Medication</label>
                  <textarea
                    className="form-control CustLoanPersonalDetailsformcontrol"
                    name="currentmedication"
                    value={formApply.currentmedication}
                    onChange={handleInputChange}
                  />
                </div>
              </Col>
            </Row>

            <h5 className="text-center" style={{ color: "#9A00FF" }}>
              Documentation
            </h5>
            <Row>
              <Col md={6}>
                <div className="mb-4">
                  <label>ID Proof</label>
                  <input
                    className="form-control CustLoanPersonalDetailsformcontrol"
                    type="file"
                    name="idproof"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label>Income Proof</label>
                  <input
                    className="form-control CustLoanPersonalDetailsformcontrol"
                    type="file"
                    name="incomeproof"
                    onChange={handleInputChange}
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-4">
                  <label>Medical Report</label>
                  <input
                    className="form-control CustLoanPersonalDetailsformcontrol"
                    type="file"
                    name="medicalreport"
                    onChange={handleInputChange}
                  />
                </div>
              </Col>
            </Row>
            <div className="text-center">
              <Button
                id="CustLoanPersonalDetailsButton"
                className="d-inline-flex align-items-center"
                onClick={handleSubmit}
              >
                Submit
                <FaLongArrowAltRight className="ms-2" />
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
      <LandingFooter />
    </div>
  );
}

export default CustomeLifeinsuranceApplicationLast;
