import React from "react";

const Button = ({ children, className, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-semibold ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
