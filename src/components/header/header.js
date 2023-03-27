import React from "react";
import { useHistory } from "react-router-dom";
import { APP } from './../../constants/appConstants';


function Header() {
  const history = useHistory();

  const logout = () => {
    sessionStorage.removeItem('token')
    // localStorage.clear();
   
    history.push(APP.ROUTER_PATH.LOGIN);
  };
  return (
    <div className="d-flex justify-content-end align-items-center p-2">
      <div className=" d-flex justify-content-end align-items-center">
        <button
          className="custom-log-out-btn"
          type="submit"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
