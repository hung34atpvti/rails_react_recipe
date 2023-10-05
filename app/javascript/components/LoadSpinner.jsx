import React from "react";

export default function LoadSpinner(props) {
  console.log("props", props);
  return (
    <>
      <div className="container" style={{ padding: props.padding }}></div>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
}
