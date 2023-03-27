import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserDetailsView from "./UserDetailsView";
import { AdminService } from "../../../services/admin.service";
import NavBar from "../../common/NavBar";
import Notify from "../../../helpers/notify";

const DepartmentDetailsView = (props) => {
  const history = useHistory();
  const [deptDetails, setDeptDetails] = useState([]);
  const [userId, setUserId] = useState("");
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    AdminService.getDepartmentDetails(props.departmentName).then((data) =>
      setDeptDetails(data.data)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUser = (id) => {
    setUserId(id);
    AdminService.getUserDetails(id).then((data) => {
      if (data.data.data[0]) {
        setUserDetails(data.data.data[0]);
      } else {
        Notify.error("Officer details not found.");
      }
    });
  };

  const handleDepartment = () => {
    history.push("/admin/departments");
  };

  const downloadDeptData = (e) => {
    e.preventDefault();

    if (props && props.departmentName) {
      let userDepartment = props.departmentName;
      AdminService.downloadDataAsCsvForDept(userDepartment).then((response) => {
        if (response && response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${props.departmentName}.csv`);
          document.body.appendChild(link);
          link.click();
        }
      });
    }
  };

  return (
    <>
      <NavBar
        isLogOut={true}
        routerValue="LOGIN"
        isShowHeader={true}
        headerValue="WAT Sourcing Admin portal"
      />
      <div className="container-fluid">
        <div className="row row-height">
          <div className="col-md-6 scroll">
            <label
              onClick={() => handleDepartment()}
              className="mt-4 mx-5 button-label-1"
            >
              <span className="material-icons arrow-back-1 pe-2">
                arrow_back
              </span>
              Back to department
            </label>
            <div className="container mt-4">
              <div className="row mx-3">
                <div className="col-sm-12 col-md-8 col-lg-9 col-xl-10 col-xxl-10 p-0 m-0">
                  <h4 className="heading-2">
                    <span className="text-capitalize">
                      {props.departmentName}
                    </span>
                  </h4>
                </div>
                <div className="col-sm-2 col-md-4 col-lg-3 col-xl-2 col-xxl-2 p-0 m-0">
                  <div className="float-end">
                    <button
                      className="add-btn-1 custom-btn-height-1"
                      onClick={(e) => downloadDeptData(e)}
                    >
                      Export all
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="pt-4 mx-3">
                <div className="d-flex py-4 survey-section-2 px-3">
                  <div className="col-md-4 ms-0 d-flex justify-content-center">
                    Officer Name
                  </div>
                  <div className="col-md-4 d-flex justify-content-center">
                    Designation
                  </div>
                  <div className="col-md-4 d-flex justify-content-center">
                    Reporting Manager
                  </div>
                </div>
              </div>
              {deptDetails.map((data, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => getUser(data.id)}
                    className={`${
                      userId === data.id
                        ? "mx-3 px-1 custom-table-row-selected-1 p-2 mt-2"
                        : "mx-3 px-1 custom-table-row-unselected-1 p-2 mt-2"
                    }`}
                  >
                    <div
                      role="button"
                      className="row d-flex py-3 px-3 custom-table-row-btn-1"
                    >
                      <div className="col-md-4 d-flex justify-content-center ">
                        <span className="text-capitalize">
                          {data.user_name}
                        </span>
                      </div>
                      <div className="col-md-4 d-flex justify-content-center ">
                        <span className="text-capitalize">
                          {data.user_designation}
                        </span>
                      </div>
                      <div className="col-md-4 d-flex justify-content-center ">
                        <span className="text-capitalize">
                          {data.reporting_officer_name}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-md-6 survey-section-1 scroll">
            {userDetails !== "" && userId && (
              <UserDetailsView
                data={userDetails}
                departmentName={props.departmentName}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentDetailsView;

