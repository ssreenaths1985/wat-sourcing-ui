import React, { useEffect } from "react";
import Loginview from "./../views/Loginview";
import { useHistory } from "react-router-dom";
import { AuthService } from "../../../services/auth.service";
import Notify from "../../../helpers/notify";
import { APP } from "./../../../constants/appConstants";

function LoginContainer() {
  const history = useHistory();
  const loginData = (data) => {
    const login = {
      email: data.email,
      password: data.password,
    };
    AuthService.signIn(login).then((res) => {
      if (res && res.data.success === 1) {
        if (res.data.data.role === "admin") {
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("adminData", JSON.stringify(res.data.data));
          history.push(APP.ROUTER_PATH.ALL_DEPARTMENTS);
        } else {
          Notify.error("Invalid credentials!");
        }
      } 
      // else {
      //   Notify.error("Invalid credentials!");
      // }
    });
  };

  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
  }, []);

  return (
    <div className="container-fluid ">
      <div className="row  row-cols-md-2 row-cols-lg-2 row-cols-1">
        <div className="col col-md-7 col-lg-7"></div>
        <div className="col col-md-5 col-lg-5 survey-section-1">
          <Loginview loginData={loginData} />
        </div>
      </div>
    </div>
  );
}

export default LoginContainer;
