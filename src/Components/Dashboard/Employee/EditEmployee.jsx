import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const defaultValue = {
  name: "",
  dept_id: "",
  password: "",
  email: "",
  job_title: "",
  contact: "",
  DOB: "",
  DOJ: "",
  role: "",
};
function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState("");
  const [employee, setEmployee] = useState(defaultValue);
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get departments list
        const departmentRes = await axios.get(
          "http://localhost:8182/api/admin"
        );
        setDepartment(departmentRes.data.data);

        // Get particular record
        const employeeRes = await axios.get(
          `http://localhost:8182/api/employee/${id}`
        );
        const employeeData = employeeRes.data.data[0];
        setEmployee({
          ...employee,
          name: employeeData.name,
          role: employeeData.role,
          dept_id: employeeData.dept_id,
          email: employeeData.email,
          job_title: employeeData.job_title,
          contact: employeeData.contact,
          DOB: moment(employeeData.DOB).format("YYYY-MM-DD"),
          DOJ: moment(employeeData.DOJ).format("YYYY-MM-DD"),
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  /////////////// submit the Edited data   ///////////////

  const handleSubmitEditedData = async (event) => {
    event.preventDefault();
    const { name, dept_id, email, job_title, contact, DOB, DOJ, role } =
      employee;

    if (
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
      try {
        const res = await axios.put(
          `http://localhost:8182/api/employee/${id}`,
          employee
        );
        if (res.data.success) {
          navigate("/dashboard");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  /////Cancel to add new Employee /////////
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
          <div className="mb-2">
            <select
              disabled={true}
              defaultValue=""
              name="role"
              onChange={(e) =>
                setEmployee({ ...employee, role: e.target.value })
              }
              className="selectInput"
            >
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
