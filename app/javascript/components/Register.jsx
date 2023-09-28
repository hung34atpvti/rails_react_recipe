import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    const userExpired = sessionStorage.getItem("userExpired");
    let isExpired;
    if (userExpired) {
      if (Date.now() < userExpired) {
        isExpired = false;
      } else {
        isExpired = true;
      }
    } else {
      isExpired = true;
    }

    if (userId && !isExpired) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    validatePwd();
  }, [password, passwordConfirmation]);

  const validatePwd = () => {
    if (passwordConfirmation === password) {
      if (passwordConfirmation === "") {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
      setError("");
    } else {
      if (passwordConfirmation === "") {
        setError("");
      } else {
        setError("Please check your password");
      }
      setIsValid(false);
    }
  };

  const onSubmit = () => {
    const url = "/api/v1/users";
    const body = {
      email,
      password,
      password_confirmation: passwordConfirmation,
    };
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => navigate("/"))
      .catch((error) => {
        console.log(error.message);
        navigate("/");
      });
  };

  return (
    <>
      <div class="d-flex primary-color align-items-center justify-content-center vh-100 wh-100">
        <div className="container secondary-color">
          <div className="row">
            <h1 style={{ textAlign: "center" }} className="display-4 col-md-12">
              Sign Up to Food Recipes
            </h1>
          </div>
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <br />
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div className="form-group">
                <br />
                <label htmlFor="exampleInputPassword2">
                  Password Confirmation
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword2"
                  placeholder="Password Confirmation"
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                ></input>
              </div>
              <div style={{ color: "red" }} disabled={error === ""}>
                {error}
              </div>
              <br />
              <button
                className="btn btn-primary"
                onClick={onSubmit}
                disabled={!isValid}
              >
                Register
              </button>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
