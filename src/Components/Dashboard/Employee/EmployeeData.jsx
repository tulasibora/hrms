import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "../../Component.css";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function EmployeeData() {
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(10);
  const [values, setValues] = useState({
    name: "",
    email: "",
    job_title: "",
  });
  const navigate = useNavigate();
  const [resultData, setResultData] = useState({});
  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    //get departmets list
    getEmpolyeeList();
  }, [pageNumber]);
  useEffect(() => {
    //get departmets list
    getEmpolyeeList();
  }, [limit]);
  useEffect(() => {
    //get departmets list
    getEmpolyeeList();
  }, []);
  /// handle Navigate to edit page

  const handleAddEmpolyee = () => {
    navigate("/dashboard/addNewEmployee");
  };

  ///// get employeeDetails data
  const getEmpolyeeList = () => {
    axios
      .get(
        `http://localhost:8182/employee?page=${pageNumber}&limit=${limit}
        &name=${values.name}&email=${values.email}&job_title=${values.job_title}`
      )
      .then((response) => {
        setResultData(response);
        setEmployee(response.data.data);
      })
      .catch((err) => console.log(err));
  };

  /////////////Handle Search

  const handleSubmit = () => {
    // event.preventDefault();
    axios
      .get(
        `http://localhost:8182/employee?page=${pageNumber}&limit=${limit}
        &name=${values.name}&email=${values.email}&job_title=${values.job_title}`
      )
      .then((res) => {
        setResultData(res);
        setEmployee(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  // delete record from employee table

  const handleDeleteEmployeeRecord = (id) => {
    axios
      .delete("http://localhost:8182/employee/delete_employee/" + id)
      .then((res) => {
        if (res.data.Status) {
          window.location.reload();
          getEmpolyeeList();
        }
      })
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

  useEffect(() => {
    handleSubmit();
  }, [values.name || values.email || values.job_title]);

  return (
    <div className="employeeData">
      <div className="divHedding">
        <div className="formDivForSearch">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Search By Name"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              style={{ width: "19rem", border: "1px solid black" }}
              className="form-control rounded-1 inputFormSearch"
            />
          </div>
          <div>
            <input
              type="text"
              name="email"
              placeholder="Search By Email"
              style={{ width: "19rem", border: "1px solid black" }}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded-1 inputFormSearch"
            />
          </div>
          <div>
            <input
              type="text"
              name="job_title"
              placeholder="Search By JobTitle"
              style={{ width: "19rem", border: "1px solid black" }}
              onChange={(e) =>
                setValues({ ...values, job_title: e.target.value })
              }
              className="form-control rounded-1 inputFormSearch"
            />
          </div>
          <div>
            <button
              variant="contained"
              className="addButton"
              onClick={() => handleAddEmpolyee()}
            >
              ADD
            </button>
          </div>
        </div>
      </div>
      <div>
        <TableContainer className="tableContainer">
          <Table className="table tableContentDiv">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Contact Number</StyledTableCell>
                <StyledTableCell>Department Id</StyledTableCell>
                <StyledTableCell>Job Title</StyledTableCell>
                <StyledTableCell>Date OF Joining</StyledTableCell>
                <StyledTableCell>Date Of Birth</StyledTableCell>
                <StyledTableCell>Delete</StyledTableCell>
                <StyledTableCell>Edit</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {employee.map((emp) => {
                return (
                  <StyledTableRow
                    key={emp.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell>{emp.id}</StyledTableCell>
                    <StyledTableCell>{emp.name}</StyledTableCell>
                    <StyledTableCell>{emp.email}</StyledTableCell>
                    <StyledTableCell>{emp.contact}</StyledTableCell>
                    <StyledTableCell>{emp.dept_id}</StyledTableCell>
                    <StyledTableCell>{emp.job_title}</StyledTableCell>
                    <StyledTableCell>
                      {moment(emp.DOB).format("YYYY-MM-DD")}
                    </StyledTableCell>
                    <StyledTableCell>
                      {moment(emp.DOJ).format("YYYY-MM-DD")}
                    </StyledTableCell>
                    <StyledTableCell>
                      <EditIcon
                        onClick={() =>
                          navigate(`/dashboard/editEmployee/` + emp.id)
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <DeleteIcon
                        onClick={() => handleDeleteEmployeeRecord(emp.id)}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={resultData?.data?.total}
          page={pageNumber - 1}
          onPageChange={handleChangePage}
          rowsPerPage={limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}

export default EmployeeData;
