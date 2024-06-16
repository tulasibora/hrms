import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ValidatingPage() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:8182/verify").then((response) => {
      if (response.data.Status) {
        if (response.data.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/employeeDetails/" + response.data.id);
        }
      }
    });
  }, []);
  return (
    <div>
      <div className="p-2 d-flex justify-content-center align-items-center vh-100 formDiv">
        <div className="p-3 rounded w-25 border loginForm">
          <h3 className="bt-3">Login Form</h3>
          <div className="my-3 loginValidationForm">
            <button
              className="btn btn-primary "
              onClick={() => navigate("/employeelogin")}
            >
              Employee Login
            </button>
            <button
              className="btn btn-success "
              onClick={() => navigate("/adminlogin")}
            >
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ValidatingPage;
