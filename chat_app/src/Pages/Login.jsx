import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoggedUserAuth } from "../Redux/Action/AuthAction";
import { useSelector } from "react-redux";

const Login = () => {
  const { LoginFailure, authenticated } = useSelector(
    (state) => state.Reducers
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formdata, SetFormdata] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email: formdata.email, password: formdata.password };
    dispatch(LoggedUserAuth(user));
    authenticated && navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetFormdata({ ...formdata, [name]: value });
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Login</h5>
              <form
                onSubmit={handleSubmit}
                className="formData"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={formdata?.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={formdata?.password}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Sign in
                </button>
                {LoginFailure && (
                  <>
                    <br />{" "}
                    <span
                      style={{ color: "red" }}
                    >{`Error ${LoginFailure}`}</span>
                  </>
                )}
              </form>
              <p className="mt-3">
                You don't have an account?{" "}
                <Link to={"/register"}>Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
