import React from "react";

const Button = ({ label, ...rest }) => {
  return (
    <div className="flex items-center justify-between">
      <button {...rest}>{label}</button>
    </div>
  );
};

export default Button;
