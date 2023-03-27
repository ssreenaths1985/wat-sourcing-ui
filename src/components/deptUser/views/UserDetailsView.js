import { Link } from "react-router-dom";
import { AdminService } from "../../../services/admin.service";

const UserDetailsView = (props) => {
  var user = {};
  var roles = [];
  if (props.data !== null) {
    user = props.data;
    if (user.roles !== null) {
      roles = user.roles;
    }
  }

  const downloadUserData = (e) => {
    e.preventDefault();

    if (props.data && props.data.databaseUserId) {
      let userId = props.data.databaseUserId;
      AdminService.downloadDataAsCsv(userId).then((response) => {
        if (response && response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${props.data.name}.csv`);
          document.body.appendChild(link);
          link.click();
        }
      });
    }
  };

  return (
    <div className="mx-3 my-5">
      <Link
        to={{
          pathname: "/",
          hash: "#adminEdit",
          state: { editData: props.data, department: props.departmentName },
        }}
      >
        <button className="float-end add-btn-1 custom-btn-height-1">
          Edit
        </button>
      </Link>
      <button
        className="float-end add-btn-1 me-2 custom-btn-height-1"
        onClick={(e) => downloadUserData(e)}
      >
        Export
      </button>
      <div className="mx-5 my-2 heading-2 fw-bold text-capitalize">
        {user.name}
      </div>
      <div className="mx-5 my-2 text-capitalize label-3">
        {user.designation}
      </div>
      <div className="mx-5 my-2 label-3">
        Reporting to:{" "}
        <span className="text-capitalize label-3">
          {user.reporting_officer}
        </span>{" "}
      </div>

      {roles &&
        roles.map((role, i) => {
          if (!role.label) {
            return <div className="mx-5 my-2">No roles found!</div>;
          } else {
            return (
              <div key={i} className="my-4">
                <div
                  className="p-2 align-middle rounded h-50"
                  style={{ backgroundColor: "#e3e3e3" }}
                >
                  <div className=" mx-5 fw-bold label-3">{role.label}</div>
                  <div className="mx-5 label-3 pt-2">{role.description}</div>
                </div>

                <div className="mx-5 fw-bold mt-3 label-3">Activities</div>
                {role.activity &&
                  role.activity.map((act, i) => {
                    if (act === null || act === "") {
                      return (
                        <div className="mx-5 my-2">No activities found!</div>
                      );
                    } else {
                      return (
                        <div className="mx-5 my-2 label-3" key={i}>
                          {act}
                        </div>
                      );
                    }
                  })}

                {/* Competency rows */}
                <div className="mx-5">
                  <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                      <div className="fw-bold mt-3 label-3">Competencies</div>
                      {role.competency &&
                        role.competency.map((comt, i) => {
                          if (comt === null || comt === "") {
                            return <div className="my-2 label-3">-</div>;
                          } else {
                            return (
                              <div className="my-2 label-3" key={i}>
                                {comt}
                              </div>
                            );
                          }
                        })}
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                      <div className="fw-bold mt-3 label-3">
                        Competency area
                      </div>
                      {role.competency_area &&
                        role.competency_area.map((comt, i) => {
                          if (comt === null || comt === "") {
                            return <div className="my-2 label-3">-</div>;
                          } else {
                            return (
                              <div className="my-2 label-3" key={i}>
                                {comt}
                              </div>
                            );
                          }
                        })}
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                      <div className="fw-bold mt-3 label-3">
                        Competency level
                      </div>
                      {role.competency_level &&
                        role.competency_level.map((comt, i) => {
                          if (comt === null || comt === "") {
                            return <div className="my-2 label-3">-</div>;
                          } else {
                            return (
                              <div className="my-2 label-3" key={i}>
                                {comt}
                              </div>
                            );
                          }
                        })}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};

export default UserDetailsView;
