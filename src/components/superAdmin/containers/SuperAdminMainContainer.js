import React, { useState, useEffect } from "react";
import { SuperAdminService } from "../../../services/superAdmin.service";
import { UpdateService } from "../../../services/update.service";
import NavBar from "../../common/NavBar";
import AdminView from "../views/AdminView";
import MDOView from "../views/MDOView";
import bootstrap from "bootstrap/dist/js/bootstrap.js";

/**
 * SuperAdminMainContainer
 * @returns Required components for handling
 * MDO and its admins mapping
 */

const SuperAdminMainContainer = () => {
  const [allAdmins, setAllAdmins] = useState();
  const [allDepts, setAllDepts] = useState();
  const [mappedAdmins, setMappedAdmins] = useState();
  const [editMDO, setEditMDO] = useState();

  // Create an MDO
  const createDepartment = (e) => {
    e.preventDefault();

    let tempArray = JSON.parse(localStorage.getItem("departmentFeed"));
    let superAdminId = JSON.parse(
      sessionStorage.getItem("adminData")
    ).superAdminId;

    let data = { data: [] };

    tempArray.map((i, j) => {
      data.data.push({
        departmentName: i.mdo,
        superAdminId: superAdminId,
      });
      return null;
    });

    SuperAdminService.createDepartments(data).then((response) => {
      if (response && response.status === 200) {
        setTimeout(() => {
          getAllDepartments();
        }, 100);

        closeAllModals("newMDOModal");
      }
    });
  };

  // Close modals by its id
  const closeAllModals = (id) => {
    var mdoModal = document.getElementById(`${id}`);
    let modal = bootstrap.Modal.getInstance(mdoModal);
    modal.hide();
  };

  // Create an admin
  const createAdmin = (e, id) => {
    e.preventDefault();

    let tempArray = JSON.parse(localStorage.getItem("adminFeed"));
    let superAdminId = JSON.parse(
      sessionStorage.getItem("adminData")
    ).superAdminId;

    let data = { data: [] };

    tempArray.map((i, j) => {
      data.data.push({
        userEmail: i.userName,
        userPassword: i.userPassword,
        userRole: "admin",
        mdoId: parseInt(id),
        superAdminId: superAdminId,
      });
      return null;
    });

    SuperAdminService.createAdmin(data).then((response) => {
      if (response && response.status === 200) {
        setTimeout(() => {
          getAllDepartments();
        }, 200);
        getMappedAdmins(e, id);
        closeAllModals("newAdminModal");
      }
    });
  };

  // Delete an admin
  const deleteAdmin = (e, mappingId, adminId, mdoId) => {
    e.preventDefault();

    let payload = [
      {
        table: "admin_departments",
        field: "id",
        item: mappingId,
      },
      {
        table: "wat_admin",
        field: "id",
        item: adminId,
      },
    ];

    UpdateService.deleteAnRecord(payload[0]).then((response) => {
      if (response && response.status === 200) {
        UpdateService.deleteAnRecord(payload[1]).then((response) => {
          if (response && response.status === 200) {
            setTimeout(() => {
              getAllDepartments();
            }, 200);
            getMappedAdmins(e, mdoId);
          }
        });
      }
    });
  };

  // Unmap admin from an MDO
  const unMapAdmin = (e, mappingId, mdoId) => {
    let unmapPayload = {
      table: "admin_departments",
      field: "id",
      item: mappingId,
    };

    UpdateService.deleteAnRecord(unmapPayload).then((response) => {
      if (response && response.status === 200) {
        setTimeout(() => {
          getAllDepartments();
        }, 200);
        getMappedAdmins(e, mdoId);
      }
    });
  };

  // Delete an MDO
  const deleteMDO = (e, id) => {
    e.preventDefault();

    SuperAdminService.deleteDepartmentById(id).then((response) => {
      if (response && response.status === 200) {
        getAllDepartments();
        getMappedAdmins(e, id);
      }
    });
  };

  // Get all MDO's
  const getAllDepartments = () => {
    SuperAdminService.getDepartmentList().then((response) => {
      if (response && response.status === 200) {
        if (response.data && response.data.data) {
          setAllDepts(response.data.data);
        }
      }
    });
  };

  // Get MDO details by its id
  const getMDODetails = (e, id) => {
    SuperAdminService.getMDODetailsById(id).then((response) => {
      if (response && response.status === 200) {
        if (response.data && response.data.data) {
          setEditMDO(response.data.data);
        }
      }
    });
  };

  // Get all mapped admins for an MDO
  const getMappedAdmins = (e, id) => {
    e.preventDefault();
    SuperAdminService.getAllAdmins().then((response) => {
      if (response && response.status === 200) {
        if (response.data && response.data.data) {
          setAllAdmins(response.data.data);
          SuperAdminService.getAllMappedAdmins(id).then((response) => {
            if (response && response.status === 200) {
              setMappedAdmins(response.data.data);
            }
          });
        }
      }
    });
  };

  // Update MDO details
  const updateDepartment = (e, id) => {
    e.preventDefault();

    let tempArray = JSON.parse(localStorage.getItem("departmentFeed"));
    let superAdminId = JSON.parse(
      sessionStorage.getItem("adminData")
    ).superAdminId;

    let data = { data: [] };

    tempArray.map((i, j) => {
      data.data.push({
        olderMdo: i.olderMdo,
        departmentName: i.mdo,
        superAdminId: superAdminId,
      });
      return null;
    });

    SuperAdminService.updateMDOById(tempArray[0].id, data).then((response) => {
      if (response && response.status === 200) {
        setTimeout(() => {
          getAllDepartments();
        }, 200);
        closeAllModals("newMDOModal");
      }
    });
  };

  useEffect(() => {
    SuperAdminService.getAllAdmins().then((response) => {
      if (response && response.status === 200) {
        if (response.data && response.data.data) {
          setAllAdmins(response.data.data);
        }
      }
    });

    getAllDepartments();
  }, []);

  return (
    <>
      <NavBar
        isLogOut={true}
        routerValue="SUPER_ADMIN_LOGIN"
        isShowHeader={true}
        headerValue="WAT Sourcing SuperAdmin portal"
      />
      <div className="row">
        {/* Left side */}
        <div className="container-fluid custom-container-1 pt-3 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 pt-4 px-sm-0 px-md-0 px-lg-5 px-xxl-5">
          <MDOView
            createDepartment={createDepartment}
            allAdmins={allAdmins}
            allDepts={allDepts}
            deleteMDO={deleteMDO}
            getMappedAdmins={getMappedAdmins}
            mappedAdmins={mappedAdmins}
            getMDODetails={getMDODetails}
            editMDO={editMDO}
            updateDepartment={updateDepartment}
          />
        </div>

        {/* Right side */}
        <div className="container-fluid custom-container-2 pt-3 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 px-sm-0 px-md-0 px-lg-5 px-xxl-5">
          <AdminView
            mappedAdmins={mappedAdmins}
            createAdmin={createAdmin}
            deleteAdmin={deleteAdmin}
            unMapAdmin={unMapAdmin}
            allAdmins={allAdmins}
          />
        </div>
      </div>
    </>
  );
};

export default SuperAdminMainContainer;
