import React, { useEffect, useState } from "react";
import { TextField } from "../../fields/index";
/**
 *
 * Survey view component
 * returns survey ui components
 * as per the json structure
 */

const SurveyView = ({ structureData, submitData }) => {
  const [structData, setStructData] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [roleArray, setRoleArray] = useState([]);
  const [activityArray, setActivityArray] = useState([]);
  const [competencyArray, setCompetencyArray] = useState([]);
  const [pageOneData, setPageOneData] = useState({});
  const [pageTwoData, setPageTwoData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [pageThreeData, setPageThreeData] = useState([]);

  let dataTwo = [];
  let dataThree = [];

  useEffect(() => {
    if (structureData !== undefined) {
      let firstActivity = {
        id: 0,
        parent: 0,
        label: "",
      };
      let firstCompetency = {
        id: 0,
        parent: 0,
        label: "",
      };
      let firstRole = {
        id: 0,
        label: "",
        description: "",
        activities: [],
        competencies: [],
      };
      firstRole.activities.push(firstActivity);
      firstRole.competencies.push(firstCompetency);

      setStructData(structureData);
      setCurrentPage(1);
      setActivityArray((state) => [firstActivity, ...state]);
      setCompetencyArray((state) => [firstCompetency, ...state]);
      setRoleArray((state) => [firstRole, ...state]);
      let dataOne = {
        "Name (in full)": "",
        "Designation (in full)": "",
        "Work email": "",
        "Name of your reporting officer (in full)": "",
        "Designation of your reporting officer (in full)": "",
        "Your department": "",
      };
      setPageOneData(dataOne);
    }
  }, [structureData]);

  const updatePageOneData = (e) => {
    e.preventDefault();
    let tempObj = pageOneData;

    switch (e.target.name) {
      case "Name (in full)":
        Object.assign(tempObj, { "Name (in full)": e.target.value });
        break;
      case "Designation (in full)":
        Object.assign(tempObj, { "Designation (in full)": e.target.value });
        break;
      case "Work email":
        Object.assign(tempObj, { "Work email": e.target.value });
        break;
      case "Name of your reporting officer (in full)":
        Object.assign(tempObj, {
          "Name of your reporting officer (in full)": e.target.value,
        });
        break;
      case "Designation of your reporting officer (in full)":
        Object.assign(tempObj, {
          "Designation of your reporting officer (in full)": e.target.value,
        });
        break;
      case "Your department":
        Object.assign(tempObj, { "Your department": e.target.value });
        break;
      default:
        return null;
    }
    localStorage.setItem("pageOneData", JSON.stringify(tempObj));
    setPageOneData(tempObj);
  };

  const updateNextPage = (e) => {
    e.preventDefault();

    let totalPages = structData.pages.length;
    let stayingPage = currentPage;

    if (stayingPage < totalPages) {
      stayingPage++;
    }
    setCurrentPage(stayingPage);

    // dataOne = Array.from(new Set(dataOne.map(JSON.stringify))).map(JSON.parse);

    dataTwo = Array.from(new Set(dataTwo.map(JSON.stringify))).map(JSON.parse);

    dataThree = Array.from(new Set(dataThree.map(JSON.stringify))).map(
      JSON.parse
    );

    if (roleArray !== null && roleArray.length) {
      localStorage.setItem("roleArray", JSON.stringify(roleArray));
    }

    if (activityArray !== null && activityArray.length) {
      localStorage.setItem("activityArray", JSON.stringify(activityArray));
    }

    if (competencyArray !== null && competencyArray.length) {
      localStorage.setItem("competencyArray", JSON.stringify(competencyArray));
    }

    if (dataTwo) {
      var tempArray2 = dataTwo.reduce(function (result, currentObject) {
        for (var key in currentObject) {
          if (currentObject.hasOwnProperty(key)) {
            result[key] = currentObject[key];
          }
        }
        return result;
      }, {});

      let tempArray3;
      let tempArray4 = [];

      let manipulatedObject = {};

      tempArray3 = Object.keys(tempArray2).map((key) => tempArray2[key]);

      tempArray3.map((i, j) => {
        return tempArray4.push(i[0]);
      });

      for (var key in tempArray4) {
        var parent = tempArray4[key].parent;

        if (!manipulatedObject[parent]) {
          manipulatedObject[parent] = [];
        }
        manipulatedObject[parent].push(tempArray4[key]);
      }

      if (Object.keys(manipulatedObject) !== 0) {
        setPageTwoData(
          Object.keys(manipulatedObject).map((k) => manipulatedObject[k])
        );
      }
    }

    if (dataThree) {
      var tempArray12 = dataThree.reduce(function (result, currentObject) {
        for (var key in currentObject) {
          if (currentObject.hasOwnProperty(key)) {
            result[key] = currentObject[key];
          }
        }
        return result;
      }, {});

      let tempArray13;
      let tempArray14 = [];

      let manipulatedObjectD3 = {};

      tempArray13 = Object.keys(tempArray12).map((key) => tempArray12[key]);

      tempArray13.map((i, j) => {
        return tempArray14.push(i[0]);
      });

      for (var keyD3 in tempArray14) {
        var parentD3 = tempArray14[keyD3].parent;

        if (!manipulatedObjectD3[parentD3]) {
          manipulatedObjectD3[parentD3] = [];
        }
        manipulatedObjectD3[parentD3].push(tempArray14[keyD3]);
      }

      if (Object.keys(manipulatedObjectD3) !== 0) {
        setPageThreeData(
          Object.keys(manipulatedObjectD3).map((k) => manipulatedObjectD3[k])
        );
      }
    }
  };

  const updatePreviousPage = (e) => {
    e.preventDefault();

    let totalPages = structData.pages.length;
    let stayingPage = currentPage;

    if (stayingPage <= totalPages) {
      stayingPage--;
    }
    setCurrentPage(stayingPage);
  };

  const insertRole = (e) => {
    e.preventDefault();

    let roleId = roleArray.length;
    let activityId = activityArray.length;
    let comepetencyId = competencyArray.length;

    roleId++;

    let activitiesData = {
      id: activityId++,
      parent: roleId,
      label: "",
    };

    let competenciesData = {
      id: comepetencyId++,
      parent: roleId,
      label: "",
    };

    let roles = {
      id: roleId,
      label: "",
      description: "",
      activities: [activitiesData],
      competencies: [competenciesData],
    };

    setActivityArray((state) => [...state, activitiesData]);
    setCompetencyArray((state) => [...state, competenciesData]);
    setRoleArray((state) => [...state, roles]);
  };

  const deleteRole = (e, id) => {
    e.preventDefault();

    let updatedArray = [];

    updatedArray.push(roleArray.filter((item) => item.id !== id));

    updatedArray.map((i, j) => {
      setRoleArray(i);
      return null;
    });
  };

  const insertActivity = (e, parent) => {
    e.preventDefault();

    let activityId = activityArray.length;

    let activities = {
      id: activityId++,
      parent: parent,
      label: "",
    };

    roleArray.map((i, j) => {
      if (i.id === activities.parent) {
        i.activities.push(activities);
      }
      return null;
    });

    setActivityArray((state) => [...state, activities]);
  };

  const deleteActivity = (e, id, parentId) => {
    e.preventDefault();

    let updatedArray = [];

    updatedArray.push(activityArray.filter((item) => item.id !== id));

    updatedArray.map((i, j) => {
      setActivityArray(i);
      return null;
    });

    roleArray.map((m, n) => {
      m.activities.map((k, l) => {
        if (k.id === id) {
          const index = m.activities.indexOf(k);
          if (index > -1) {
            m.activities.splice(index, 1);
          }
        }
        return null;
      });
      return null;
    });
  };

  const insertCompetency = (e, parent) => {
    e.preventDefault();

    let competencyId = competencyArray.length;

    let competencies = {
      id: competencyId++,
      parent: parent,
      label: "",
    };

    roleArray.map((i, j) => {
      if (i.id === competencies.parent) {
        i.competencies.push(competencies);
      }
      return null;
    });

    setCompetencyArray((state) => [...state, competencies]);
  };

  const deleteCompetency = (e, id, parentId) => {
    e.preventDefault();

    let updatedArray = [];

    updatedArray.push(competencyArray.filter((item) => item.id !== id));

    updatedArray.map((i, j) => {
      setCompetencyArray(i);
      return null;
    });

    roleArray.map((m, n) => {
      m.competencies.map((k, l) => {
        if (k.id === id) {
          const index = m.competencies.indexOf(k);
          if (index > -1) {
            m.competencies.splice(index, 1);
          }
        }
        return null;
      });
      return null;
    });
  };

  useEffect(() => {
    if (currentPage === 2 && localStorage.getItem("pageTwoData")) {
      setPageOneData(JSON.parse(localStorage.getItem("pageOneData")));
    } else if (currentPage === 1 && localStorage.getItem("pageOneData")) {
      setPageOneData(JSON.parse(localStorage.getItem("pageOneData")));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    if (roleArray !== null && roleArray.length) {
      localStorage.setItem("roleArray", JSON.stringify(roleArray));
    }
  }, [roleArray]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (activityArray !== null && activityArray.length) {
      localStorage.setItem("activityArray", JSON.stringify(activityArray));
    }
  }, [activityArray]);

  useEffect(() => {
    if (competencyArray !== null && competencyArray.length) {
      localStorage.setItem("competencyArray", JSON.stringify(competencyArray));
    }
  }, [competencyArray]);

  useEffect(() => {
    let pageTwo = document.getElementById("page-2");
    let pageThree = document.getElementById("page-3");

    if (pageTwo) {
      let pageTwoFields = document.getElementsByTagName("input");
      let pageTwoTextArea = document.getElementsByTagName("textarea");

      roleArray.map((m, n) => {
        for (let i = 0; i < pageTwoFields.length; i++) {
          pageTwoFields[i].addEventListener("keyup", () => {
            if (
              (pageTwoFields[i].parentElement.parentElement.parentElement
                .parentElement.id ||
                pageTwoFields[i].parentElement.parentElement.id) ===
                `role-row-${n}` &&
              pageTwoFields[i].value !== ""
            ) {
              if (pageTwoFields[i].id.includes("RID")) {
                m.label = pageTwoFields[i].value;
              }

              if (pageTwoFields[i].id.includes("AID")) {
                activityArray.map((q, w) => {
                  if (parseInt(pageTwoFields[i].id.split("AID")[1]) === q.id) {
                    q.label = pageTwoFields[i].value;
                  }
                  return null;
                });
              }
            }
          });
        }
        for (let i = 0; i < pageTwoTextArea.length; i++) {
          pageTwoTextArea[i].addEventListener("keyup", () => {
            if (
              (pageTwoTextArea[i].parentElement.parentElement.parentElement
                .parentElement.id ||
                pageTwoTextArea[i].parentElement.parentElement.id) ===
                `role-row-${n}` &&
              pageTwoTextArea[i].value !== ""
            ) {
              if (pageTwoTextArea[i].id.includes("DESC")) {
                m.description = pageTwoTextArea[i].value;
              }
            }
          });
        }
        return null;
      });
    }

    if (pageThree) {
      let pageThreeFields = document.getElementsByTagName("input");

      roleArray.map((m, n) => {
        for (let i = 0; i < pageThreeFields.length; i++) {
          pageThreeFields[i].addEventListener("keyup", () => {
            if (
              pageThreeFields[i].parentElement.parentElement.id ===
                `role-row-${n}` &&
              pageThreeFields[i].value !== ""
            ) {
              if (pageThreeFields[i].id.includes("CID")) {
                competencyArray.map((q, w) => {
                  if (
                    parseInt(pageThreeFields[i].id.split("CID")[1]) === q.id
                  ) {
                    q.label = pageThreeFields[i].value;
                  }
                  return null;
                });
              }
            }
          });
        }
        return null;
      });
    }
  });

  useEffect(() => {
    localStorage.setItem("pageOneData", JSON.stringify(pageOneData));
  }, [pageOneData]);

  useEffect(() => {
    if (Object.keys(pageTwoData).length !== 0) {
      localStorage.setItem("pageTwoData", JSON.stringify(pageTwoData));
    }
  }, [pageTwoData]);

  useEffect(() => {
    if (Object.keys(pageThreeData).length !== 0) {
      localStorage.setItem("pageThreeData", JSON.stringify(pageThreeData));
    }
  }, [pageThreeData]);

  return (
    <div className="container">
      <div className="col-12">
        {/* Form section */}
        <div className="pt-2" id={`page-${currentPage}`}>
          {currentPage &&
            structData &&
            structData.pages[currentPage - 1][0].section.map((i, j) => {
              return (
                <div key={j} className="mb-4">
                  {/* Page 1 */}
                  {currentPage === 1 && j === 0 && (
                    <div>
                      {/* Heading section */}
                      <div className="pt-1 pb-3">
                        <center>
                          {structData && structData.surveyName && (
                            <h1 className="heading-2">
                              {structData.surveyName}
                            </h1>
                          )}
                        </center>
                      </div>

                      {/* Message section */}
                      <div className="pt-2 pb-2">
                        {structData &&
                          structData.message &&
                          currentPage === 1 && (
                            <p className="body-1">{structData.message}</p>
                          )}
                      </div>
                      <React.Fragment>
                        <h2 className="heading-2">{i.heading}</h2>
                        <div className="pb-2 pt-2 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                          <label className="body-2 pt-1">Name (in full)</label>
                          <input
                            type="text"
                            className="form-control custom-input-field-1"
                            name="Name (in full)"
                            onChange={updatePageOneData}
                            defaultValue={pageOneData["Name (in full)"]}
                            placeholder="Name (in full)"
                            autoComplete="off"
                          />
                          <label className="body-2 pt-3">
                            Position (Designation)
                          </label>
                          <input
                            type="text"
                            className="form-control custom-input-field-1"
                            name="Designation (in full)"
                            onChange={updatePageOneData}
                            defaultValue={pageOneData["Designation (in full)"]}
                            placeholder="Position (in full)"
                            autoComplete="off"
                          />
                          <label className="body-2 pt-3">Work email</label>
                          <input
                            type="text"
                            className="form-control custom-input-field-1"
                            name="Work email"
                            onChange={updatePageOneData}
                            defaultValue={pageOneData["Work email"]}
                            placeholder="Work email"
                            autoComplete="off"
                          />
                        </div>
                        <h2 className="heading-2 mt-3">
                          Reporting officer & department
                        </h2>

                        <div className="pb-2 pt-2 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                          <label className="body-2 pt-1">
                            Name of your reporting officer (in full)
                          </label>
                          <input
                            type="text"
                            className="form-control custom-input-field-1"
                            name="Name of your reporting officer (in full)"
                            onChange={updatePageOneData}
                            defaultValue={
                              pageOneData[
                                "Name of your reporting officer (in full)"
                              ]
                            }
                            placeholder="Firstname, Lastname"
                            autoComplete="off"
                          />
                          <label className="body-2 pt-3">
                            Position (Designation) of your reporting officer
                          </label>
                          <input
                            type="text"
                            className="form-control custom-input-field-1"
                            name="Designation of your reporting officer (in full)"
                            onChange={updatePageOneData}
                            defaultValue={
                              pageOneData[
                                "Designation of your reporting officer (in full)"
                              ]
                            }
                            placeholder="Position (in full)"
                            autoComplete="off"
                          />
                          <label className="body-2 pt-3">Your department</label>
                          <input
                            type="text"
                            className="form-control custom-input-field-1"
                            name="Your department"
                            onChange={updatePageOneData}
                            defaultValue={pageOneData["Your department"]}
                            placeholder="Department"
                            autoComplete="off"
                          />
                        </div>
                      </React.Fragment>
                    </div>
                  )}

                  {/* Page 2 */}
                  {currentPage === 2 && (
                    <React.Fragment>
                      <h2 className="heading-2 mt-3">Roles & Activities</h2>
                      <h2 className="body-2">
                        List down the 'roles' that you play as part of your
                        current post and activities that are associated with
                        each role. For adding more roles create a new row
                      </h2>
                      <div className="mb-5 pt-3">
                        {roleArray &&
                          roleArray.map((o, p) => {
                            return (
                              <div id={`role-row-${p}`} key={p}>
                                <div className="row pt-2 pb-2" key={p}>
                                  <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                    <label className="body-2">Role</label>
                                    <div className="input-box-1">
                                      <input
                                        type="text"
                                        className="form-control custom-input-field-2 mt-2"
                                        id={"RID" + o.id}
                                        defaultValue={o.label}
                                        placeholder="Role label"
                                        autoComplete="off"
                                      ></input>
                                      <textarea
                                        style={{ width: "100%" }}
                                        className="form-control custom-input-field-2 mt-2"
                                        id={"DESC" + o.id}
                                        defaultValue={o.description}
                                        placeholder="Role description"
                                        autoComplete="off"
                                      ></textarea>
                                    </div>
                                  </div>
                                  <div
                                    className="col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8"
                                    key={p}
                                  >
                                    {o.activities.map((m, n) => {
                                      if (m.parent === o.id) {
                                        return (
                                          <div
                                            className="row mx-2 pt-1"
                                            id={`role-row-${p}`}
                                            key={n}
                                          >
                                            <label className="body-2">
                                              Activity
                                            </label>
                                            <div className="col-8">
                                              <TextField
                                                fieldId={"AID" + m.id}
                                                value={m.label}
                                                placeholder="Activities as part of this role"
                                              />
                                            </div>
                                            {n === 0 && (
                                              <div className="col-2 align-self-center">
                                                <div
                                                  className="material-icons add-icon-2 mt-0 "
                                                  onClick={(event) =>
                                                    insertActivity(event, o.id)
                                                  }
                                                  data-bs-toggle="tooltip"
                                                  data-bs-placement="top"
                                                  title="Add activity"
                                                >
                                                  add_box
                                                </div>
                                              </div>
                                            )}
                                            {n > 0 && (
                                              <div className="col-2">
                                                <div className="d-flex flex-row">
                                                  <div
                                                    className="material-icons add-icon-2"
                                                    onClick={(event) =>
                                                      insertActivity(
                                                        event,
                                                        o.id
                                                      )
                                                    }
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="top"
                                                    title="Add activity"
                                                  >
                                                    add_box
                                                  </div>
                                                  <div
                                                    className="material-icons remove-icon-2 mx-1"
                                                    onClick={(event) =>
                                                      deleteActivity(
                                                        event,
                                                        m.id,
                                                        m.parent
                                                      )
                                                    }
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="top"
                                                    title="Delete activity"
                                                  >
                                                    highlight_off
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                  {p > 0 && (
                                    <React.Fragment>
                                      <div className="col-12">
                                        <button
                                          type="button"
                                          className="custom-nav-btn-2 float-end mt-3 mb-3"
                                          onClick={(event) =>
                                            deleteRole(event, o.id)
                                          }
                                          key={p}
                                        >
                                          Delete this role
                                        </button>
                                      </div>

                                      <hr />
                                    </React.Fragment>
                                  )}
                                </div>
                                {p === 0 && <hr />}
                              </div>
                            );
                          })}
                        <button
                          className="custom-nav-btn-2 mb-3"
                          onClick={insertRole}
                        >
                          Add another role
                        </button>
                        <a
                          className="float-end link-style-1"
                          href={window.env.REACT_APP_FRAC_DICTIONARY_ACTIVITY}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Refer the dictionary for help
                        </a>
                      </div>
                    </React.Fragment>
                  )}

                  {/* Page 3 */}
                  {currentPage === 3 && (
                    <React.Fragment>
                      <h2 className="heading-2 mt-3">Roles & Competencies</h2>
                      <h2 className="body-2">
                        List down the 'competencies' that you think are
                        necessary to carry out each role
                      </h2>
                      <div className="mb-5 pt-3">
                        {roleArray &&
                          roleArray.map((o, p) => {
                            return (
                              <div id={`role-row-${p}`} key={p}>
                                <div className="row pt-2 pb-2" key={p}>
                                  <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                    <label className="body-2">Role</label>
                                    <div className="input-box-1">
                                      <input
                                        type="text"
                                        className="form-control custom-input-field-2 mt-2"
                                        id={"RID" + o.id}
                                        defaultValue={o.label}
                                        placeholder="Role label"
                                        readOnly
                                      ></input>
                                      <textarea
                                        style={{ width: "100%" }}
                                        className="form-control custom-input-field-2 mt-2"
                                        id={"DESC" + o.id}
                                        defaultValue={o.description}
                                        placeholder="Role description"
                                        readOnly
                                      ></textarea>
                                    </div>
                                  </div>
                                  <div
                                    className="col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8"
                                    key={p}
                                  >
                                    {o.competencies.map((m, n) => {
                                      if (m.parent === o.id) {
                                        return (
                                          <div
                                            className="row mx-2 pt-1"
                                            id={`role-row-${p}`}
                                            key={n}
                                          >
                                            <label className="body-2">
                                              Competency
                                            </label>
                                            <div className="col-8">
                                              <TextField
                                                fieldId={"CID" + m.id}
                                                value={m.label}
                                                placeholder="Competencies as part of this role"
                                              />
                                            </div>
                                            {n === 0 && (
                                              <div className="col-2 align-self-center">
                                                <div
                                                  className="material-icons add-icon-2 mt-0"
                                                  onClick={(event) =>
                                                    insertCompetency(
                                                      event,
                                                      o.competencies[0].parent
                                                    )
                                                  }
                                                  data-bs-toggle="tooltip"
                                                  data-bs-placement="top"
                                                  title="Add activity"
                                                >
                                                  add_box
                                                </div>
                                              </div>
                                            )}
                                            {n > 0 && (
                                              <div className="col-2">
                                                <div className="d-flex flex-row">
                                                  <div
                                                    className="material-icons add-icon-2"
                                                    onClick={(event) =>
                                                      insertCompetency(
                                                        event,
                                                        o.competencies[n - 1]
                                                          .parent
                                                      )
                                                    }
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="top"
                                                    title="Add activity"
                                                  >
                                                    add_box
                                                  </div>
                                                  <div
                                                    className="material-icons remove-icon-2 mx-1"
                                                    onClick={(event) =>
                                                      deleteCompetency(
                                                        event,
                                                        m.id,
                                                        m.parent
                                                      )
                                                    }
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="top"
                                                    title="Delete activity"
                                                  >
                                                    highlight_off
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        );
                                      }

                                      return null;
                                    })}
                                  </div>
                                </div>
                                <hr />
                              </div>
                            );
                          })}
                        <div style={{ minHeight: "3rem" }}>
                          <a
                            className="float-end link-style-1"
                            href={
                              window.env.REACT_APP_FRAC_DICTIONARY_COMPETENCY
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            Refer the dictionary for help
                          </a>
                        </div>
                      </div>
                    </React.Fragment>
                  )}
                </div>
              );
            })}
        </div>

        {/* Footer */}
        <div className="footer col-12">
          {/* Page info for smaller screens */}
          <div className="d-block d-sm-none">
            {structData && structData.pages && (
              <center>
                <p className="body-2">
                  Page {currentPage} of {structData.pages.length}
                </p>
              </center>
            )}
          </div>
          <div className="d-flex justify-content-around">
            <div className="pb-3">
              {currentPage && currentPage !== 1 && (
                <button
                  type="button"
                  className="custom-nav-btn-1"
                  onClick={updatePreviousPage}
                >
                  Previous
                </button>
              )}
              {currentPage && currentPage === 1 && (
                <div className="custom-min-width-1"></div>
              )}
            </div>
            <div className="pt-2 mt-1 d-none d-md-block d-lg-block d-xl-block d-xxl-block">
              {structData && structData.pages && (
                <p className="body-2">
                  Page {currentPage} of {structData.pages.length}
                </p>
              )}
            </div>
            <div className="pb-3">
              {currentPage && currentPage < structData.pages.length && (
                <center>
                  <button
                    type="button"
                    className="custom-nav-btn-2"
                    onClick={updateNextPage}
                  >
                    Next
                  </button>
                </center>
              )}
              {currentPage &&
                JSON.parse(localStorage.getItem("pageOneData")) &&
                roleArray[0].label !== "" &&
                currentPage === structData.pages.length && (
                  <center>
                    <button
                      type="button"
                      className="custom-nav-btn-2"
                      onClick={(e) => submitData(e, roleArray)}
                    >
                      Submit
                    </button>
                  </center>
                )}

              {/* Disabled state */}

              {currentPage &&
                (!JSON.parse(localStorage.getItem("pageOneData")) ||
                  roleArray[0].label === "") &&
                currentPage === structData.pages.length && (
                  <center>
                    <button
                      type="button"
                      className="custom-nav-btn-2-disabled"
                      disabled
                    >
                      Submit
                    </button>
                  </center>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyView;
