import "./signUp.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    email: "",
    password: "",
    mobileNumber: "",
    name: "",
    place: "",
  });

  const [formError, setFormError] = useState({});
  const [login, setLogin] = useState(false);

  // Function to post signup data to the server
  function postSignUpData(data) {
    const apiUrl = process.env.REACT_APP_API_URL || "http://34.227.56.190:5000"; // Fallback URL for local testing

    axios
      .post(`${apiUrl}/api/user/register`, data)
      .then((res) => {
        window.alert(res.data.message); // Show success message
        navigate("/"); // Redirect to the home page
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          window.alert(err.response.data.message); // Show error message from the server
        } else if (err.response) {
          window.alert(`Error: ${err.response.status}`); // Show status if message is missing
        } else {
          window.alert("Network error or API not reachable."); // Handle network issues
        }
      });
  }

  // Handle form validation
  function validate(data) {
    let error = {};
    const emailFilter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!data.email) {
      error.email = "Email is required";
    } else if (!emailFilter.test(data.email)) {
      error.email = "Please enter a valid email";
    }

    if (!data.password) {
      error.password = "Password is required";
    } else if (data.password.length < 8) {
      error.password = "Password must contain at least 8 characters";
    }

    if (!data.name) {
      error.name = "Name is required";
    }

    if (!data.place) {
      error.place = "Place is required";
    }

    if (!data.mobileNumber) {
      error.mobileNumber = "Phone number is required";
    } else if (isNaN(data.mobileNumber)) {
      error.mobileNumber = "Phone number must be a number";
    } else if (data.mobileNumber.length !== 10) {
      error.mobileNumber = "Phone number must contain exactly 10 digits";
    }

    return error;
  }

  // Trigger the API call when there are no form errors
  useEffect(() => {
    if (Object.keys(formError).length === 0 && login) {
      postSignUpData(details);
    }
  }, [formError]);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validate(details)); // Validate form data
    setLogin(true); // Trigger useEffect if there are no errors
  };

  return (
    <>
      <div className="container">
        <form method="POST" onSubmit={handleSubmit}>
          <div style={{ textAlign: "center", marginBottom: "25px" }}>
            <h1 className="heading">Registration Form</h1>
          </div>
          <div className="input-controll">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={details.email}
              onChange={handleChange}
            />
            <p className="error-text" style={{ textAlign: "right" }}>
              {formError.email}
            </p>
          </div>
          <div className="input-controll">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={details.password}
              onChange={handleChange}
            />
            <p className="error-text" style={{ textAlign: "right" }}>
              {formError.password}
            </p>
          </div>
          <div className="input-controll">
            <label>Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={details.mobileNumber}
              onChange={handleChange}
            />
            <p className="error-text" style={{ textAlign: "right" }}>
              {formError.mobileNumber}
            </p>
          </div>
          <div className="input-controll">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={details.name}
              onChange={handleChange}
            />
            <p className="error-text" style={{ textAlign: "right" }}>
              {formError.name}
            </p>
          </div>
          <div className="input-controll">
            <label>Place</label>
            <input
              type="text"
              name="place"
              value={details.place}
              onChange={handleChange}
            />
            <p className="error-text" style={{ textAlign: "right" }}>
              {formError.place}
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <button className="submit-btn">Register</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
