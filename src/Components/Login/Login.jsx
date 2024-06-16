import React, { useState } from "react";
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
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8182/auth/adminlogin", values)
      .then((result) => {
        if (result.data.loginStatus) {
          localStorage.setItem("valid", true);
          navigate("/dashboard");
          setError("");
        } else {
          setError(result.data.Error);
        }
      })
      .catch((error) => console.log(error));
  };
  console.log(error);
  return (
    <div className="p-2 d-flex justify-content-center align-items-center vh-100 formDiv">
      <div className="p-3 rounded w-25 border loginForm">
        <h3>Login Form</h3>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label className="mb-2">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter Email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded-0 inputForm"
            />
          </div>
          <div className="mb-3">
            <label className="mb-2">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              name="password"
              autoComplete="off"
              placeholder="Enter Password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="form-control rounded-0 inputForm"
            />
          </div>
          {error && <div className="text-danger mb-2">{error}</div>}
          <button className="mb-3 btn btn-primary w-100 rounded-0">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
