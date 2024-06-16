import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function EmployeeDetails() {
  const [employee, setEmployee] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    // get Particular Record
    axios
      .get("http://localhost:8182/employee/" + id)
      .then((resonse) => setEmployee(resonse.data[0]))
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:8182/auth/logout")
      .then((res) => {
        if (res.data.Status) {
          localStorage.removeItem("valid");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      EmployeeDetails
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
}

export default EmployeeDetails;
