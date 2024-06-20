import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditDepartment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dept, setDept] = useState({ name: "" });

  //////////to fetch paricular deparment ////////
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const res = await axios.get(`http://localhost:8182/api/admin/${id}`);
        setDept({ ...dept, name: res.data.data[0].dept_name });
      } catch (err) {
        console.log(err);
      }
    };

    fetchDepartment();
  }, [id]);

  //////// submit Edited department ///////////

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8182/api/admin/${id}`,
        dept
      );
      if (response.data.success) {
        navigate("/dashboard/department");
      }
    } catch (err) {
      console.log(err);
    }
  };

  ///////////to cancel the editing dept //////

  const handleCancel = () => {
    navigate("/dashboard/department");
  };
  return (
    <div className="DepartmentAddDiv">
      <div className="addDepart mb-2">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h5 className="mb-5 text-white">EDIT DEPARTMENT NAME</h5>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={dept.name}
              placeholder="Enter New Department"
              onChange={(e) => setDept({ ...dept, name: e.target.value })}
              className="form-control rounded-2 inputForm"
            />
          </div>
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
}

export default EditDepartment;
