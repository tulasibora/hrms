import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditDepartment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dept, setDept] = useState({ name: "" });
  console.log(dept);
  useEffect(() => {
    axios
      .get("http://localhost:8182/auth/departments/" + id)
      .then((res) => setDept({ ...dept, name: res.data.data[0].dept_name }))
      .catch((err) => console.log(err));
  }, []);

  // submit departmet

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8182/auth/editdepartment/" + id, dept)
      .then((response) => {
        if (response.data.Status) {
          navigate("/dashboard/department");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    navigate("/dashboard/department");
  };
  return (
    <div className="addDepart mb-2">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h5 className="mb-5">Add New Department</h5>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            value={dept.name}
            placeholder="Enter New Department"
            onChange={(e) => setDept({ ...dept, name: e.target.value })}
            className="form-control rounded-0 inputForm"
          />
        </div>
        <div>
          <button className="mb-3 btn btn-primary w-25 rounded-0">
            Submit
          </button>
          <button
            className="mb-3 btn btn-primary w-25 rounded-0"
            onClick={() => handleCancel()}
          >
            Cacel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditDepartment;
