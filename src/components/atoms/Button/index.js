import React from "react";

const Button = ({ label, ...rest }) => {
  return (
    <div className="flex items-center justify-between">
      <button className="flex items-center justify-center py-2" {...rest}>
        {label}
      </button>
    </div>
  );
};

export default Button;
