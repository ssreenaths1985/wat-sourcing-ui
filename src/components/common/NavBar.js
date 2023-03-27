import React from "react";
import { APP } from "../../constants";
import { useHistory } from "react-router-dom";

/**
 * Component returns
 * the iGOT logo in the navbar
 */

const NavBar = ({ isLogOut, routerValue, isShowHeader, headerValue }) => {
  const history = useHistory();

  const logout = () => {
    sessionStorage.removeItem("token");
    localStorage.clear();
    if (routerValue === "SUPER_ADMIN_LOGIN") {
      history.push(APP.ROUTER_PATH.SUPER_ADMIN_LOGIN);
    } else {
      history.push(APP.ROUTER_PATH.LOGIN);
    }
  };

  return (
    <nav className="navbar custom-navbar-1">
      <div className="container-fluid h-100">
        {!isShowHeader ? (
          <img
            src="/img/logos/iGOT_logo_light.svg"
            alt="iGOT logo"
            height="33"
            className="mx-0 mx-md-5 mx-lg-5 mx-xl-5 mx-xxl-5 px-0 px-md-5 px-lg-5 px-xl-5 px-xxl-5"
          />
        ) : (
          <div className="d-flex flex-row">
            <img
              src="/img/logos/iGOT_logo_light.svg"
              alt="iGOT logo"
              height="33"
              className="ms-0 ms-md-5 ms-lg-5 ms-xl-5 ms-xxl-5 custom-nav-logo-1"
            />
            <div className="custom-vl-1 mx-4"></div>
            <h1 className="nav-header-1">{headerValue}</h1>
          </div>
        )}

        {isLogOut && (
          <div className="float-end">
            <span
              className="material-icons me-4 mt-1 cursor-1"
              title="Logout"
              onClick={logout}
            >
              logout
            </span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
