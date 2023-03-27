import React, { useEffect, useState } from "react";

const AdminView = ({
  mappedAdmins,
  createAdmin,
  deleteAdmin,
  unMapAdmin,
  allAdmins,
}) => {
  const [showEmpty, setShowEmpty] = useState(false);
  const [enableCreate, setEnableCreate] = useState(false);
  const [mapAdmin, setMapAdmin] = useState(false);
  const [adminFeed, setAdminFeed] = useState([
    {
      id: 0,
      userName: "",
      userPassword: "",
      userConfirmPassword: "",
    },
  ]);

  const onChangeAdmin = (e) => {
    e.preventDefault();

    let tempArray = JSON.parse(localStorage.getItem("adminFeed"));

    switch (e.target.name) {
      case "UserName":
        let existingAdmin = allAdmins.find(
          (element) => e.target.value === element.user_email
        );
        if (existingAdmin) {
          setMapAdmin(true);
        } else {
          setMapAdmin(false);
        }
        tempArray[0].userName = e.target.value;
        break;
      case "UserPassword":
        tempArray[0].userPassword = e.target.value;
        break;
      case "UserConfirmPassword":
        tempArray[0].userConfirmPassword = e.target.value;
        break;
      default:
        break;
    }

    if (
      tempArray[0].userPassword &&
      tempArray[0].userConfirmPassword &&
      tempArray[0].userPassword === tempArray[0].userConfirmPassword
    ) {
      setEnableCreate(true);
    } else {
      setEnableCreate(false);
    }

    setAdminFeed(tempArray);

    localStorage.setItem("adminFeed", JSON.stringify(tempArray));
  };

  useEffect(() => {
    localStorage.setItem("adminFeed", JSON.stringify(adminFeed));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mappedAdmins && (mappedAdmins.data || mappedAdmins[0])) {
      setShowEmpty(false);
    } else {
      setShowEmpty(true);
    }
  }, [mappedAdmins]);

  return (
    <div className="container-fluid mt-5 mb-5">
      {!showEmpty && (
        <div className="col-12">
          <div className="float-start col-sm-12 col-md-8 col-lg-9 col-xl-10 col-xxl-10">
            {mappedAdmins && mappedAdmins.data && (
              <h1 className="heading-3">
                {mappedAdmins && mappedAdmins.data.mdo}
              </h1>
            )}
            {mappedAdmins && !mappedAdmins.data && (
              <h1 className="heading-3">
                {mappedAdmins && mappedAdmins[0] && mappedAdmins[0].mdo}
              </h1>
            )}
          </div>
          <div className="float-end">
            <button
              className="custom-nav-btn-2"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#newAdminModal"
            >
              Add Admin
            </button>
            {/* Modal */}
            <div
              className="custom-modal-1 modal fade"
              id="newAdminModal"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="newAdminModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header p-4">
                    <h5 className="modal-title" id="newAdminModalLabel">
                      {mapAdmin ? "Map admin" : "New Admin"}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>

                  <form
                    autoComplete="off"
                    onSubmit={(e) => {
                      if (mappedAdmins && mappedAdmins.data) {
                        createAdmin(e, mappedAdmins.data.mdoId);
                      } else {
                        createAdmin(e, mappedAdmins && mappedAdmins[0].mdoId);
                      }

                      let resetAdminFeed = [
                        {
                          id: 0,
                          userName: "",
                          userPassword: "",
                          userConfirmPassword: "",
                        },
                      ];

                      setAdminFeed(resetAdminFeed);
                      localStorage.setItem(
                        "adminFeed",
                        JSON.stringify(resetAdminFeed)
                      );
                      setEnableCreate(false);
                      setMapAdmin(false);
                    }}
                  >
                    <div className="modal-body p-4">
                      <div className="mb-3">
                        <label className="label-2 pt-2">Email ID</label>
                        <input
                          type="text"
                          className="form-control custom-input-field-1 w-50"
                          name={`UserName`}
                          placeholder="Enter Email ID"
                          id="userName"
                          value={adminFeed[0].userName}
                          onChange={(e) => onChangeAdmin(e)}
                          autoComplete="new-password"
                          required
                        />
                      </div>
                      {!mapAdmin && (
                        <>
                          <div className="mb-3">
                            <label className="label-2 pt-2">Password</label>
                            <input
                              type="password"
                              className="form-control custom-input-field-1 w-50"
                              name={`UserPassword`}
                              placeholder="Enter password"
                              id="userPassword"
                              value={adminFeed[0].userPassword}
                              onChange={(e) => onChangeAdmin(e)}
                              autoComplete="new-password"
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label className="label-2 pt-2">
                              Confirm password
                            </label>
                            <input
                              type="password"
                              className="form-control custom-input-field-1 w-50"
                              name={`UserConfirmPassword`}
                              placeholder="Enter password again"
                              id="userConfirmPassword"
                              value={adminFeed[0].userConfirmPassword}
                              onChange={(e) => onChangeAdmin(e)}
                              autoComplete="new-password"
                              required
                            />
                          </div>
                        </>
                      )}
                    </div>
                    <div className="modal-footer p-4">
                      <button
                        type="button"
                        className="custom-nav-btn-1"
                        data-bs-dismiss="modal"
                        onClick={() => {
                          let resetAdminFeed = {
                            id: 0,
                            userName: "",
                            userPassword: "",
                            userConfirmPassword: "",
                          };

                          setAdminFeed([resetAdminFeed]);
                          localStorage.setItem(
                            "adminFeed",
                            JSON.stringify(resetAdminFeed)
                          );
                          setEnableCreate(false);
                          setMapAdmin(false);
                        }}
                      >
                        Cancel
                      </button>

                      {mapAdmin && (
                        <button type="submit" className="custom-nav-btn-2">
                          Map
                        </button>
                      )}

                      {enableCreate && !mapAdmin && (
                        <button type="submit" className="custom-nav-btn-2">
                          Create
                        </button>
                      )}

                      {!enableCreate && !mapAdmin && (
                        <button
                          className="custom-nav-btn-2"
                          style={{ opacity: "0.5" }}
                          type="button"
                          disabled
                        >
                          Create
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="custom-padding-1">
            <table
              className="table table-responsive table-hover"
              id="adminAccessList"
            >
              <thead>
                <tr className="custom-table-header-2 custom-table-border-1">
                  <th scope="col" className="ps-4">
                    Admin Email
                  </th>
                  <th scope="col" className="text-end pe-4"></th>
                </tr>
              </thead>
              <tbody>
                {mappedAdmins &&
                  mappedAdmins[0] &&
                  mappedAdmins.map((i, j) => {
                    return (
                      <tr className="custom-table-row-2" key={i.id}>
                        <td className="ps-4 pt-4 pb-4">{i.user_email}</td>
                        <td className="text-end pe-4 custom-table-label-1 pt-4 pb-4">
                          <span
                            className="material-icons custom-action-button-1"
                            id={`dropdownBtn${i.id}`}
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            more_vert
                          </span>
                          <ul
                            className="dropdown-menu custom-dd-1"
                            aria-labelledby={`dropdownBtn${i.id}`}
                          >
                            <li>
                              <label
                                className="dropdown-item"
                                onClick={(e) =>
                                  unMapAdmin(e, i.mappingId, i.mdoId)
                                }
                              >
                                <span className="material-icons pe-1 custom-mat-icon-2">
                                  link_off
                                </span>
                                Unmap
                              </label>
                            </li>
                            <li>
                              <label
                                className="dropdown-item mt-2"
                                onClick={(e) =>
                                  deleteAdmin(e, i.mappingId, i.id, i.mdoId)
                                }
                              >
                                <span className="material-icons pe-1 custom-mat-icon-2">
                                  delete
                                </span>
                                Delete
                              </label>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    );
                  })}

                {mappedAdmins && mappedAdmins.length === 0 && (
                  <tr className="custom-table-row-2">
                    <td className="ps-4">No admin mappings found!</td>
                    <td className="text-end pe-4 custom-table-label-1"></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showEmpty && (
        <div className="col-12">
          <center>Select an MDO</center>
        </div>
      )}
    </div>
  );
};

export default AdminView;
