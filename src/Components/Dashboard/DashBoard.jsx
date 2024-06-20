import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../Component.css";
function DashBoard() {
  axios.defaults.withCredentials = true;
  const pathname = window.location.pathname;
  const navigate = useNavigate();

  ///////  Log out  user ////////////

  const handleLogOut = () => {
    axios
      .get("http://localhost:8182/api/auth/logout")
      .then((res) => {
        if (res.data.success) {
          localStorage.removeItem("valid");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="containerDiv ">
      <div className="col p-0 m-0">
        <div className="shadow navBarDiv">
          <h4 className="dashboardHeadding">Emoployee Management System</h4>
          <ul className="nav listNavbar" id="menu">
            <li>
              <Link
                to="/dashboard"
                className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto  text-decoration-none"
              >
                {pathname === "/dashboard" ||
                pathname === "/dashboard/addNewEmployee" ? (
                  <span className="fs-7 fw-bolder d-none d-sm-inline text-blue">
                    Manage Employee
                  </span>
                ) : (
                  <span className="fs-7 fw-bolder d-none d-sm-inline text-white">
                    Manage Employee
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/department"
                className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto  text-decoration-none"
              >
                {pathname === "/dashboard/department" ? (
                  <span className="fs-7 fw-bolder d-none d-sm-inline text-blue ">
                    Department
                  </span>
                ) : (
                  <span className="fs-7 fw-bolder d-none d-sm-inline text-white ">
                    Department
                  </span>
                )}
              </Link>
            </li>

            <li onClick={() => navigate("/dashboard/EmployeeDetails")}>
              <Link
                to="/dashboard"
                className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto  text-decoration-none"
              >
                {pathname === "/dashboard/EmployeeDetails" ? (
                  <span className="fs-7 fw-bolder d-none d-sm-inline text-blue ">
                    Profile
                  </span>
                ) : (
                  <span className="fs-7 fw-bolder d-none d-sm-inline text-white ">
                    Profile
                  </span>
                )}
              </Link>
            </li>
            <li onClick={() => handleLogOut()}>
              <Link
                to="/dashboard"
                className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto  text-decoration-none"
              >
                <span className="fs-7 fw-bolder d-none d-sm-inline text-white ">
                  Logout
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="mx-2 outletDiv">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;

// <li onClick={() => navigate("/employeeDetails", { state: id })}>
//   <span className="fs-7 fw-bolder d-none d-sm-inline text-white ">
//     Profile
//   </span>
// </li>;
