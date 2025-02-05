import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import UserNavbar from "../User/UserNavbar";
import LandingFooter from "../Main/LandingFooter";

function CustomerLoanIdentity() {
  const [form, setForm] = useState({
    pancardNumber: "",
    panCardFile: null,
    aadhaarNumber: "",
    aadhaarFile: null,
    votersIDFile: null,
    drivingLicenseFile: null,
    passportFile: null,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const loanDetails = location.state?.loanDetails;
  const [errors, setErrors] = useState({});

  const store = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFileChange = (e, key) => {
    console.log(e.target.files[0],"k");
    
    const file = e.target.files[0];
    const name = key || e.target.name; // Use either the passed key or the input's name attribute
    setForm((prevForm) => ({ ...prevForm, [name]: file }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error for the field
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!form.pancardNumber) {
      newErrors.pancardNumber = "PAN Card Number is mandatory.";
      isValid = false;
    } else if (form.pancardNumber.length !== 10) {
      newErrors.pancardNumber = "PAN Card Number must be 10 characters.";
      isValid = false;
    }

    if (!form.panCardFile) {
      newErrors.panCardFile = "PAN Card file is mandatory.";
      isValid = false;
    }

    if (!form.aadhaarNumber) {
      newErrors.aadhaarNumber = "Aadhaar Number is mandatory.";
      isValid = false;
    } else if (form.aadhaarNumber.length !== 12) {
      newErrors.aadhaarNumber = "Aadhaar Number must be 12 characters.";
      isValid = false;
    }

    if (!form.aadhaarFile) {
      newErrors.aadhaarFile = "Aadhaar file is mandatory.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleContinue = () => {
    if (validate()) {
      // Combine all data into an object to pass to the next component
      const combinedData = {
        ...loanDetails, // Data received from the previous component
        pancardNumber: form.pancardNumber,
        aadhaarNumber: form.aadhaarNumber,
        files: {
          panCardFile: form.panCardFile,
          aadhaarFile: form.aadhaarFile,
          votersIDFile: form.votersIDFile,
          drivingLicenseFile: form.drivingLicenseFile,
          passportFile: form.passportFile,
        },
      };

      // Navigate to the next component with the combined data
      navigate("/user/applyloanEmpdetails", { state: { combinedData } });
    } else {
      console.log("Validation failed:", errors);
      alert("Please fix the errors before continuing.");
    }
  };

  useEffect(() => {
    console.log("Received Loan Details:", loanDetails);
  }, [loanDetails]);

  return (
    <div className="CustLoanIdentity">
    <UserNavbar/>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <div className="progress-bar-container">
              <div>
                <div className="circle active">1</div>
                <span className="progress-text">Personal Details</span>
              </div>
              <div className="profildetaildline"></div>
              <div>
                <div className="circle active">2</div>
                <span className="progress-text">Identity</span>
              </div>
              <div className="profildetaildline"></div>
              <div>
                <div className="circle">3</div>
                <span className="progress-text">Employment Details</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <center>
        <Card className="CustLoanIdentityhorizontal-card">
          <Card.Body>
            <Container>
              <h5 className="CustLoanIdentityHeader">Identity</h5>
              <Row>
                <Col>
                  <div className="form-group">
                    <div>PAN Card Number</div>
                    <input
                      className="customerLoanIdentityformcontrol"
                      type="text"
                      name="pancardNumber"
                      value={form.pancardNumber}
                      onChange={store}
                    />
                    {errors.pancardNumber && (
                      <span className="text-danger">{errors.pancardNumber}</span>
                    )}
                    <div>PAN Card</div>
                    <div className="input-upload">
                      <input
                        type="file"
                        className="customerLoanIdentityformcontrol"
                        onChange={(e) => handleFileChange(e, "panCardFile")}
                      />
                      <MdOutlineFileUpload className="upload-icon" />
                    </div>
                    {errors.panCardFile && (
                      <span className="text-danger">{errors.panCardFile}</span>
                    )}
                    <div>Aadhaar Number</div>
                    <input
                      className="customerLoanIdentityformcontrol"
                      type="text"
                      name="aadhaarNumber"
                      value={form.aadhaarNumber}
                      onChange={store}
                    />
                    {errors.aadhaarNumber && (
                      <span className="text-danger">
                        {errors.aadhaarNumber}
                      </span>
                    )}
                    <div>Aadhaar</div>
                    <div className="input-upload">
                      <input
                        type="file"
                        className="customerLoanIdentityformcontrol"
                        onChange={(e) => handleFileChange(e, "aadhaarFile")}
                      />
                      <MdOutlineFileUpload className="upload-icon" />
                    </div>
                    {errors.aadhaarFile && (
                      <span className="text-danger">{errors.aadhaarFile}</span>
                    )}
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <div>Voter's ID</div>
                    <div className="input-upload">
                      <input
                        type="file"
                        className="customerLoanIdentityformcontrol"
                        onChange={(e) => handleFileChange(e, "votersIDFile")}
                      />
                      <MdOutlineFileUpload className="upload-icon" />
                    </div>
                    <div>Driving License</div>
                    <div className="input-upload">
                      <input
                        type="file"
                        className="customerLoanIdentityformcontrol"
                        onChange={(e) =>
                          handleFileChange(e, "drivingLicenseFile")
                        }
                      />
                      <MdOutlineFileUpload className="upload-icon" />
                    </div>
                    <div>Passport</div>
                    <div className="input-upload">
                      <input
                        type="file"
                        className="customerLoanIdentityformcontrol"
                        onChange={(e) => handleFileChange(e, "passportFile")}
                      />
                      <MdOutlineFileUpload className="upload-icon" />
                    </div>
                  </div>
                </Col>
              </Row>
              <button id="CustomerLoanIdentity" onClick={handleContinue}>
                Continue
              </button>
              <FaLongArrowAltRight className="CustLoanIconArrow" />
            </Container>
          </Card.Body>
        </Card>
      </center>
      <LandingFooter/>
    </div>
  );
}

export default CustomerLoanIdentity;
