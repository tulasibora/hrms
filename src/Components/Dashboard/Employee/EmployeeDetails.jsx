import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import user from "../../../../src/assets/user.png";

function EmployeeDetails() {
  const [employee, setEmployee] = useState({});
  const navigate = useNavigate();

  ///// get Particular Record//////////

  useEffect(() => {
    const storedData = localStorage.getItem("valid");

    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8182/api/employee/${storedData}`
        );
        setEmployee(response.data.data[0]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchEmployeeData();
  }, []);

  ///////////Logout user /////////
  const handleLogoutUser = async () => {
    try {
      const res = await axios.get("http://localhost:8182/api/auth/logout");
      if (res.data.success) {
        localStorage.removeItem("valid");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="employeeformDiv">
      <div className="employeeDetails">
        <img src={user} />
        <h2>EMPLOYEE DETAILS</h2>
        <div>
          <div className="empDetails">
            <h5>
              <span>Employee Id: </span>
              {employee.id ? employee.id : "-------"}
            </h5>
            <h5>
              <span>Employee Name: </span>
              {employee.name ? employee.name : "-------"}
            </h5>
          </div>
          <div className="empDetails">
            <h5>
              <span>Employee Email: </span>
              {employee.email ? employee.email : "-------"}
            </h5>
            <h5>
              <span>Employee Dept Id: </span>
              {employee.dept_id ? employee.dept_id : "-------"}
            </h5>
          </div>
          <div className="empDetails">
            <h5>
              <span>Employee Job Title: </span>
              {employee.job_title ? employee.job_title : "-------"}
            </h5>
            <h5>
              <span>Employee Contact: </span>
              {employee.contact ? employee.contact : "-------"}
            </h5>
          </div>
          <div className="empDetails">
            <h5>
              <span>Employee DOB: </span>
              {employee.DOB ? employee.DOB : "-------"}
            </h5>
            <h5>
              <span>Employee DOJ: </span>
              {employee.DOJ ? employee.DOJ : "-------"}
            </h5>
          </div>
        </div>
        <button
          className=" btn employeeLogout"
          onClick={() => handleLogoutUser()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default EmployeeDetails;
