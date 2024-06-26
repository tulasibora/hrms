import Department from "./Components/Dashboard/Department/Department";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import EmployeeData from "./Components/Dashboard/Employee/EmployeeData";
import AddEmployee from "./Components/Dashboard/Employee/AddEmployee";
import EditEmployee from "./Components/Dashboard/Employee/EditEmployee";
import AddDepartMent from "./Components/Dashboard/Department/AddDepartment";
import EditDepartment from "./Components/Dashboard/Department/EditDepartment";
import Login from "./Components/Login/Login";
import DashBoard from "./Components/Dashboard/DashBoard";
import EmployeeDetails from "./Components/Dashboard/Employee/EmployeeDetails";
import ProtectedRouter from "./Components/ProtectedRouter";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element=<Login /> />
          <Route
            path="/employeeDetails"
            element=<ProtectedRouter>
              <EmployeeDetails />
            </ProtectedRouter>
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRouter>
                <DashBoard />
              </ProtectedRouter>
            }
          >
            <Route path="/dashboard" element={<EmployeeData />} />
            <Route path="/dashboard/department" element={<Department />} />
            <Route
              path="/dashboard/addDeparrment"
              element={<AddDepartMent />}
            />
            <Route
              path="/dashboard/employeeDetails"
              element={<EmployeeDetails />}
            />
            <Route
              path="/dashboard/editDeparrment/:id"
              element={<EditDepartment />}
            />
            <Route path="/dashboard/addNewEmployee" element={<AddEmployee />} />
            <Route
              path="/dashboard/editEmployee/:id"
              element={<EditEmployee />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
