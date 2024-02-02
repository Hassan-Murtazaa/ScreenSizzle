import React from "react";
import "./Styles.css";

export default function NowShowingDiv(props) {
  return (

    <div className="NowAndComing">
      <div className="container1">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 className="animate-charcter"> {props.title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}