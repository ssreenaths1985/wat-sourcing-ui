import React, { useEffect, useState } from "react";
import { TextField } from "../../fields/index";
import { useHistory } from "react-router-dom";
import { UpdateService } from "../../../services/update.service";
import Notify from "../../../helpers/notify";
import bootstrap from "bootstrap/dist/js/bootstrap.js";

/**
 *
 * Survey view component
 * returns survey ui components
 * as per the json structure
 */

const SurveyView = ({ structureData, submitData, deptList }) => {
  const [structData, setStructData] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [roleArray, setRoleArray] = useState([]);
  const [activityArray, setActivityArray] = useState([]);
  const [competencyArray, setCompetencyArray] = useState([]);
  const [pageOneData, setPageOneData] = useState({});
  const [pageTwoData, setPageTwoData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [pageThreeData, setPageThreeData] = useState([]);
  const [currentDept, setCurrentDept] = useState();
  const fromProps = useHistory();

  let dataTwo = [];
  let dataThree = [];

  useEffect(() => {
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );

    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  });

  useEffect(() => {
    formatPropsData(fromProps.location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    formatPropsOneData(fromProps.location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageOneData]);

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
        area: "",
        level: "",
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

      if (fromProps.location.state && fromProps.location.state.editData) {
        // console.log(fromProps.location.state.editData)
      } else {
        setRoleArray((state) => [firstRole, ...state]);
      }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [structureData]);

  // Dynamic formatting of page one data
  const formatPropsOneData = (data) => {
    if (data && data.hash === "#adminEdit") {
      if (data.state && data.state.editData) {
        let editData = data.state.editData;
        let tempObj = pageOneData;
        tempObj["Your department"] = data.state.department;
        setCurrentDept(data.state.department);

        localStorage.setItem("editUserId", editData.databaseUserId);

        // Prefilling page one data
        Object.keys(editData).map((i, j) => {
          switch (i) {
            case "name":
              Object.assign(tempObj, { "Name (in full)": editData["name"] });
              break;
            case "designation":
              Object.assign(tempObj, {
                "Designation (in full)": editData["designation"],
              });
              break;
            case "user_work_email":
              Object.assign(tempObj, {
                "Work email": editData["user_work_email"],
              });
              break;
            case "reporting_officer":
              Object.assign(tempObj, {
                "Name of your reporting officer (in full)":
                  editData["reporting_officer"],
              });
              break;
            case "reporting_officer_designation":
              Object.assign(tempObj, {
                "Designation of your reporting officer (in full)":
                  editData["reporting_officer_designation"],
              });
              break;
            case "department":
              Object.assign(tempObj, {
                "Your department": data.state.department,
              });

              break;
            default:
              return null;
          }
          localStorage.setItem("pageOneData", JSON.stringify(tempObj));
          setPageOneData(tempObj);
          return null;
        });
      }
    }
  };

  // Dynamic formatting of page two and three data
  const formatPropsData = (data) => {
    if (data && data.hash === "#adminEdit") {
      if (data.state && data.state.editData) {
        let editData = data.state.editData;
        let roles = editData.roles;
        let editRoleActIds = [];
        let editRoleCompIds = [];
        let editRoleIds = [];

        editData.roles.map((i, j) => {
          editRoleActIds.push(i.databaseActRoleIds);
          editRoleCompIds.push(i.databaseRoleCompIds);
          editRoleIds.push(i.databaseRolesId);
          return null;
        });

        setTimeout(() => {
          localStorage.setItem("editRoleIds", editRoleIds);
          localStorage.setItem(
            "editRoleActIds",
            JSON.stringify(editRoleActIds)
          );
          localStorage.setItem(
            "editRoleCompIds",
            JSON.stringify(editRoleCompIds)
          );
        }, 100);

        let tempArrayObj = [];

        roles.map((i, j) => {
          tempArrayObj.push({
            id: j,
            label: i.label,
            description: i.description,
            activities: [],
            competencies: [],
          });

          i.activity.map((o, p) => {
            return tempArrayObj[j].activities.push({
              id: p,
              parent: j,
              label: o,
            });
          });

          i.competency.map((m, n) => {
            return tempArrayObj[j].competencies.push({
              id: n,
              parent: j,
              label: m,
            });
          });

          i.competency_area.map((k, l) => {
            return (tempArrayObj[j].competencies[l]["area"] = k);
          });

          i.competency_level.map((q, w) => {
            return (tempArrayObj[j].competencies[w]["level"] = q);
          });

          return null;
        });

        setRoleArray(tempArrayObj);
        localStorage.setItem("roleArray", tempArrayObj);
      }
    }
  };

  // Updating page one data fields on change
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
        setCurrentDept(e.target.value);
        break;
      default:
        return null;
    }
    localStorage.setItem("pageOneData", JSON.stringify(tempObj));
    setPageOneData(tempObj);
  };

  // Handling next button event
  const updateNextPage = (e) => {
    e.preventDefault();

    let totalPages = structData.pages.length;
    let stayingPage = currentPage;

    if (stayingPage < totalPages) {
      stayingPage++;
    }
    setCurrentPage(stayingPage);

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

  // Handling previous button event
  const updatePreviousPage = (e) => {
    e.preventDefault();

    setRoleArray(JSON.parse(localStorage.getItem("roleArray")));

    let totalPages = structData.pages.length;
    let stayingPage = currentPage;

    if (stayingPage <= totalPages) {
      stayingPage--;
    }
    setCurrentPage(stayingPage);
  };

  const insertRole = (e) => {
    e.preventDefault();

    let actArray = JSON.parse(localStorage.getItem("activityArray"));
    let compArray = JSON.parse(localStorage.getItem("competencyArray"));
    let rolArray = JSON.parse(localStorage.getItem("roleArray"));

    let roleId = rolArray[rolArray.length - 1].id;
    let activityId = rolArray[roleId]
      ? rolArray[roleId].activities.length
      : rolArray[rolArray.length - 1].activities.length;
    let comepetencyId = rolArray[roleId]
      ? rolArray[roleId].competencies.length
      : rolArray[rolArray.length - 1].competencies.length;

    roleId++;

    let activitiesData = {
      id: activityId === 1 ? activityId - 1 : activityId++,
      parent: roleId,
      label: "",
    };

    let competenciesData = {
      id: comepetencyId === 1 ? comepetencyId - 1 : comepetencyId++,
      parent: roleId,
      label: "",
      area: "",
      level: "",
    };

    let roles = {
      id: roleId,
      label: "",
      description: "",
      activities: [activitiesData],
      competencies: [competenciesData],
    };

    actArray.push(activitiesData);
    compArray.push(competenciesData);
    rolArray.push(roles);

    setActivityArray(actArray);
    setCompetencyArray(compArray);
    setRoleArray(rolArray);
  };

  // Delete an role
  const deleteRole = (e, id) => {
    e.preventDefault();

    let updatedArray = [];

    let tempRoleArray = JSON.parse(localStorage.getItem("roleArray"));

    tempRoleArray.map((i, j) => {
      if (i.id === id) {
        const index = tempRoleArray.indexOf(i);
        if (index > -1) {
          tempRoleArray.splice(index, 1);
        }
      }
      return null;
    });

    updatedArray.push(tempRoleArray);

    setRoleArray(updatedArray[0]);

    localStorage.setItem("roleArray", JSON.stringify(updatedArray[0]));
  };

  // Insert an activity
  const insertActivity = (e, parent) => {
    e.preventDefault();

    let rolArray = JSON.parse(localStorage.getItem("roleArray"));
    let actArray = JSON.parse(localStorage.getItem("activityArray"));

    let activityId = rolArray[parent]
      ? rolArray[parent].activities.length
      : rolArray[rolArray.length - 1].activities.length;

    let newActivity = {
      id: activityId++,
      parent: parent,
      label: "",
    };

    let tempArray = roleArray;

    tempArray.map((i, j) => {
      if (i.id === newActivity.parent) {
        i.activities.push(newActivity);
      }
      return null;
    });

    actArray.push(tempArray);

    setActivityArray(actArray);

    localStorage.setItem("roleArray", JSON.stringify(tempArray));
  };

  // Insert an competency
  const insertCompetency = (e, parent) => {
    e.preventDefault();

    let rolArray = JSON.parse(localStorage.getItem("roleArray"));
    let compArray = JSON.parse(localStorage.getItem("competencyArray"));

    let competencyId = rolArray[parent]
      ? rolArray[parent].competencies.length
      : rolArray[rolArray.length - 1].competencies.length;

    let newCompetency = {
      id: competencyId++,
      parent: parent,
      label: "",
      area: "",
      level: "",
    };

    let tempArray = roleArray;

    tempArray.map((i, j) => {
      if (i.id === newCompetency.parent) {
        i.competencies.push(newCompetency);
      }
      return null;
    });

    compArray.push(tempArray);

    setCompetencyArray(compArray);

    localStorage.setItem("roleArray", JSON.stringify(tempArray));
  };

  // Delete an activity
  const deleteActivity = (e, id, parentId) => {
    e.preventDefault();

    let updatedArray = [];

    let tempActArray = JSON.parse(localStorage.getItem("activityArray"));

    tempActArray.map((i, j) => {
      if (i.parent === parentId) {
        if (i.id === id) {
          const index = tempActArray.indexOf(i);
          if (index > -1) {
            tempActArray.splice(index, 1);
          }
        }
      }

      return null;
    });

    updatedArray.push(tempActArray);

    localStorage.setItem("activityArray", JSON.stringify(updatedArray[0]));

    updatedArray[0].map((i, j) => {
      return setActivityArray(i);
    });

    let tempArray = roleArray;

    tempArray.map((i, j) => {
      if (i.id === parentId) {
        i.activities.map((m, n) => {
          if (m.id === id) {
            const index = i.activities.indexOf(m);
            if (index > -1) {
              i.activities.splice(index, 1);
            }
          }
          return null;
        });
      }
      return null;
    });

    localStorage.setItem("roleArray", JSON.stringify(tempArray));
  };

  // Delete an competency
  const deleteCompetency = (e, id, parentId) => {
    e.preventDefault();

    let updatedArray = [];

    let tempCompArray = JSON.parse(localStorage.getItem("competencyArray"));

    tempCompArray.map((i, j) => {
      if (i.parent === parentId) {
        if (i.id === id) {
          const index = tempCompArray.indexOf(i);
          if (index > -1) {
            tempCompArray.splice(index, 1);
          }
        }
      }

      return null;
    });

    updatedArray.push(tempCompArray);

    localStorage.setItem("competencyArray", JSON.stringify(updatedArray[0]));

    updatedArray[0].map((i, j) => {
      return setCompetencyArray(i);
    });

    let tempArray = roleArray;

    tempArray.map((i, j) => {
      if (i.id === parentId) {
        i.competencies.map((m, n) => {
          if (m.id === id) {
            const index = i.competencies.indexOf(m);
            if (index > -1) {
              i.competencies.splice(index, 1);
            }
          }
          return null;
        });
      }
      return null;
    });

    localStorage.setItem("roleArray", JSON.stringify(tempArray));
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

  // Handles on change events of the fields in page two and three
  useEffect(() => {
    let pageTwo = document.getElementById("page-2");
    let pageThree = document.getElementById("page-3");

    // For page two
    if (pageTwo) {
      let pageTwoFields = document.getElementsByTagName("input");
      let pageTwoTextArea = document.getElementsByTagName("textarea");

      let tempObj = roleArray;

      tempObj.map((m, n) => {
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
                localStorage.setItem("roleArray", JSON.stringify(tempObj));
              }

              if (pageTwoFields[i].id.includes("AID")) {
                m.activities.map((q, w) => {
                  if (
                    pageTwoFields[i].id.split("AID")[1] ===
                    q.parent.toString() + q.id.toString()
                  ) {
                    q.label = pageTwoFields[i].value;
                    localStorage.setItem("roleArray", JSON.stringify(tempObj));
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
                localStorage.setItem("roleArray", JSON.stringify(tempObj));
              }
            }
          });
        }
        return null;
      });
    }

    // For page three
    if (pageThree) {
      let pageThreeFields = document.getElementsByTagName("input");
      let pageThreeSelectFields = document.getElementsByTagName("select");

      let tempObj = roleArray;

      tempObj.map((m, n) => {
        for (let i = 0; i < pageThreeFields.length; i++) {
          pageThreeFields[i].addEventListener("keyup", () => {
            setTimeout(() => {
              if (
                pageThreeFields[i].parentElement.parentElement.parentElement
                  .id === `role-row-${n}` &&
                pageThreeFields[i].value !== ""
              ) {
                if (pageThreeFields[i].id.includes("CID")) {
                  m.competencies.map((q, w) => {
                    if (
                      pageThreeFields[i].id.split("CID")[1] ===
                      q.parent.toString() + q.id.toString()
                    ) {
                      q.label = pageThreeFields[i].value;
                      localStorage.setItem(
                        "roleArray",
                        JSON.stringify(tempObj)
                      );
                    }
                    return null;
                  });
                }

                if (pageThreeFields[i].id.includes("CIA")) {
                  m.competencies.map((q, w) => {
                    if (
                      pageThreeFields[i].id.split("CIA")[1] ===
                      q.parent.toString() + q.id.toString()
                    ) {
                      q.area = pageThreeFields[i].value;
                      localStorage.setItem(
                        "roleArray",
                        JSON.stringify(tempObj)
                      );
                    }
                    return null;
                  });
                }
              }
            }, 150);
          });
        }
        for (let i = 0; i < pageThreeSelectFields.length; i++) {
          pageThreeSelectFields[i].addEventListener("change", () => {
            if (`role-row-${n}` && pageThreeSelectFields[i].value !== "") {
              if (pageThreeSelectFields[i].id.includes("CIL")) {
                m.competencies.map((q, w) => {
                  if (
                    pageThreeSelectFields[i].id.split("CIL")[1] ===
                    q.parent.toString() + q.id.toString()
                  ) {
                    q.level =
                      pageThreeSelectFields[i].value !== "Select level"
                        ? pageThreeSelectFields[i].value
                        : "";
                    localStorage.setItem("roleArray", JSON.stringify(tempObj));
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

  // For admins - Delete activity by id
  const directDelActivity = (id, parent) => {
    let ids = JSON.parse(localStorage.getItem("editRoleActIds"));
    let id1 = id--;
    let reqId = ids[parent][id1];

    if (reqId) {
      let data = {
        table: "role_activities",
        field: "id",
        item: ids[parent][id1],
      };

      UpdateService.deleteAnRecord(data).then((response) => {
        if (response && response.status === 200) {
          // console.log(response);
        } else {
          Notify.error(response.message);
        }
      });
    }
  };

  // For admins - Delete competency by id
  const directDelCompetency = (id, parent) => {
    let ids = JSON.parse(localStorage.getItem("editRoleCompIds"));
    let id1 = id--;
    let reqId = ids[parent][id1];

    if (reqId) {
      let data = {
        table: "role_competencies",
        field: "id",
        item: ids[parent][id1],
      };

      UpdateService.deleteAnRecord(data).then((response) => {
        if (response && response.status === 200) {
          // console.log(response);
        } else {
          Notify.error(response.message);
        }
      });
    }
  };

  // For admins - Delete role by id
  const directDelRole = (id) => {
    let ids = localStorage.getItem("editRoleIds").split(",");
    let id1 = id--;
    let reqId = ids[id1];

    if (reqId) {
      UpdateService.deleteAnRole(reqId).then((response) => {
        if (response && response.status === 200) {
          // console.log(response);
        } else {
          Notify.error(response.message);
        }
      });
    }
  };

  return (
    <div className="container pt-4 ps-5 pe-5">
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
                      <div className="pt-1 pb-3 col-12">
                        <center>
                          {structData && structData.surveyName && (
                            <h1 className="heading-3 float-start">
                              {structData.surveyName}
                            </h1>
                          )}
                        </center>
                      </div>

                      {/* Message section */}
                      <div className="pt-2 pb-2 col-12">
                        {structData && structData.message && currentPage === 1 && (
                          <>
                            <p className="message-1 float-start">
                              {structData.message}
                            </p>
                            <br />
                          </>
                        )}
                      </div>
                      <React.Fragment>
                        <div className="pb-2 pt-2 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                          <h2 className="heading-4 float-start col-12">
                            {i.heading}
                          </h2>
                          <div className="">
                            <label className="label-2 pt-1">
                              Name (in full){" "}
                              <span
                                className="material-icons info-icon-1 ps-1"
                                title="Name (in full)"
                              >
                                info
                              </span>
                            </label>
                            <input
                              type="text"
                              className="form-control custom-input-field-1 w-50"
                              name="Name (in full)"
                              onChange={updatePageOneData}
                              defaultValue={pageOneData["Name (in full)"]}
                              placeholder="Enter full name"
                              autoComplete="off"
                            />
                            <label className="label-2 pt-3">
                              Position (Designation)
                              <span
                                className="material-icons info-icon-1 ps-1"
                                data-bs-toggle="tooltip"
                                data-bs-placement="right"
                                title="The position label is the name of the position. It gives
                                a sense of where a position is placed in the hierarchy of the MDO (and
                                thereby leadership expectations from the position)."
                              >
                                info
                              </span>
                            </label>
                            <input
                              type="text"
                              className="form-control custom-input-field-1 w-50"
                              name="Designation (in full)"
                              onChange={updatePageOneData}
                              defaultValue={
                                pageOneData["Designation (in full)"]
                              }
                              placeholder="Enter designation"
                              autoComplete="off"
                            />
                            <label className="label-2 pt-3">
                              Work email{" "}
                              <span
                                className="material-icons info-icon-1 ps-1"
                                title="Work email"
                              >
                                info
                              </span>
                            </label>
                            <input
                              type="text"
                              className="form-control custom-input-field-1 w-50"
                              name="Work email"
                              onChange={updatePageOneData}
                              defaultValue={pageOneData["Work email"]}
                              placeholder="Enter work email"
                              autoComplete="off"
                            />
                          </div>
                        </div>
                        <h2 className="heading-2 mt-3">
                          Reporting officer & department
                        </h2>

                        <div className="pb-2 pt-2 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                          <label className="label-2 pt-1">
                            Name of your reporting officer (in full)
                            <span
                              className="material-icons info-icon-1 ps-1"
                              title="Name of your reporting officer (in full)"
                            >
                              info
                            </span>
                          </label>
                          <input
                            type="text"
                            className="form-control custom-input-field-1 w-50"
                            name="Name of your reporting officer (in full)"
                            onChange={updatePageOneData}
                            defaultValue={
                              pageOneData[
                                "Name of your reporting officer (in full)"
                              ]
                            }
                            placeholder="Enter full name"
                            autoComplete="off"
                          />
                          <label className="label-2 pt-3">
                            Position (Designation) of your reporting officer
                            <span
                              className="material-icons info-icon-1 ps-1"
                              title="Position (Designation) of your reporting officer"
                            >
                              info
                            </span>
                          </label>
                          <input
                            type="text"
                            className="form-control custom-input-field-1 w-50"
                            name="Designation of your reporting officer (in full)"
                            onChange={updatePageOneData}
                            defaultValue={
                              pageOneData[
                                "Designation of your reporting officer (in full)"
                              ]
                            }
                            placeholder="Enter designation"
                            autoComplete="off"
                          />
                          <label className="label-2 pt-3">
                            Your department
                            <span
                              className="material-icons info-icon-1 ps-1"
                              title="Your department"
                            >
                              info
                            </span>
                          </label>
                          <select
                            className="form-select form-control custom-input-field-1 w-50"
                            aria-label="Department selector"
                            id={`departmentList`}
                            name="Your department"
                            onChange={updatePageOneData}
                            value={currentDept}
                          >
                            <option>Select department</option>
                            {deptList &&
                              deptList.map((v, b) => {
                                return (
                                  <option value={v.name} key={b}>
                                    {v.name}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </React.Fragment>
                    </div>
                  )}

                  {/* Page 2 */}
                  {currentPage === 2 && (
                    <React.Fragment>
                      <h2 className="heading-3">Roles & Activities</h2>
                      <h2 className="message-1">
                        List down the 'roles' that you play as part of your
                        current post and activities that are associated with
                        each role. For adding more roles create a new row
                      </h2>
                      <h2 className="heading-4 float-start col-12 mt-3">
                        About you
                      </h2>
                      <div className="mb-5 pt-3">
                        {roleArray &&
                          roleArray.map((o, p) => {
                            return (
                              <div id={`role-row-${p}`} key={p}>
                                <div className="row pt-2 pb-2" key={p}>
                                  <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                    <label className="label-2">
                                      Role{" "}
                                      <span
                                        className="material-icons info-icon-1 ps-1"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        title="Role label summarises a set of sequential activities"
                                      >
                                        info
                                      </span>
                                    </label>

                                    <div className="">
                                      <input
                                        type="text"
                                        className="form-control custom-input-field-3 mt-2"
                                        id={"RID" + o.id}
                                        defaultValue={o.label}
                                        placeholder="Role label"
                                        autoComplete="off"
                                      ></input>
                                      <textarea
                                        style={{ width: "100%" }}
                                        className="form-control custom-input-field-3 mt-2"
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
                                            <label className="label-2">
                                              Activity{" "}
                                              <span
                                                className="material-icons info-icon-1 ps-1"
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="right"
                                                title="Activities are a set of tasks/actions taken to contribute towards the
                                                role."
                                              >
                                                info
                                              </span>
                                            </label>
                                            <div className="col-8">
                                              <TextField
                                                fieldId={
                                                  "AID" + m.parent + m.id
                                                }
                                                value={m.label}
                                                placeholder="Activities as part of this role"
                                              />
                                            </div>

                                            {n > 0 && (
                                              <div className="col-2">
                                                <div className="d-flex flex-row">
                                                  <div
                                                    className="material-icons remove-icon-2 mt-2"
                                                    style={{
                                                      marginLeft: "-0.5rem",
                                                    }}
                                                    onClick={(event) => {
                                                      if (
                                                        !localStorage.getItem(
                                                          "editRoleIds"
                                                        )
                                                      ) {
                                                        deleteActivity(
                                                          event,
                                                          m.id,
                                                          m.parent
                                                        );
                                                      } else {
                                                        directDelActivity(
                                                          m.id,
                                                          m.parent
                                                        );
                                                        deleteActivity(
                                                          event,
                                                          m.id,
                                                          m.parent
                                                        );
                                                      }
                                                    }}
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="top"
                                                    title="Delete activity"
                                                  >
                                                    close
                                                  </div>
                                                </div>
                                              </div>
                                            )}

                                            {o.activities.length === 1 && (
                                              <>
                                                <button
                                                  type="button"
                                                  className="btn add-btn-1 mt-4 col-5"
                                                  onClick={(event) =>
                                                    insertActivity(event, o.id)
                                                  }
                                                  style={{
                                                    marginLeft: "0.75rem",
                                                  }}
                                                >
                                                  Add another activity
                                                </button>
                                              </>
                                            )}

                                            {o.activities.length !== 1 &&
                                              n === o.activities.length - 1 && (
                                                <button
                                                  type="button"
                                                  className="btn add-btn-1 mt-4 col-5"
                                                  onClick={(event) =>
                                                    insertActivity(event, o.id)
                                                  }
                                                  style={{
                                                    marginLeft: "0.75rem",
                                                  }}
                                                >
                                                  Add another activity
                                                </button>
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
                                          onClick={(event) => {
                                            if (
                                              !localStorage.getItem(
                                                "editRoleIds"
                                              )
                                            ) {
                                              deleteRole(event, o.id);
                                            } else {
                                              directDelRole(o.id);
                                              deleteRole(event, o.id);
                                            }
                                          }}
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
                          className="add-btn-1 mb-3 p-2 mt-2"
                          onClick={insertRole}
                        >
                          Add another role
                        </button>
                        <a
                          className="float-end link-style-2 mt-2"
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
                      <h2 className="heading-3 mt-3">Roles & Competencies</h2>
                      <h2 className="message-1">
                        List down the 'competencies' that you think are
                        necessary to carry out each role
                      </h2>
                      <h2 className="heading-4 float-start col-12 mt-3">
                        About you
                      </h2>
                      <div className="mb-5 pt-3">
                        {roleArray &&
                          roleArray.map((o, p) => {
                            return (
                              <div id={`role-row-${p}`} key={p}>
                                <div className="row pt-2 pb-2" key={p}>
                                  <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                    <label className="label-2">
                                      Role
                                      <span
                                        className="material-icons info-icon-1 ps-1"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        title="Role label summarises a set of sequential activities"
                                      >
                                        info
                                      </span>
                                    </label>
                                    <div className="">
                                      <input
                                        type="text"
                                        className="form-control custom-input-field-3 mt-2"
                                        id={"RID" + o.id}
                                        defaultValue={o.label}
                                        placeholder="Role label"
                                        readOnly
                                      ></input>
                                      <textarea
                                        style={{ width: "100%" }}
                                        className="form-control custom-input-field-3 mt-2"
                                        id={"DESC" + o.id}
                                        defaultValue={o.description}
                                        placeholder="Role description"
                                        readOnly
                                      ></textarea>
                                    </div>
                                  </div>
                                  <div
                                    className="col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9"
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
                                            {/* Competency name */}
                                            <div className="col-4">
                                              <label className="label-2">
                                                Competency name{" "}
                                                <span
                                                  className="material-icons info-icon-1 ps-1"
                                                  data-bs-toggle="tooltip"
                                                  data-bs-placement="right"
                                                  title="Gives an idea of what the competency is about,
                                                  and how it is commonly known."
                                                >
                                                  info
                                                </span>
                                              </label>
                                              <div className="">
                                                <TextField
                                                  fieldId={
                                                    "CID" + m.parent + m.id
                                                  }
                                                  value={m.label}
                                                  placeholder="Competencies as part of this role"
                                                />
                                              </div>
                                            </div>
                                            {/* Competency area */}
                                            <div className="col-4">
                                              <label className="label-2">
                                                Competency area{" "}
                                                <span
                                                  className="material-icons info-icon-1 ps-1"
                                                  data-bs-toggle="tooltip"
                                                  data-bs-placement="right"
                                                  title="Indicates a collection of competencies closely
                                                  related to one another at a knowledge/subject level."
                                                >
                                                  info
                                                </span>
                                              </label>
                                              <div className="">
                                                <TextField
                                                  fieldId={
                                                    "CIA" + m.parent + m.id
                                                  }
                                                  value={m.area}
                                                  placeholder="Competency area"
                                                />
                                              </div>
                                            </div>
                                            {/* Competency level */}
                                            <div className="col-4">
                                              <label className="label-2">
                                                Competency level{" "}
                                                <span
                                                  className="material-icons info-icon-1 ps-1"
                                                  data-bs-toggle="tooltip"
                                                  data-bs-placement="right"
                                                  title="Refers to the proficiency level of the competency. It
                                                  indicates levels of sophistication of the competency described.
                                                  Competency levels are progressive in nature and normally given in an
                                                  ascending order."
                                                >
                                                  info
                                                </span>
                                              </label>
                                              <div className="d-flex flex-row">
                                                <div className="col-12">
                                                  <select
                                                    className="form-select"
                                                    aria-label="Default competency level selector"
                                                    id={"CIL" + m.parent + m.id}
                                                    defaultValue={
                                                      m.level ? m.level : ""
                                                    }
                                                  >
                                                    <option>
                                                      Select level
                                                    </option>
                                                    <option value="Level 1">
                                                      Level 1
                                                    </option>
                                                    <option value="Level 2">
                                                      Level 2
                                                    </option>
                                                    <option value="Level 3">
                                                      Level 3
                                                    </option>
                                                    <option value="Level 4">
                                                      Level 4
                                                    </option>
                                                    <option value="Level 5">
                                                      Level 5
                                                    </option>
                                                  </select>
                                                </div>

                                                {n > 0 && (
                                                  <div className="col-2 ms-3">
                                                    <div className="d-flex flex-row">
                                                      <div
                                                        className="material-icons remove-icon-2 mt-2"
                                                        style={{
                                                          marginLeft: "-0.5rem",
                                                        }}
                                                        onClick={(event) => {
                                                          if (
                                                            !localStorage.getItem(
                                                              "editRoleIds"
                                                            )
                                                          ) {
                                                            deleteCompetency(
                                                              event,
                                                              m.id,
                                                              m.parent
                                                            );
                                                          } else {
                                                            directDelCompetency(
                                                              m.id,
                                                              m.parent
                                                            );
                                                            deleteCompetency(
                                                              event,
                                                              m.id,
                                                              m.parent
                                                            );
                                                          }
                                                        }}
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="top"
                                                        title="Delete activity"
                                                      >
                                                        close
                                                      </div>
                                                    </div>
                                                  </div>
                                                )}
                                              </div>
                                            </div>

                                            {o.competencies.length === 1 && (
                                              <button
                                                type="button"
                                                className="btn add-btn-1 mt-4 col-12 add-btn-2"
                                                onClick={(event) =>
                                                  insertCompetency(event, o.id)
                                                }
                                              >
                                                Add another competency
                                              </button>
                                            )}

                                            {o.competencies.length !== 1 &&
                                              n ===
                                                o.competencies.length - 1 && (
                                                <button
                                                  type="button"
                                                  className="btn add-btn-1 mt-4 col-12 add-btn-2"
                                                  onClick={(event) =>
                                                    insertCompetency(
                                                      event,
                                                      o.id
                                                    )
                                                  }
                                                >
                                                  Add another competency
                                                </button>
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
                            className="float-end link-style-1 mb-3 link-style-2"
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
        <div className="d-flex justify-content-between pt-2 pb-2">
          <div className="d-block d-sm-none">
            {structData && structData.pages && (
              <center>
                <p className="label-2">
                  Page {currentPage} of {structData.pages.length}
                </p>
              </center>
            )}
          </div>
          <div className="pb-3 ">
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
          <div className="pt-1 d-none d-md-block d-lg-block d-xl-block d-xxl-block">
            {structData && structData.pages && (
              <p className="label-2">
                Page {currentPage} of {structData.pages.length}
              </p>
            )}
          </div>
          <div className="pb-3">
            {currentPage && currentPage < structData.pages.length && (
              <button
                type="button"
                className="custom-nav-btn-2"
                onClick={updateNextPage}
              >
                Next
              </button>
            )}

            {currentPage &&
              !localStorage.getItem("editRoleIds") &&
              JSON.parse(localStorage.getItem("pageOneData")) &&
              roleArray[0].label !== "" &&
              currentPage === structData.pages.length && (
                <button
                  type="button"
                  className="custom-nav-btn-2"
                  onClick={(e) =>
                    submitData(e, JSON.parse(localStorage.getItem("roleArray")))
                  }
                >
                  Submit
                </button>
              )}

            {currentPage &&
              localStorage.getItem("editRoleIds") &&
              JSON.parse(localStorage.getItem("pageOneData")) &&
              roleArray[0].label !== "" &&
              currentPage === structData.pages.length && (
                <button
                  type="button"
                  className="custom-nav-btn-2"
                  onClick={(e) =>
                    submitData(e, JSON.parse(localStorage.getItem("roleArray")))
                  }
                >
                  Update
                </button>
              )}

            {currentPage &&
              (!JSON.parse(localStorage.getItem("pageOneData")) ||
                roleArray[0].label === "") &&
              currentPage === structData.pages.length && (
                <button
                  type="button"
                  className="custom-nav-btn-2-disabled"
                  disabled
                >
                  Submit
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyView;
