import React from "react";
import "./DateSeparator.css"; // Import the CSS file for styling

const DateSeparator = ({ date }) => {
  return (
    <div className="date-separator">
      {/* <span className="line"></span> */}
      <span className="date">{date}</span>
      {/* <span className="line"></span> */}
    </div>
  );
};

export default DateSeparator;
