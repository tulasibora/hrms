import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Component.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  axios.defaults.withCredentials = true;

  //////////////////Validate the login data///////////

  useEffect(() => {
    try {
      const response = axios.get("http://localhost:8182/verify");
      const result = response.data;

      if (result.success) {
        const id = result.id;
        if (result?.role === "admin") {
          navigate("/dashboard", { state: id });
          setError("");
        } else if (result?.role === "employee") {
          navigate("/employeeDetails", { state: id });
        } else {
          setError(result?.message);
        }
      }
    } catch (error) {
      console.error("Verification error:", error);
    }
  });
  //////////////////////// login /////////////

  const handleSubmitLoginCredientials = async (event) => {
    event.preventDefault();

    const { email, password } = values;

    try {
      if (email === "" || password === "") {
        setError(" Please enter Email and Password Empty");
      } else {
        const result = await axios.post(
          "http://localhost:8182/api/auth/login",
          values
        );

        if (result.data.success) {
          const id = result.data.id;
          localStorage.setItem("valid", id);
          if (result.data.role === "admin") {
            navigate("/dashboard", { state: id });
            setError("");
          } else if (result.data.role === "employee") {
            navigate("/employeeDetails", { state: id });
          } else {
            setError(result.data.message);
          }
        }
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred during login. Please try again.");
    }
  };

  //////////////////////// login as a guest/////////////

  const handleGuestLogin = async () => {
    // event.preventDefault();
    const value = {
      email: "admin@gmail.com",
      password: "1234",
    };

    try {
      const result = await axios.post(
        "http://localhost:8182/api/auth/login",
        value
      );
      if (result.data.success) {
        const id = result.data.id;
        localStorage.setItem("valid", id);
        if (result.data.role === "admin") {
          navigate("/dashboard", { state: id });
          setError("");
        } else if (result.data.role === "employee") {
          navigate("/employeeDetails", { state: id });
        } else {
          setError(result.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="formDiv">
      <h3 className="loginFormHeadding">EMPLOYEE MANAGEMENT SYSTEM</h3>
      <div className="loginForm">
        <h3 className="FormHeadding"> LOGIN FORM</h3>
        <div className="emailNpasswordDiv">
          <form onSubmit={(e) => handleSubmitLoginCredientials(e)}>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Enter Email"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                className="form-control rounded-3 inputForm"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                autoComplete="off"
                placeholder="Enter Password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                className="form-control rounded-3 inputForm"
              />
            </div>
            {error && <div className="text-danger mb-2">{error}</div>}
            <button className="mb-1 btn btn-primary w-100 rounded-3">
              Submit
            </button>
            <label style={{ textAlign: "left", fontSize: "0.7rem" }}>
              to test the application
            </label>
            <button
              onClick={() => handleGuestLogin()}
              className="mb-4 btn  w-100 rounded-3 adminGuest"
            >
              Login as Admin Guest
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
