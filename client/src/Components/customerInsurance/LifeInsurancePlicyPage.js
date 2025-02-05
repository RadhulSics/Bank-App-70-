import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";
import "../../Asserts/Styles/Loan.css";
import axiosInstance from "../../apis/axiosinstance";
import { useLocation, useNavigate } from "react-router-dom";
import UserNavbar from "../User/UserNavbar";
import LandingFooter from "../Main/LandingFooter";

function LifeInsurancePlicyPage() {
  const [data, setData] = useState({});
  const [plandata, setPlanData] = useState({});
  const [formState, setFormState] = useState({
    nomineename: "",
    nomineecontactnumber: '',
    nomineerelationship: "",
    nomineeaddress: "",
  });

  const location = useLocation();
  const insuranceDetails = location.state;

  console.log(insuranceDetails, "ppp");

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem("userid");

      // const response = await axiosInstance.get(`/view_a_user/${userId}`);
      // console.log("User Data:", response.data);
      // setData(response.data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleViewAplan = async () => {
    console.log(insuranceDetails);

    try {
      const response = await axiosInstance.post(
        `/viewoneinsuranceapplication/${insuranceDetails.planid}`
      );
      console.log("Fetched plan data:", response.data.data[0]);
      setPlanData(response.data.data[0]);
    } catch (error) {
      console.error("Error fetching insurance plan data:", error);
    }
  };

  useEffect(() => {
    console.log("Received insurance Details:", insuranceDetails,formState);
    fetchUserData();
    handleViewAplan();
  }, []);

  const navigate = useNavigate();

  const update = () => {
    console.log("Form Data:", formState);
    navigate("/user/applyllifeinsurancepolicylast", { state: { insuranceDetails,formState } });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
                <div className="circle">3</div>
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
              Policy Details
            </h5>
            <Row>
              <Col md={6}>
                <div className="mb-4">
                  <label>Payment Frequency</label>
                  <input
                    className="form-control CustLoanPersonalDetailsformcontrol"
                    type="text"
                    placeholder={plandata?.paymentfrequency}
                    readOnly
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-4">
                  <label>Policy Term</label>
                  <input
                    className="form-control CustLoanPersonalDetailsformcontrol"
                    type="text"
                    placeholder={plandata?.policyterm}
                    readOnly
                  />
                </div>
              </Col>
            </Row>

            <h5 className="text-center" style={{ color: "#9A00FF" }}>
              Nominee Information
            </h5>
            <Row>
              <Col md={6}>
                <div className="mb-4">
                  <label>Nominee Name</label>
                  <input
                    className="form-control CustLoanPersonalDetailsformcontrol"
                    type="text"
                    name="nomineename"
                    value={formState.nomineename}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label>Nominee Relationship</label>
                  <input
                    className="form-control CustLoanPersonalDetailsformcontrol"
                    type="text"
                    name="nomineerelationship"
                    value={formState.nomineerelationship}
                    onChange={handleChange}
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-4">
                  <label>Contact Number</label>
                  <input
                    className="form-control CustLoanPersonalDetailsformcontrol"
                    type="number"
                    name="nomineecontactnumber"
                    value={formState.nomineecontactnumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label>Address</label>
                  <input
                    className="form-control CustLoanPersonalDetailsformcontrol"
                    type="text"
                    name="nomineeaddress"
                    value={formState.nomineeaddress}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            </Row>
            <div className="text-center">
              <Button
                id="CustLoanPersonalDetailsButton"
                className="d-inline-flex align-items-center"
                onClick={update}
              >
                Continue
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

export default LifeInsurancePlicyPage;
