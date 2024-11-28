import React, { useState } from "react";
import "./index.scss";

const CardWrapper = ({ children, flipped }) => {
  return (
    <div className={`card ${flipped ? "flipped" : ""}`}>
      <div className="card-inner">
        <div className="card-content">{children}</div>
      </div>
    </div>
  );
};

export default CardWrapper;
