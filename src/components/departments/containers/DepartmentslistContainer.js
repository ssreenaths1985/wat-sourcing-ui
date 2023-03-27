import React, { useEffect, useState } from "react";
import Departmentlistview from "../views/Departmentlistview";
// import Header from "../../header/header";
import { AdminService } from "../../../services/admin.service";
import NavBar from "../../common/NavBar";

function DepartmentslistContainer() {
  const [deptList, setDeptList] = useState();

  useEffect(() => {
    let adminData = JSON.parse(sessionStorage.getItem("adminData"));

    if (adminData && adminData.adminId) {
      AdminService.getMDOByAdmin(adminData.adminId).then((response) => {
        if (response && response.status === 200) {
          if (response.data.data) {
            setDeptList(response.data.data);
          }
        }
      });
    }
  }, []);

  return (
    <>
      <NavBar
        isLogOut={true}
        routerValue="LOGIN"
        isShowHeader={true}
        headerValue="WAT Sourcing Admin portal"
      />
      <div className="custom-container-1">
        <div className="container ">
          <div className="row row-cols-1">
            <div className="col-12 p-0 m-0">
              <Departmentlistview deptList={deptList} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DepartmentslistContainer;
