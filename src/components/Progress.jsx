import React from "react";

const Progress = ({ value, className, color }) => {
  return (
    <div className={`relative w-full bg-gray-200 rounded-full ${className}`}>
      <div
        style={{ width: `${value}%` }}
        className={`absolute top-0 left-0 h-full ${color} rounded-full`}
      ></div>
    </div>
  );
};

export default Progress;
