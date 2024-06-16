import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EmployeeLoginForm() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  axios.defaults.withCredentials = true;

  //////////////////VALIDATE THE EMPLOYEE DATA ///////////

  const handleSubmitLoginCredientials = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8182/employee/employeelogin", values)
      .then((result) => {
        if (result.data.loginStatus) {
          localStorage.setItem("valid", true);
          navigate("/employeeDetails/" + result.data.id);
        } else {
          setError(result.data.Error);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="formDiv">
      <div className="loginForm">
        <h3 className="FormHeadding">EMPLOYEE LOGIN FORM</h3>
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
                className="form-control rounded-2 inputForm"
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
                className="form-control rounded-2 inputForm"
              />
            </div>
            {error && <div className="text-danger mb-2">{error}</div>}
            <button className="mb-3 btn btn-primary w-100 rounded-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EmployeeLoginForm;
