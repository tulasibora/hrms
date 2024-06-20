import React, { useEffect, useState } from "react";
import "../../Component.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const defaultValue = {
  password: "",
  name: "",
  dept_id: "",
  email: "",
  job_title: "",
  contact: "",
  DOB: "",
  DOJ: "",
  role: "",
};

function AddEmployee() {
  const navigate = useNavigate();
  const [values, setValues] = useState(defaultValue);
  const [department, setDepartment] = useState([]);
  const [error, setError] = useState("");

  ///// to get Departmets in DataBase ////

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get("http://localhost:8182/api/admin");
        setDepartment(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDepartments();
  }, []);
  //To Submit The Employee data

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {
      password,
      name,
      dept_id,
      email,
      job_title,
      contact,
      DOB,
      DOJ,
      role,
    } = values;

    try {
      const response = await axios.post(
        "http://localhost:8182/api/employee/emailContact",
        { email, contact }
      );
      if (response.data.data >= 1) {
        setError("Email or contact number already exists.");
      } else {
        if (
          password === "" ||
          name === "" ||
          dept_id === "" ||
          email === "" ||
          job_title === "" ||
          contact === "" ||
          DOB === "" ||
          DOJ === "" ||
          role === ""
        ) {
          setError("Please Fill All Fields");
        } else {
          const result = await axios.post(
            "http://localhost:8182/api/employee/",
            values
          );

          if (result.data.success) {
            navigate("/dashboard");
            setError(undefined);
          } else {
            setError("Something went wrong");
          }
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  /////  Cancel Add new employee and navigate to table page /////

  const handleCancel = () => {
    navigate("/dashboard");
    setValues(defaultValue);
  };

  return (
    <div className="addEmployeeMainDiv">
      <div className="addEmployeeDiv ">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h5 className="mb-2">ADD NEW EMPLOYEE</h5>

          <div className="mb-2">
            <input
              type="text"
              name="name"
              placeholder="Enter Name "
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              className="form-control rounded-1 inputForm"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              name="email"
              placeholder="Enter Mail Id"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded-1 inputForm"
            />
          </div>
          <div className="mb-2">
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
          <div className="mb-2">
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
          <div className="mb-2">
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
          <div className="mb-2">
            <input
              type="date"
              name="DOB"
              onChange={(e) => setValues({ ...values, DOB: e.target.value })}
              className="form-control rounded-1 inputForm"
            />
          </div>
          <div className="mb-2">
            <input
              type="date"
              name="DOJ"
              onChange={(e) => setValues({ ...values, DOJ: e.target.value })}
              className="form-control rounded-1 inputForm"
            />
          </div>
          <div className="mb-2">
            <select
              defaultValue=""
              name="dept_id"
              onChange={(e) =>
                setValues({ ...values, dept_id: e.target.value })
              }
              className="selectInput"
            >
              <option defaultValue="" value="">
                Select Department
              </option>
              {department?.map((dept) => {
                return (
                  <option key={dept.id} defaultValue="" value={dept.id}>
                    {dept.dept_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-2">
            <select
              defaultValue=""
              name="role"
              onChange={(e) => setValues({ ...values, role: e.target.value })}
              className="selectInput"
            >
              <option defaultValue="" value="">
                Select Role
              </option>
              <option defaultValue="" value="admin">
                Admin
              </option>
              <option defaultValue="" value="employee">
                Employee
              </option>
            </select>
          </div>
          {error ? <p style={{ color: "tomato" }}>{error}</p> : null}

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
