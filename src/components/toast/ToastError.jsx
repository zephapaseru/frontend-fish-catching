import React from "react";

const ToastError = ({ message }) => {
  return (
    <div className="toast toast-top toast-center">
      <div className="alert alert-warn">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ToastError;
