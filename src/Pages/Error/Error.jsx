import React from "react";
import "./Error.css";

function ErrorPage() {
  return (
    <div className="error-page">
      <h1>It's not you, It's us..!</h1>
      <h3>
        If Problem Persists Start Server{" "}
        <a
          href="https://replit.com/@OmkarPatil20/student-management-app"
          className="link"
        >
          Here
        </a>
      </h3>
      <div className="error-img"></div>
    </div>
  );
}

export default ErrorPage;
