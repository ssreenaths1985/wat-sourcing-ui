import React, { useEffect, useState } from "react";
import SurveyView from "../views/SurveyView";
import { surveyOne } from "../../../constants/index";
import { SurveyService } from "../../../services/survey.service";
import Notify from "../../../helpers/notify";
import ThankYouView from "../../surveys/views/ThankYouView";
import { UpdateService } from "../../../services/update.service";
import { useHistory } from "react-router-dom";
import NavBar from "../../common/NavBar";
import { SuperAdminService } from "../../../services/superAdmin.service";

/**
 *
 * Survey container component
 * fetch survey details, manages the survey view
 * as per the json structure
 */

const SurveyContainer = () => {
  useEffect(() => {
    localStorage.clear();
    getDepartmentList();
  }, []);

  const [showThankYou, setShowThankYou] = useState(false);
  const [deptList, setDeptList] = useState();
  const history = useHistory();

  const getDepartmentList = () => {
    SuperAdminService.getDepartmentList().then((response) => {
      if (response && response.status === 200) {
        setDeptList(response.data.data);
      }
    });
  };

  const submitData = (e, roleArray) => {
    e.preventDefault();

    let pageOneDataKeys =
      JSON.parse(localStorage.getItem("pageOneData")) &&
      Object.keys(JSON.parse(localStorage.getItem("pageOneData")));
    let pageOneDataValues =
      JSON.parse(localStorage.getItem("pageOneData")) &&
      Object.values(JSON.parse(localStorage.getItem("pageOneData")));

    let finalData = {
      userName: "",
      userDesignation: "",
      userWorkEmail: "",
      reportingOfficerName: "",
      reportingOfficerDesignation: "",
      reportingOfficerDepartment: "",
      roles: [],
    };

    pageOneDataKeys &&
      pageOneDataKeys.map((i, j) => {
        switch (i) {
          case "Name (in full)":
            return (finalData.userName = pageOneDataValues[j]);
          case "Designation (in full)":
            return (finalData.userDesignation = pageOneDataValues[j]);
          case "Work email":
            return (finalData.userWorkEmail = pageOneDataValues[j]);
          case "Name of your reporting officer (in full)":
            return (finalData.reportingOfficerName = pageOneDataValues[j]);
          case "Designation of your reporting officer (in full)":
            return (finalData.reportingOfficerDesignation =
              pageOneDataValues[j]);
          case "Your department":
            return (finalData.reportingOfficerDepartment =
              pageOneDataValues[j]);
          default:
            return finalData;
        }
      });

    for (let i = 0; i < roleArray.length; i++) {
      let roleData = {
        roleLabel: "",
        roleDescription: "",
        activities: [],
        competencies: [],
      };

      roleData.roleLabel = roleArray[i].label;
      roleData.roleDescription = roleArray[i].description;

      roleArray[i].activities.map((m, n) => {
        let data = {
          id: n,
          parent: m.parent,
          label: m.label,
        };
        return roleData.activities.push(data);
      });

      roleArray[i].competencies.map((m, n) => {
        let data = {
          id: n,
          parent: m.parent,
          label: m.label,
          area: m.area,
          level: m.level,
        };
        return roleData.competencies.push(data);
      });

      finalData.roles.push(roleData);
    }

    let editRoleIds = [];
    localStorage.getItem("editRoleIds") &&
      localStorage
        .getItem("editRoleIds")
        .split(",")
        .map((i, j) => {
          return editRoleIds.push(i);
        });
    let editRoleCompIds = [];
    localStorage.getItem("editRoleCompIds") &&
      localStorage
        .getItem("editRoleCompIds")
        .split(",")
        .map((i, j) => {
          return editRoleCompIds.push(i);
        });
    let editRoleActIds = [];
    localStorage.getItem("editRoleActIds") &&
      localStorage
        .getItem("editRoleActIds")
        .split(",")
        .map((i, j) => {
          return editRoleActIds.push(i);
        });
    let editUserId =
      localStorage.getItem("editUserId") && localStorage.getItem("editUserId");

    if (
      pageOneDataValues &&
      pageOneDataValues.length >= 5 &&
      pageOneDataValues[5] !== "" &&
      pageOneDataValues[5] !== "Select department"
    ) {
      if (
        editRoleActIds.length === 0 &&
        editRoleCompIds.length === 0 &&
        editRoleIds.length === 0
      ) {
        SurveyService.submitSurvey(finalData).then((res) => {
          if (res.status === 200) {
            setShowThankYou(true);
          } else {
            Notify.error(res.message);
          }
        });
      } else {
        let userData = {
          user_name: finalData["userName"],
          user_designation: finalData["userDesignation"],
          user_work_email: finalData["userWorkEmail"],
          reporting_officer_name: finalData["reportingOfficerName"],
          reporting_officer_designation:
            finalData["reportingOfficerDesignation"],
          reporting_officer_department: finalData["reportingOfficerDepartment"],
        };

        let adminId = JSON.parse(sessionStorage.getItem("adminData")).adminId;

        finalData.roles.map((i, j) => {
          i["id"] = editRoleIds[j] ? editRoleIds[j] : "0";
          i["userId"] = editUserId;
          i["adminId"] = adminId;
          i.activities.map((m, n) => {
            let lsRAIds = JSON.stringify(JSON.parse(editRoleActIds));

            if (JSON.parse(lsRAIds)[j]) {
              m.id = JSON.parse(lsRAIds)[j]
                ? JSON.parse(lsRAIds)[j][n]
                  ? JSON.parse(lsRAIds)[j][n]
                  : "0"
                : "0";
            } else {
              m.id = "0";
            }

            return null;
          });
          i.competencies.map((m, n) => {
            let lsCOIds = JSON.stringify(JSON.parse(editRoleCompIds));

            if (JSON.parse(lsCOIds)[j]) {
              m.id = JSON.parse(lsCOIds)[j]
                ? JSON.parse(lsCOIds)[j][n]
                  ? JSON.parse(lsCOIds)[j][n]
                  : "0"
                : "0";
            } else {
              m.id = "0";
            }

            return null;
          });

          return null;
        });

        if (adminId) {
          userData["adminId"] = adminId;

          UpdateService.updateUserData(userData, editUserId).then(
            (response) => {
              if (response && response.status === 200) {
                setTimeout(() => {
                  UpdateService.updateRolesData(finalData.roles).then(
                    (response) => {
                      if (response && response.status === 200) {
                        history.push("/admin/departments");
                      } else {
                        Notify.error(response.message);
                      }
                    }
                  );
                }, 100);
              } else {
                Notify.error(response.message);
              }
            }
          );
        }
      }
    } else {
      Notify.error("Kindly fill all the details!");
    }
  };

  return (
    <>
      <NavBar isLogOut={false} />
      <div className="container-fluid custom-container-1 pt-3">
        <div className="col-sm-10 col-md-10 col-lg-8 col-xl-8 col-xxl-7 horizontal-center-1 survey-section-3">
          <div className="">
            {!showThankYou && (
              <SurveyView
                structureData={surveyOne}
                submitData={submitData}
                deptList={deptList}
              />
            )}
            {showThankYou && <ThankYouView />}
          </div>
        </div>
      </div>
    </>
  );
};

export default SurveyContainer;
