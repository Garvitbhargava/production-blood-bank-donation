import React from "react";
//import { userMenu } from "./userMenu";
import { Link, useLocation } from "react-router-dom";
import "../../../../styles/Layout.css";
import { useSelector } from "react-redux";

const Sidebar = () => {
  //Get User state

  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  return (
    <div className="sidebar">
      <div className="menu">
        {user?.role === "organization" && (
          <>
            <div
              className={`menu-item ${location.pathname === "/" && "active"}`}
            >
              <i className="fa-solid fa-warehouse"></i>
              <Link to="/">Inventory</Link>
            </div>
            <div
              className={`menu-item ${
                location.pathname === "/donar" && "active"
              }`}
            >
              <i className="fa-solid fa-hand-holding-dollar"></i>
              <Link to="/donar">Donar</Link>
            </div>
            <div
              className={`menu-item ${
                location.pathname === "/hospital" && "active"
              }`}
            >
              <i className="fa-solid fa-hospital"></i>
              <Link to="/hospital">Hospital</Link>
            </div>
          </>
        )}
        {user?.role === "admin" && (
          <>
            <div
              className={`menu-item ${
                location.pathname === "/donar-list" && "active"
              }`}
            >
              <i className="fa-solid fa-warehouse"></i>
              <Link to="/donar-list">Donar List</Link>
            </div>
            <div
              className={`menu-item ${
                location.pathname === "/hospital-list" && "active"
              }`}
            >
              <i className="fa-solid fa-hand-holding-dollar"></i>
              <Link to="/hospital-list">Hospital List</Link>
            </div>
            <div
              className={`menu-item ${
                location.pathname === "/org-list" && "active"
              }`}
            >
              <i className="fa-solid fa-hospital"></i>
              <Link to="/org-list">Organization List</Link>
            </div>
          </>
        )}
        {(user?.role === "donar" || user?.role === "hospital") && (
          <div
            className={`menu-item ${
              location.pathname === "/organization" && "active"
            }`}
          >
            <i className="fa-sharp fa-solid fa-building-ngo"></i>
            <Link to="/organization">Organization</Link>
          </div>
        )}
        {user?.role === "hospital" && (
          <div
            className={`menu-item ${
              location.pathname === "/consumer" && "active"
            }`}
          >
            <i className="fa-sharp fa-solid fa-building-ngo"></i>
            <Link to="/consumer">Consumer</Link>
          </div>
        )}
        {user?.role === "donar" && (
          <div
            className={`menu-item ${
              location.pathname === "/donation" && "active"
            }`}
          >
            <i className="fa-sharp fa-solid fa-building-ngo"></i>
            <Link to="/donation">Donation</Link>
          </div>
        )}

        {/* {userMenu.map((menu) => {
          const isActive = location.pathname === menu.path;
          return (
            <div
              className={`menu-item ${isActive ? "active" : ""}`}
              key={menu.name}
            >
              <i className={`fas ${menu.icon}`}></i>
              <Link to={menu.path}>{menu.name}</Link>
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default Sidebar;
