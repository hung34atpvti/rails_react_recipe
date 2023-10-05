import React from "react";

export default function ButtonLoadingSpinner() {
  return (
    <>
      <button className="btn btn-primary col-md-2" type="button" disabled>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Loading...
      </button>
    </>
  );
}
