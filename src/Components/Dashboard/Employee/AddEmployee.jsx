import React, { useEffect, useState } from "react";
import "../../Component.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const defaultValue = {
  password: "",
  name: "",
  dept_id: undefined,
  email: "",
  job_title: "",
  contact: "",
  DOB: "",
  DOJ: "",
};

function AddEmployee() {
  const navigate = useNavigate();
  const [values, setValues] = useState(defaultValue);
  const [department, setDeparment] = useState([]);
  const [error, setError] = useState("");

  // get Departmets in DataBase

  useEffect(() => {
    axios
      .get("http://localhost:8182/auth/departmentsDropdown")
      .then((res) => setDeparment(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  //To Submit The Employee data
  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.dept_id == undefined) {
      setError("Please Slect Department");
    } else {
      axios
        .post("http://localhost:8182/employee/add_employee", values)
        .then((response) => {
          if (response.data.Status) {
            navigate("/dashboard");
            setError(undefined);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  // Cancel Add new employee

  const handleCancel = () => {
    navigate("/dashboard");
    setValues(defaultValue);
  };

  return (
    <div className="addEmployeeMainDiv">
      <div className="addEmployeeDiv ">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h5 className="mb-3">ADD NEW EMPLOYEE</h5>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="form-control rounded-1 inputForm"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              placeholder="Enter Name "
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              className="form-control rounded-1 inputForm"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="email"
              placeholder="Enter Mail Id"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded-1 inputForm"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="job_title"
              placeholder="Enter Job Title"
              onChange={(e) =>
                setValues({ ...values, job_title: e.target.value })
              }
              className="form-control rounded-1 inputForm"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="contact"
              placeholder="Enter Contact Number"
              onChange={(e) =>
                setValues({ ...values, contact: e.target.value })
              }
              className="form-control rounded-1 inputForm"
            />
          </div>
          <div className="mb-3">
            <input
              type="date"
              name="DOB"
              onChange={(e) => setValues({ ...values, DOB: e.target.value })}
              className="form-control rounded-1 inputForm"
            />
          </div>
          <div className="mb-3">
            <input
              type="date"
              name="DOJ"
              onChange={(e) => setValues({ ...values, DOJ: e.target.value })}
              className="form-control rounded-1 inputForm"
            />
          </div>
          {error ? <p style={{ color: "tomato" }}>{error}</p> : null}
          <div className="mb-3">
            <select
              defaultValue=""
              name="dept_id"
              onChange={(e) =>
                setValues({ ...values, dept_id: e.target.value })
              }
              className="selectInput"
            >
              {department?.map((dept) => {
                return (
                  <option key={dept.id} value={dept.id}>
                    {dept.dept_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="ButtonsDiv">
            <button className="mb-3 btn SubmitNCancel">Submit</button>
            <button onClick={handleCancel} className="mb-3  btn SubmitNCancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
