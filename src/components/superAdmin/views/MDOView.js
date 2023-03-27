import React, { useEffect, useState } from "react";

/**
 * MDOView
 * @returns UI components and its
 * functions for MDO related activities
 */

const MDOView = ({
  createDepartment,
  allDepts,
  deleteMDO,
  getMappedAdmins,
  updateDepartment,
}) => {
  const [enableUpdate, setEnableUpdate] = useState(false);
  const [departmentFeed, setDepartmentFeed] = useState([
    {
      id: 0,
      mdo: "",
    },
  ]);

  useEffect(() => {
    localStorage.setItem("departmentFeed", JSON.stringify(departmentFeed));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handles MDO name change event
  const onChangeDepartment = (e) => {
    e.preventDefault();

    let tempArray = JSON.parse(localStorage.getItem("departmentFeed"));

    if (e.target.name === "MDOName") {
      tempArray[0].mdo = e.target.value;
    }

    setDepartmentFeed(tempArray);

    localStorage.setItem("departmentFeed", JSON.stringify(tempArray));
  };

  // Handles MDO name update event
  const onUpdateDepartment = (e, id) => {
    e.preventDefault();

    let reqDept = allDepts.find((element) => id === element.id);

    let tempDeptFeed = [
      {
        id: reqDept.id,
        mdo: reqDept.name,
        olderMdo: reqDept.name,
      },
    ];

    setDepartmentFeed(tempDeptFeed);

    localStorage.setItem("departmentFeed", JSON.stringify(tempDeptFeed));
  };

  return (
    <div className="container-fluid">
      <div className="col-12">
        {/* Heading */}
        <div className="float-start">
          <h1 className="heading-3">MDO Access</h1>
        </div>
        {/* Action button */}
        <div className="float-end">
          <button
            className="custom-nav-btn-2"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#newMDOModal"
            onClick={(e) => {
              e.preventDefault();
              let tempDeptFeed = [
                {
                  id: 0,
                  mdo: "",
                  olderMdo: "",
                },
              ];

              setDepartmentFeed(tempDeptFeed);

              localStorage.setItem(
                "departmentFeed",
                JSON.stringify(tempDeptFeed)
              );
            }}
          >
            New MDO
          </button>
          {/* Modal */}
          <div
            className="custom-modal-1 modal fade"
            id="newMDOModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="newMDOModalLabel"
            aria-hidden="true"
          >
            {/* Dialog container */}
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header p-4">
                  <h5 className="modal-title" id="newMDOModalLabel">
                    {!enableUpdate ? "New MDO" : "Update MDO"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <form
                  onSubmit={(e) => {
                    if (!enableUpdate) {
                      createDepartment(e, departmentFeed);
                    } else {
                      updateDepartment(e, departmentFeed);
                    }

                    setDepartmentFeed([
                      {
                        id: 0,
                        mdo: "",
                        olderMdo: "",
                      },
                    ]);
                    setEnableUpdate(false);
                  }}
                >
                  {/* Modal body */}
                  <div className="modal-body p-4">
                    <div className="mb-3">
                      <label className="label-2 pt-2">MDO</label>
                      <input
                        type="text"
                        className="form-control custom-input-field-1 w-50"
                        name={`MDOName`}
                        placeholder="Enter MDO"
                        autoComplete="off"
                        id="mdoName"
                        value={departmentFeed[0].mdo}
                        onChange={(e) => onChangeDepartment(e)}
                        required
                      />
                    </div>
                  </div>

                  {/* Modal footer */}
                  <div className="modal-footer p-4">
                    <button
                      type="button"
                      className="custom-nav-btn-1"
                      data-bs-dismiss="modal"
                      onClick={(e) => {
                        e.preventDefault();
                        setEnableUpdate(false);
                      }}
                    >
                      Cancel
                    </button>

                    {!enableUpdate ? (
                      <button type="submit" className="custom-nav-btn-2">
                        Create
                      </button>
                    ) : (
                      <button type="submit" className="custom-nav-btn-2">
                        Update
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MDO list */}
      <div className="custom-padding-1">
        <table
          className="table table-responsive table-hover"
          id="mdoAccessList"
        >
          <thead>
            <tr className="custom-table-header-1 custom-table-border-1">
              <th scope="col" className="ps-4">
                MDO Name
              </th>
              <th scope="col" className="text-end pe-4">
                Number of admins
              </th>
            </tr>
          </thead>
          <tbody>
            {allDepts &&
              allDepts.map((i, j) => {
                return (
                  <tr
                    className="custom-table-row-1"
                    key={i.id}
                    onClick={(e) => getMappedAdmins(e, i.id)}
                  >
                    <td className="ps-4 pt-4 pb-4">{i.name}</td>
                    <td className="text-end pe-4 custom-table-label-1 pt-4 pb-4">
                      {i.adminCount && i.adminCount === 1
                        ? "1 admin"
                        : i.adminCount + " admins"}
                      <span
                        className="material-icons custom-action-button-1 ps-2"
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
                            data-bs-toggle="modal"
                            data-bs-target="#newMDOModal"
                            onClick={(e) => {
                              setEnableUpdate(true);
                              onUpdateDepartment(e, i.id);
                            }}
                          >
                            <span className="material-icons pe-1 custom-mat-icon-2">
                              edit
                            </span>
                            Update
                          </label>
                        </li>
                        <li>
                          <label className="dropdown-item mt-2">
                            <span
                              className="material-icons pe-1 custom-mat-icon-2"
                              onClick={(e) => {
                                deleteMDO(e, i.id);
                              }}
                            >
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MDOView;
