import React, { useState } from "react";
import addimg from "../assets/images/gallery_icon.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CreateUserAuth } from "../Redux/Action/AuthAction";

const Register = () => {
  const { AuthFailure } = useSelector((state) => state.Reducers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formdata, SetFormdata] = useState({
    name: "",
    email: "",
    password: "",
    file: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetFormdata({ ...formdata, [name]: value });
  };

  const handleUpload = (e) => {
    const { name, files } = e.target;
    SetFormdata({ ...formdata, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name: formdata.name,
      email: formdata.email,
      password: formdata.password,
      file: formdata.file,
    };
    dispatch(CreateUserAuth(user, navigate));
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Register</h5>
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "25px",
                }}
              >
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    name="name"
                    onChange={handleChange}
                    value={formdata?.name}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={formdata?.email}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={formdata?.password}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="file"
                    id="file"
                    name="file"
                    className="form-control-file"
                    style={{ display: "none" }}
                    onChange={handleUpload}
                    // value={formdata?.file}
                  />
                  <label htmlFor="file" className="custom-file-upload">
                    <img src={addimg} alt="" />
                    Add an avatar
                  </label>
                </div>
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
                {AuthFailure && (
                  <>
                    <br />{" "}
                    <span style={{ color: "red" }}>Something went wrong</span>
                  </>
                )}
              </form>
              <p className="mt-3">
                You don't have an account? <Link to={"/login"}>Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
