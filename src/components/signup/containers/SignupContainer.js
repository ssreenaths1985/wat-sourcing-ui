import React from 'react'
import { AuthService } from '../../../services/auth.service';
import SignupView from './../views/SignupView';
import { useHistory } from 'react-router-dom';
import { APP } from './../../../constants/appConstants';
import Notify from './../../../helpers/notify';

function SignupContainer() {

    const history = useHistory();
    const  signupData = (data) => {
        const signup = {
            userName: data.email,
            userPassword: data.password
        }
        AuthService.signup(signup)
        .then((res) =>{
            if(res.data.status === 200){
                history.push(APP.ROUTER_PATH.LOGIN);
            }else {
                Notify.error("Try again Something went wrong");
              }
        })
    }
    return (
        <div className="container-fluid ">
      <div className="row  row-cols-md-2 row-cols-lg-2 row-cols-1">
        <div className="col col-md-7 col-lg-7"></div>
        <div className="col col-md-5 col-lg-5 survey-section-1">
          <SignupView signupData={signupData}  />
        </div>
      </div>
    </div>
    )
}

export default SignupContainer;
