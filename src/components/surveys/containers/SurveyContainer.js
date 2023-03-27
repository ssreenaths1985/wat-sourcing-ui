import React, { useEffect, useState } from "react";
import SurveyView from "../views/SurveyView";
import { surveyOne } from "../../../constants/index";
import { SurveyService } from "../../../services/survey.service";
import Notify from "../../../helpers/notify";
import ThankYouView from "../views/ThankYouView";

/**
 *
 * Survey container component
 * fetch survey details, manages the survey view
 * as per the json structure
 */

const SurveyContainer = () => {
  useEffect(() => {
    localStorage.clear();
  });

  const [showThankYou, setShowThankYou] = useState(false);

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
        };
        return roleData.competencies.push(data);
      });

      finalData.roles.push(roleData);
    }

    if (pageOneDataValues.length >= 5) {
      SurveyService.submitSurvey(finalData).then((res) => {
        if (res.status === 200) {
          setShowThankYou(true);
        } else {
          Notify.error(res.message);
        }
      });
    } else {
      Notify.error("!Kindly fill all the details");
    }
  };

  return (
    <div className="container-fluid">
      <div className="col-sm-10 col-md-10 col-lg-6 col-xl-6 col-xxl-6 horizontal-center-1">
        <div className="survey-section-1 min-vh-100 p-3 position-relative">
          {!showThankYou && (
            <SurveyView structureData={surveyOne} submitData={submitData} />
          )}
          {showThankYou && <ThankYouView />}
        </div>
      </div>
    </div>
  );
};

export default SurveyContainer;
