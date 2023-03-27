import React, { Suspense } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { APP } from "./constants";
import PrivateRoute from "./helpers/privateRoute";

// Code splitting using React.lazy
const SurveyContainer = React.lazy(() =>
  import("./components/surveys/containers/SurveyContainer")
);
const LoginContainer = React.lazy(() =>
  import("./components/login/containers/LoginContainer")
);
const signupContainer = React.lazy(() =>
  import("./components/signup/containers/SignupContainer")
);
const DepartmentslistContainer = React.lazy(() =>
  import("./components/departments/containers/DepartmentslistContainer")
);
const DepartmentUserDetailsContainer = React.lazy(() =>
  import("./components/deptUser/containers/DepartmentUserDetailsContainer")
);
const SurveyContainerV2 = React.lazy(() =>
  import("./components/surveys_v2/containers/SurveyContainer")
);
const SuperAdminLoginContainer = React.lazy(() =>
  import("./components/superAdmin/containers/SuperAdminLoginContainer")
);
const SuperAdminMainContainer = React.lazy(() =>
  import("./components/superAdmin/containers/SuperAdminMainContainer")
);

const Router = (props) => (
  <BrowserRouter>
    <Switch>
      <Suspense fallback={<div>Loading...</div>}>
        {/* <Route exact path="/" component={SurveyContainer} /> */}
        <Route exact path="/" component={SurveyContainerV2} />
        <Route exact path="/v2" component={SurveyContainerV2} />
        <Route
          exact
          path={APP.ROUTER_PATH.SURVEY}
          component={SurveyContainer}
        />
        <Route exact path={APP.ROUTER_PATH.LOGIN} component={LoginContainer} />
        <Route
          exact
          path={APP.ROUTER_PATH.SIGNUP}
          component={signupContainer}
        />
        <PrivateRoute
          exact
          path={APP.ROUTER_PATH.ALL_DEPARTMENTS}
          component={DepartmentslistContainer}
        />
        <PrivateRoute
          exact
          path={APP.ROUTER_PATH.DEPARTMENT_DETAILS}
          component={DepartmentUserDetailsContainer}
        />
        <Route
          exact
          path={APP.ROUTER_PATH.SUPER_ADMIN_LOGIN}
          component={SuperAdminLoginContainer}  
        />
         <Route
          exact
          path={APP.ROUTER_PATH.SUPER_ADMIN_CREATE_DEPT}
          component={SuperAdminMainContainer}  
        />
      </Suspense>
    </Switch>
  </BrowserRouter>
);

export default Router;
