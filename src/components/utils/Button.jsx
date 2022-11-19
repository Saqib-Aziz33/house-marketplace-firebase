import React from "react";

function Button({ children }, ...rest) {
  return (
    <div className="button-component">
      <button className="button">
        <span className="circle" aria-hidden="true">
          <span className="icon arrow"></span>
        </span>
        <span className="button-text">{children}</span>
      </button>
    </div>
  );
}
export default Button;
