import React from "react";
import { useHistory } from "react-router-dom";

const Departmentlistview = ({ deptList }) => {
  const history = useHistory();

  const handleDepartment = (name) => {
    history.push("/admin/department/" + name);
  };

  return (
    <div className="d-flex flex-column align-items-start mt-5">
      <div className="dept-cointainer">
        <h4 className="fs-4">Choose department</h4>
        <p className="fs-6 text-black-50">
          To view the sourced data please choose the MDO
        </p>
        <div
          className={
            deptList && deptList.length > 0
              ? "custom-dept-grid"
              : " custom-dept-grid-empty"
          }
        >
          {deptList && deptList.length > 0 ? (
            deptList.map((item, index) => (
              <button
                key={index}
                onClick={() => handleDepartment(item.name)}
                className="custom-dept-btn text-capitalize "
              >
                {item.name}
              </button>
            ))
          ) : (
            <div className="d-flex gap-3 justify-content-center flex-column align-items-center text-black-50">
              <div className="material-icons fs-1 text-black-50">
                description
              </div>
              No department found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Departmentlistview;
