import axios from "axios";
import React, { useState } from "react";
import "../../Component.css";
import { useNavigate } from "react-router-dom";

const AddDepartMent = () => {
  const [values, setValues] = useState({ name: "" });
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8182/auth/add_department", values)
      .then((response) => {
        if (response.data.Status) {
          navigate("/dashboard/department");
        }
      })
      .catch((err) => console.log(err));
  };

  /// cancel

  const handleCancel = () => {
    navigate("/dashboard/department");
    setValues({ name: "" });
  };
  return (
    <div className="addDepart mb-2">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h5 className="mb-5">Add New Department</h5>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            placeholder="Enter New Department"
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            className="form-control rounded-0 inputForm"
          />
        </div>
        <div>
          <button className="mb-3 btn btn-primary w-50 rounded-0">
            Submit
          </button>
          <button
            className="mb-3 btn btn-primary w-50 rounded-0"
            onClick={() => handleCancel()}
          >
            Cacel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDepartMent;