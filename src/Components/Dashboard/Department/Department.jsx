import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../Component.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, TableContainer, TablePagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Department() {
  const navigate = useNavigate();
  const [department, setDeparments] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [resultData, setResultData] = useState({});
  const [limit, setLimit] = useState(10);
  const [values, setValues] = useState({
    dept_name: "",
  });

  const getDepartmentsData = () => {
    axios
      .get(
        `http://localhost:8182/auth/departments?page=${pageNumber}&limit=${limit}
        &dept_name=${values.dept_name}`
      )
      .then((response) => {
        setDeparments(response.data.data);
        setResultData(response);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getDepartmentsData();
  }, []);
  useEffect(() => {
    //get departmets list
    getDepartmentsData();
  }, [pageNumber]);
  useEffect(() => {
    //get departmets list
    getDepartmentsData();
  }, [limit]);
  const handleAdd = () => {
    navigate("/dashboard/addDeparrment");
  };

  ///navigate Edit Department
  const handleEditDepartment = (id) => {
    navigate("/dashboard/editDeparrment/" + id);
  };

  /// Delete Department record
  const handleDeleteDepartment = (id) => {
    axios
      .delete("http://localhost:8182/auth/delete_departments/" + id)
      .then((res) => window.location.reload())
      .catch((err) => {
        console.log(err);
      });
  };

  //////////// PAGINATION

  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(event.target.value);
    setPageNumber(1);
  };

  ////// Based On Search
  useEffect(() => {
    getDepartmentsData();
  }, [values.dept_name]);

  return (
    <div>
      <div className="divHedding">
        <div className="formDivForSearch">
          <div>
            <input
              type="text"
              name="dept_name"
              placeholder="Search Department Name"
              onChange={(e) =>
                setValues({ ...values, dept_name: e.target.value })
              }
              style={{ width: "47rem" }}
              className="form-control rounded-1"
            />
          </div>
        </div>
        <button
          variant="contained"
          className="addButton"
          onClick={() => handleAdd()}
        >
          ADD
        </button>
      </div>
      <div className="TableOuterDiv">
        <TableContainer className="tableContainerDept">
          <Table className="table tableContentDiv">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {department.map((dept) => {
                return (
                  <TableRow
                    key={dept.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{dept.id}</TableCell>
                    <TableCell>{dept.dept_name}</TableCell>
                    <TableCell>
                      <EditIcon onClick={() => handleEditDepartment(dept.id)} />
                    </TableCell>
                    <TableCell>
                      <DeleteIcon
                        onClick={() => handleDeleteDepartment(dept.id)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={resultData?.data?.total}
            page={pageNumber - 1}
            onPageChange={handleChangePage}
            rowsPerPage={limit}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    </div>
  );
}

export default Department;
