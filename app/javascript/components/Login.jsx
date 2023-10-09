import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonLoadingSpinner from "./ButtonLoadingSpinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    validate();
  }, [email, password]);

  const onSubmit = () => {
    setIsLoading(true);
    setError("");
    if (!validate()) {
      return;
    }
    const url = "/api/v1/login";
    const body = {
      email,
      password,
    };
    const token = document.querySelector('meta[name="csrf-token"]').content;
    let err;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          return response.json();
        }
        if (response.status === 401) {
          err = "Login failed";
          return response.json();
        }

        throw new Error("Login failed");
      })
      .then((data) => {
        if (err === "Login failed") {
          setError(data.message);
          return;
        }
        console.log(data.user)
        sessionStorage.setItem("userId", data.user.id);
        sessionStorage.setItem("userEmail", data.user.email);
        sessionStorage.setItem("userRole", data.user.role);
        sessionStorage.setItem("userExpired", Date.now() + 15 * 60 * 1000);
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error.message);
      });
  };

  const validate = () => {
    if (email === "" || password === "") {
      setIsValid(false);
      return false;
    }
    setIsValid(true);
    return true;
  };

  return (
    <>
      <div className="d-flex primary-color align-items-center justify-content-center vh-100 wh-100">
        <div className="container secondary-color">
          <div className="row">
            <h1 style={{ textAlign: "center" }} className="display-4 col-md-12">
              Sign In to Food Recipes
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
              <div style={{ color: "red" }} disabled={error === ""}>
                {error}
              </div>
              <br />
              <div className="row">
                {isLoading ? (
                  <ButtonLoadingSpinner />
                ) : (
                  <button
                    className="btn btn-primary col-md-2"
                    onClick={onSubmit}
                    disabled={!isValid}
                  >
                    Login
                  </button>
                )}

                <div style={{ textAlign: "right" }} className=" col-md-8">
                  If you don't have an account, please{" "}
                  <span className="bi bi-arrow-right-square"></span>
                </div>
                <div
                  className="col-md-2 link-primary btn"
                  onClick={() => navigate("/register")}
                >
                  <u>Register</u>
                </div>
              </div>
            </div>

            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
