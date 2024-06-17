import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../Component.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TableContainer, TablePagination, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
        <div className="formDivForSearchDept">
          <div>
            <input
              type="text"
              name="dept_name"
              placeholder="Search Department Name"
              onChange={(e) =>
                setValues({ ...values, dept_name: e.target.value })
              }
              style={{ width: "34rem", border: "1px solid grey" }}
              className="form-control rounded-1"
            />
          </div>
          <div>
            <button
              variant="contained"
              className="addButton"
              onClick={() => handleAdd()}
            >
              ADD
            </button>
          </div>
        </div>
      </div>
      <div className="TableOuterDiv">
        <TableContainer className="tableContainerDept">
          <Table className="table tableContentDiv">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Department</StyledTableCell>
                <StyledTableCell>Edit</StyledTableCell>
                <StyledTableCell>Delete</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {department.map((dept) => {
                return (
                  <StyledTableRow
                    key={dept.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell>{dept.id}</StyledTableCell>
                    <StyledTableCell>{dept.dept_name}</StyledTableCell>
                    <StyledTableCell>
                      <EditIcon onClick={() => handleEditDepartment(dept.id)} />
                    </StyledTableCell>
                    <StyledTableCell>
                      <DeleteIcon
                        onClick={() => handleDeleteDepartment(dept.id)}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
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
