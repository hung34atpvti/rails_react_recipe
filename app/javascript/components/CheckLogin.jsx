import React, { useEffect } from "react";

function CheckLogin({ children }) {

  useEffect(() => {
    const publicPaths = ["/login", "/register"];
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
    const isPublicPath = publicPaths.includes(window.location.pathname);

    if ((!userId || isExpired) && !isPublicPath) {
      window.location.href = window.location.origin + "/login";
    }
  });

  return <>{children}</>;
}

export default CheckLogin;
