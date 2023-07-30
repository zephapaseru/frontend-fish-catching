import React from "react";

const ToastSuccess = ({ message }) => {
  return (
    <div className="toast toast-top toast-center">
      <div className="alert alert-success">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ToastSuccess;
