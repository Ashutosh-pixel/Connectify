// src/components/Badge.js
import React from "react";

const Badge = ({ value }) => {
  return (
    <span className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-green-500 text-1xl">
      {value}
    </span>
  );
};

export default Badge;
