import React from "react";

const ErrHandling = ({ err_msg }) => {
  return (
    <div class="alert alert-danger" role="alert">
      {err_msg ? (
        <h3>{err_msg}</h3>
      ) : (
        <h3>
          Page not found... <span role="img">💩</span>
        </h3>
      )}
    </div>
  );
};

export default ErrHandling;
