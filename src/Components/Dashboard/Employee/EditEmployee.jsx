import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const defaultValue = {
  name: "",
  dept_id: 1,
  email: "",
  job_title: "",
  contact: "",
  DOB: "",
  DOJ: "",
};
function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState(defaultValue);
  const [department, setDeparment] = useState([]);
  useEffect(() => {
    ///get departmets list
    axios
      .get("http://localhost:8182/auth/departmentsDropdown")
      .then((res) => setDeparment(res.data.data))
      .catch((err) => console.log(err));

    // get Particular Record
    axios
      .get("http://localhost:8182/employee/" + id)
      .then((resonse) =>
        setEmployee({
          ...employee,
          name: resonse.data.data[0].name,
          dept_id: resonse.data.data[0].dept_id,
          email: resonse.data.data[0].email,
          job_title: resonse.data.data[0].job_title,
          contact: resonse.data.data[0].contact,
          DOB: moment(resonse.data.data[0].DOB).format("YYYY-MM-DD"),
          DOJ: moment(resonse.data.data[0].DOJ).format("YYYY-MM-DD"),
        })
      )
      .catch((err) => console.log(err));
  }, []);

  console.log(employee);
  /// submit the Edited data

  const handleSubmitEditedData = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8182/employee/edit_employee/" + id, employee)
      .then((res) => {
        if (res.data.Status) {
          navigate("/dashboard");
        }
      })
      .catch((err) => console.log(err));
  };
  const handleCancel = () => {
    navigate("/dashboard");
  };
  return (
    <div className="addEmployeeMainDiv">
      <div className="mt-1 addEmployeeDiv ">
        <form onSubmit={(e) => handleSubmitEditedData(e)}>
          <h5 className="mb-3">Edit Employee</h5>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              value={employee.name}
              placeholder="Enter Name "
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
              className="form-control rounded-0 inputForm"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="email"
              value={employee.email}
              placeholder="Enter Mail Id"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
              className="form-control rounded-0 inputForm"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="job_title"
              value={employee.job_title}
              placeholder="Enter Job Title"
              onChange={(e) =>
                setEmployee({ ...employee, job_title: e.target.value })
              }
              className="form-control rounded-0 inputForm"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="contact"
              value={employee.contact}
              placeholder="Enter Contact Number"
              onChange={(e) =>
                setEmployee({ ...employee, contact: e.target.value })
              }
              className="form-control rounded-0 inputForm"
            />
          </div>
          <div className="mb-3">
            <input
              type="date"
              name="DOB"
              value={employee.DOB}
              onChange={(e) =>
                setEmployee({ ...employee, DOB: e.target.value })
              }
              className="form-control rounded-0 inputForm"
            />
          </div>
          <div className="mb-3">
            <input
              type="date"
              name="DOJ"
              value={employee.DOJ}
              onChange={(e) =>
                setEmployee({ ...employee, DOJ: e.target.value })
              }
              className="form-control rounded-0 inputForm"
            />
          </div>
          <div className="mb-3">
            <select
              name="dept_id"
              value={employee.dept_id}
              onChange={(e) =>
                setEmployee({ ...employee, dept_id: e.target.value })
              }
              className="selectInput"
            >
              {department.map((dept) => {
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
            <button onClick={handleCancel} className="mb-3 btn SubmitNCancel">
              Cacel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmployee;
