import React from "react";

const Header = () => {
  const logout = () => {
    const url = "/api/v1/logout";
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error("Logout failed");
      })
      .then(() => {
        sessionStorage.clear();
        window.location.href = window.location.origin;
      })
      .catch((error) => {
        console.log(error.message);
        sessionStorage.clear();
        window.location.href = window.location.origin;
      });
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <div className="col-md-4">
            <span className="navbar-text">
              Welcome, <b>{sessionStorage.getItem("userEmail")}</b>
            </span>
          </div>
          <div className="col-md-6"></div>
          <div className="col-md-2">
            <span className="navbar-text btn link-warning" onClick={logout}>
              Log Out
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
