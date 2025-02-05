import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useParams, useNavigate } from "react-router-dom";
import imgurl from "../../apis/imgURL";
import axiosInstance from "../../apis/axiosinstance";
import "../../Asserts/Styles/managerviewuserdetails.css";
import transaction from "../../Asserts/images/transactionbutton.png";
import AdminSidebar from "./AdminSidebar";

function AdminviewUserDetails() {
  const [user, setUser] = useState({});
  const [creditcard, setCreditcard] = useState([]);
  const [loan, setLoan] = useState([]);
  const [lifeinsurance, setLifeinsurance] = useState([]);

  const { userid } = useParams();

  const getAData = () => {
    axiosInstance
      .get(`/view_a_user/${userid}`)
      .then((res) => {
        setUser(res.data.data);
        console.log(res.data.data);
      })
      .catch(() => {});
  };
  const getLoanData = () => {
    axiosInstance
      .get(`/viewloanbyuser/${userid}`)
      .then((res) => {
        setLoan(res.data.data);
        console.log(res.data.data);
      })
      .catch(() => {});
  };
  const getCreaditcardData = () => {
    axiosInstance
      .get(`/view_a_user/${userid}`)
      .then((res) => {
        setUser(res.data.data);
        console.log(res.data.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getAData();
    getLoanData();
    getCreaditcardData();
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("managerid") == null) {
      navigate("/manager/login");
    }
  }, []);

  const moveToTransaction = (id) => {
    navigate("");
  };

  return (
    <div className="row">
      <div className="col-3">
        <AdminSidebar />
      </div>
      <div className="col-9">
        <div>
          <h3 className="ms-4">
            <span class="userdetailsview">VIEW</span>USER
          </h3>
          <div id="fullbody">
            <center>
              <img
                src={`${imgurl}/${user?.userPicture?.originalname}`}
                alt="PROFILE PIC"
                id="usedetailsprofilepic"
              />
              <h5 class="userdetailsview">{user.username} </h5>
            </center>

            <div className="row">
              <div className="col-6 ms-4">
                {" "}
                <Card
                  style={{ width: "27rem" }}
                  id="personalDetails"
                  className="eachcard"
                >
                  <Card.Body>
                    <h5 className="cardlinks ">Personal Details</h5>
                    <div className="row">
                      <Card.Text className="col">
                        <label className="cardlabels">E-mail</label>
                        <p classname="carddetails">{user.userMail}</p>
                      </Card.Text>
                      <Card.Text className="col">
                        <label className="cardlabels">Contact</label>
                        <p className="carddetails">{user.userContact}</p>
                      </Card.Text>
                    </div>
                    <div className="row">
                      <Card.Text className="col">
                        <label className="cardlabels">Date od Birth </label>
                        <p className="carddetails">
                          {" "}
                          {new Date(user.userDate).toLocaleDateString("en-GB")}
                        </p>
                      </Card.Text>
                      <Card.Text className="col">
                        <label className="cardlabels">Address</label>
                        <p className="carddetails">{user.userAddress}</p>
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </div>

              <div className="col-3">
                {creditcard.length > 0 ? (
                  <Card style={{ width: "27rem" }} className="eachcard">
                    <Card.Body>
                      <Card.Title className=" userdetailsview cardtitle">
                        Credit Card Details
                      </Card.Title>
                      <div className="row">
                        <Card.Text className="col">
                          <label className="cardlabels">Card Type</label>
                          <p classname="carddetails">akila45@gmail.com</p>
                        </Card.Text>
                        <Card.Text className="col">
                          <label className="cardlabels">
                            Employmeny Status
                          </label>
                          <p className="carddetails">ABC</p>
                        </Card.Text>
                      </div>
                      <div className="row">
                        <Card.Text className="col">
                          <label className="cardlabels">Income Range</label>
                          <p className="carddetails">25,000/-</p>
                        </Card.Text>
                        <Card.Text className="col">
                          <label className="cardlabels">Credit Card Limt</label>
                          <p className="carddetails">2,00,0000/-</p>
                        </Card.Text>
                      </div>
                      <div className="row">
                        <div className="col">
                          <label className="cardlabels">ID Proof</label>
                          <p>
                            <Card.Link href="#" className="userdetailsview">
                              Card Link
                            </Card.Link>
                          </p>
                        </div>
                        <div className="col">
                          <label className="cardlabels">Income Proof</label>
                          <p>
                            <Card.Link href="#" className="userdetailsview">
                              Another Link
                            </Card.Link>
                          </p>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ) : (
                  <div> No Credit Card </div>
                )}{" "}
              </div>
            </div>

            <div id="cardfullbody">
              <div className="row">
                <div className="col">
                  <div className="col"></div>
                </div>

                <div className="row py-5 ">
                  <div className="col-6 ms-3">
                    {loan.length > 0 ? (
                      <Card style={{ width: "27rem" }} className="eachcard">
                        <Card.Body>
                          <Card.Title className=" userdetailsview cardtitle">
                            Loan Details
                          </Card.Title>
                          <div className="row">
                            <Card.Text className="col">
                              <label className="cardlabels">Loan Type</label>
                            </Card.Text>
                            <Card.Text className="col">
                              <label className="cardlabels">
                                Purpose of Loan{" "}
                              </label>
                            </Card.Text>
                            <Card.Text className="col">
                              <label className="cardlabels ms-5">
                                Amount Sanctioned
                              </label>
                            </Card.Text>
                          </div>

                          {loan.map((data) => (
                            <div className="row">
                              <Card.Text className="col">
                                <p className="carddetails">{data?.loantype}</p>
                              </Card.Text>
                              <Card.Text className="col">
                                <p className="carddetails">
                                  {data?.loanpurpose}
                                </p>
                              </Card.Text>
                              <Card.Text className="col">
                                <p className="carddetails">
                                  {data?.loanamount}
                                </p>
                              </Card.Text>
                            </div>
                          ))}
                        </Card.Body>
                      </Card>
                    ) : (
                      <div>No Loan You Have</div>
                    )}
                  </div>
                  <div className="col-4 ">
                    {creditcard.length > 0 ? (
                      <Card style={{ width: "27rem" }} className="eachcard">
                        <Card.Body>
                          <Card.Title className="cardtitle userdetailsview">
                            Life Insurance Details
                          </Card.Title>
                          <div className="row">
                            <Card.Text className="col">
                              <label className="cardlabels">
                                Insurance Plan
                              </label>
                              <p className="carddetails">ABC</p>
                            </Card.Text>
                            <Card.Text className="col">
                              <label className="cardlabels">Policy Term</label>
                              <p className="carddetails">ABC</p>
                            </Card.Text>
                          </div>
                          <div className="row">
                            <Card.Text className="col">
                              <label className="cardlabels">
                                Coverage Amount
                              </label>
                              <p className="carddetails">2000/-</p>
                            </Card.Text>
                            <Card.Text className="col">
                              <label className="cardlabels">
                                Payment Frequency
                              </label>
                              <p className="carddetails">ABC</p>
                            </Card.Text>
                          </div>
                        </Card.Body>
                      </Card>
                    ) : (
                      <div>No Life Insurance </div>
                    )}
                  </div>
                </div>
                <div
                  className="text-center p-4"
                  onClick={() => moveToTransaction(user._id)}
                >
                  <img src={transaction}></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminviewUserDetails;
