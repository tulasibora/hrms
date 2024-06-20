import axios from "axios";
import React, { useState } from "react";
import "../../Component.css";
import { useNavigate } from "react-router-dom";

const AddDepartMent = () => {
  const [values, setValues] = useState({ dept_name: "" });
  const [error, setError] = useState();
  const navigate = useNavigate();

  ///////////add new department ////////

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { dept_name } = values;
    try {
      const response = await axios.post(
        "http://localhost:8182/api/admin/validateDept",
        { dept_name }
      );
      if (response.data.data >= 1) {
        setError("Email or contact number already exists.");
      } else {
        if (dept_name === "") {
          setError("Please Enter Department");
        } else {
          axios
            .post("http://localhost:8182/api/admin", values)
            .then((response) => {
              if (response.data.success) {
                navigate("/dashboard/department");
              }
            })
            .catch((err) => console.log(err));
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  //////// ADD employee cancel///////////

  const handleCancel = () => {
    navigate("/dashboard/department");
    setValues({ dept_name: "" });
  };
  return (
    <div className="DepartmentAddDiv">
      <div className="addDepart mb-2">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h5 className="mb-5 text-white">ADD NEW DEPARTMENT</h5>
          <div className="mb-4">
            <input
              type="text"
              name="dept_name"
              placeholder="Enter New Department"
              onChange={(e) =>
                setValues({ ...values, dept_name: e.target.value })
              }
              className="form-control rounded-2 inputForm"
            />
          </div>
          {error ? <p style={{ color: "red" }}>{error}</p> : null}
          <div className="ButtonsDiv">
            <button className="mb-3 btn rounded-1">Submit</button>
            <button
              className="mb-3 btn rounded-1"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepartMent;
