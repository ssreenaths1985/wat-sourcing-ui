import React from "react";
import { useForm } from "react-hook-form";
// import { ErrorMessage } from "@hookform/error-message";

function Loginview({ loginData }) {
  const { register, formState, handleSubmit } = useForm({
    mode: "all",
    shouldFocusError: true,
    // defaultValues: {
    //   email: "admin@watsourcing.com",
    //   password: "Test@1234"
    // }
  });

  return (
    <div className="d-flex min-vh-100 flex-column justify-content-center align-items-center">
      <div className="d-flex flex-column gap-3 w-50">
        <h5>Sign in</h5>

        <form className="d-flex flex-column gap-2">
          <label className="text-black-50 fw-normal">Email</label>
          <input
            className="form-control custom-input-field-1 "
            placeholder="Email"
            autoComplete="off"
            type="email"
            {...register("email", { 
              required: "Email is required.",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid Email"
              }
           })}
          />

          {formState.errors.email ? (
            <p
              style={{ fontSize: "0.8rem", height: "10px" }}
              className="text-danger m-0 ps-1 "
            >
              {formState.errors.email.message}
             
            </p>
          ) : (
            <p
              style={{ fontSize: "0.8rem", height: "10px" }}
              className="text-danger m-0 ps-1 "
            ></p>
          )}

          <label className="text-black-50 fw-normal">Password</label>
          <input
            className="form-control custom-input-field-1"
            type="password"
            autoComplete="on"
            placeholder="Password"
            {...register("password", { required: "Password is required." })}
          />

          {formState.errors.password ? (
            <p
              style={{ fontSize: "0.8rem", height: "10px" }}
              className="text-danger m-0 ps-1 "
            >
              {formState.errors.password.message}
            </p>
          ) : (
            <p
              style={{ fontSize: "0.8rem", height: "10px" }}
              className="text-danger m-0 ps-1 "
            ></p>
          )}

          <button
            type="submit"
            className={
              !formState.isValid
                ? "custom-nav-btn-2-disabled w-50 align-self-end mt-1"
                : "custom-nav-btn-2 w-50 align-self-end mt-1"
            }
            onClick={handleSubmit(loginData)}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Loginview;
