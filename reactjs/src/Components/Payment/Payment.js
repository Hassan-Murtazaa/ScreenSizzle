import React, { useState } from "react";
import "./PaymentStyle.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import StripeCheckout from "react-stripe-checkout";
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';
import Navbar from '../Nav/Navbar';
import Footer from '../Foot/Footer';
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

export default function Payment(props) {

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top of page
  }, []);

  const location = useLocation();
  const [cardNumber, setCardNumber] = useState("");
  const [monthYear, setMonthYear] = useState("");
  const [cvvCode, setCvvCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (location && location.state) {
    var a = location.state.p;
    var b = location.state.s.join(", ");
  }
  else {
    a = 0;
    b = 0;
  }

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handleClose() {
    setShow(false);
  }

  function validation() {
    var para = document.getElementById("mailSuccess");

    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
      para.innerHTML = "* Invalid email address";
      para.style.display = "inline-block";
      para.style.color = "red";
    }

    else {
      handleMail();
    }
  }

  const navigate = useNavigate();
  const [naam, setNaam] = useState("");

  function handleMail() {
    axios
      .post("http://localhost:3000/send-email", {
        price: a,
        seat: b,
        moviename: props.array.name,
        name: naam,
        email: email,
        subject: "Order Confirmation",
        message: "Thank you for Ordering",
      })
      .then(function (response) {
        console.log(response);
        var para = document.getElementById("mailSuccess");

        para.innerHTML = "Please check your email to verify your booking details.<br>You will be soon redirected to the home page.";
        para.style.display = "inline-block";
        para.style.color = "#008000";
        para.style.fontSize = "17px";

        setTimeout(() => {
          navigate('/home');
        }, 3000);
      })
      .catch(function (error) {
        console.log(error);
        alert("Error posting data");
      });
  }

  function handleCardNumberChange(event) {
    setCardNumber(event.target.value);
  }

  function handleMonthYearChange(event) {
    setMonthYear(event.target.value);
  }

  function handleCvvCodeChange(event) {
    setCvvCode(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // cardNumber, MonthYear, CVVCode, Name
    // Make a POST request to the server
    axios
      .post("http://localhost:3000/submitPayment", {
        cardNumber: cardNumber,
        MonthYear: monthYear,
        CVVCode: cvvCode,
        Name: name,
        price: location.state.p,
        moviename: props.array.name,
        seats: location.state.s.join(", "),
      })
      .then(function (response) {
        console.log(response);
        var para = document.getElementById("verifyPayment");

        para.innerHTML = "Your booking has been confirmed.";
        para.style.display = "inline-block";
        para.style.color = "#008000";
        para.style.fontSize = "17px";

        setCardNumber("");
        setMonthYear("");
        setCvvCode("");
        setNaam(name);
        setName("");
      })
      .catch(function (error) {
        console.log(error);
        alert("Error posting data");
      });
  }

  const publishableKey =
    "pk_test_51N8SnVJlAmrTg5xR4z7rmAmxRJPRRSydGku0oBPfrMeTUprORC2Dj2Z5yvXeMy1ChDwFVYYb5gZX80lK1vQoGU3h00CRTeJGik";
  const [product, setProduct] = useState({
    name: "Headphone",
    price: 1,
  });
  const priceForStripe = product.price * 100 + a;

  const handleSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Payment was successful",
      time: 4000,
    });
  };
  const handleFailure = () => {
    MySwal.fire({
      icon: "error",
      title: "Payment was not successful",
      time: 4000,
    });
  };
  const payNow = async (token) => {
    try {
      const response = await axios({
        url: "http://localhost:3000/payment",
        method: "post",
        data: {
          amount: product.price * 100,
          token,
        },
      });
      if (response.status === 200) {
        handleSuccess();
      }
    } catch (error) {
      handleFailure();
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="payment">
        <div className="body">
          <div class="containerr">
            <div class="row">
              <div class="col-lg-4 mb-lg-0 mb-3">
                <div class="card p-3">
                  <div class="img-box">
                    <img
                      src="https://img.icons8.com/color/144/null/visa.png"
                      alt=""
                    />
                  </div>
                  <br></br>
                  <div class="number">
                    <label class="fw-bold" htmlFor="">
                      **** **** **** 1060
                    </label>
                  </div>
                  <div class="d-flex align-items-center justify-content-between">
                    <small>
                      <span class="fw-bold">Expiry date:</span>
                      <span>10/16</span>
                    </small>
                    <small>
                      <span class="fw-bold">Name:</span>
                      <span> ANAS</span>
                    </small>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 mb-lg-0 mb-3">
                <div class="card p-3">
                  <div class="img-box">
                    <img
                      src="https://img.icons8.com/color/144/null/mastercard.png"
                      alt=""
                    />
                  </div>
                  <br></br>

                  <div class="number">
                    <label class="fw-bold">**** **** **** 1060</label>
                  </div>
                  <div class="d-flex align-items-center justify-content-between">
                    <small>
                      <span class="fw-bold">Expiry date:</span>
                      <span>10/16</span>
                    </small>
                    <small>
                      <span class="fw-bold">Name:</span>
                      <span> HASSAN</span>
                    </small>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 mb-lg-0 mb-3">
                <div class="card p-3">
                  <div class="img-box">
                    <img
                      src="https://img.icons8.com/color/144/null/discover.png"
                      alt=""
                    />
                  </div>
                  <br></br>

                  <div class="number">
                    <label class="fw-bold">**** **** **** 1060</label>
                  </div>
                  <div class="d-flex align-items-center justify-content-between">
                    <small>
                      <span class="fw-bold">Expiry date:</span>
                      <span>10/16</span>
                    </small>
                    <small>
                      <span class="fw-bold">Name:</span>
                      <span> HANAN</span>
                    </small>
                  </div>
                </div>
              </div>
              <div class="col-12 mt-4">
                <div class="card p-3">
                  <p class="mb-0 fw-bold h4">Payment Methods</p>
                </div>
              </div>
              <div class="col-12">
                <div class="card p-3">
                  <div class="card-body border p-3">
                    <p>
                      <a
                        class="btn btn-primary w-100 h-100 d-flex align-items-center justify-content-between"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="true"
                        aria-controls="collapseExample"
                      >
                        <span class="fw-bold">Stripe</span>
                        <StripeCheckout
                          className="stripe-checkout-button"
                          stripeKey={publishableKey}
                          label="Pay Now"
                          name="Pay With Credit Card"
                          billingAddress
                          shippingAddress
                          amount={priceForStripe}
                          description={`Your total is $${product.price}`}
                          token={payNow}
                        />
                        <span class="fab fa-cc-stripe"></span>
                      </a>
                    </p>
                    <div class="collapse p-3 pt-0" id="collapseExample">
                      <div class="row">
                        <div class="col-8">
                          <p class="h4 mb-0">Summary</p>
                          <p class="mb-0">
                            <span class="fw-bold">Product:</span>
                            <span class="c-green">: Name of product</span>
                          </p>
                          <p class="mb-0">
                            <span class="fw-bold">Price:</span>
                            <span class="c-green">:$452.90</span>
                          </p>
                          <p class="mb-0">
                            Thank You For Choosing ScreenSizzle. Your Seat No H22
                            has been locked for Payment
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-body border p-3">
                    <p>
                      <a
                        class="btn btn-primary p-2 w-100 h-100 d-flex align-items-center justify-content-between"
                        data-bs-toggle="collapse"
                        href="#collapseExample"
                        role="button"
                        aria-expanded="true"
                        aria-controls="collapseExample"
                      >
                        <span class="fw-bold">Credit Card</span>
                        <span class="">
                          <span class="fab fa-cc-amex"></span>
                          <span class="fab fa-cc-mastercard"></span>
                          <span class="fab fa-cc-discover"></span>
                        </span>
                      </a>
                    </p>
                    <div class="collapse show p-3 pt-0" id="collapseExample">
                      <div class="row">
                        <div class="col-lg-5 mb-lg-0 mb-3">
                          <p class="h4 mb-3">Summary</p>
                          <p class="mb-0">
                            <span class="fw-bold">Movie:</span>
                            <span class="c-green"> {props.array.name}</span>
                          </p>
                          <p class="mb-0">
                            <span class="fw-bold">Price:</span>
                            <span class="c-green"> {a}</span>
                          </p>
                          <p class="mb-0">
                            <span class="fw-bold">Seats Booked:</span>
                            <span class="c-green"> {b}</span>
                          </p>

                          <p class="mb-0 mt-3">
                            Thank You For Choosing ScreenSizzle!
                          </p>
                        </div>
                        <div class="col-lg-7">
                          <form action="" class="form">
                            <div class="row">
                              <div class="col-12">
                                <div class="form__div">
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder=" "
                                    id="cardNumber"
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    required
                                  />
                                  <label htmlFor="" class="form__label">
                                    Card Number
                                  </label>
                                </div>
                              </div>

                              <div class="col-6">
                                <div class="form__div">
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder=" "
                                    id="cardDate"
                                    value={monthYear}
                                    onChange={handleMonthYearChange}
                                  />
                                  <label htmlFor="" class="form__label">
                                    MM / yy
                                  </label>
                                </div>
                              </div>

                              <div class="col-6">
                                <div class="form__div">
                                  <input
                                    type="password"
                                    class="form-control"
                                    placeholder=" "
                                    id="cvv"
                                    value={cvvCode}
                                    onChange={handleCvvCodeChange}
                                  />
                                  <label htmlFor="" class="form__label">
                                    cvv code
                                  </label>
                                </div>
                              </div>
                              <div class="col-12">
                                <div class="form__div">
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder=" "
                                    id="name"
                                    value={name}
                                    onChange={handleNameChange}
                                  />
                                  <label htmlFor="" class="form__label">
                                    name on the card
                                  </label>
                                </div>
                              </div>
                              <p id="verifyPayment" style={{ display: 'none' }}></p>
                              <div class="col-12">
                                <div
                                  onClick={handleSubmit}
                                  className="btn btn-primary w-100"
                                >
                                  Verify
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Button variant="primary" onClick={handleShow}>
                Confirmation
              </Button>

              <Modal show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Personal Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        onChange={handleEmail}
                      />
                    </Form.Group>
                    <p id="mailSuccess" style={{ display: 'none' }}></p>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={validation} style={{ backgroundColor: '#1CE783', border: 'none' }}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
