import React from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import CheckIcon from "@mui/icons-material/Check";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

const JobListing = (props) => {
  return (
    <div className="job_container">
      <div className="job_title">Techavatar</div>
      <div className="job_role">{props.jobRole}</div>
      <div className="job_location">{props.jobLocation}</div>
      <div style={{ display: "flex" }}>
        <div>Estimated Salary 10-15 LPA</div>
        <CheckIcon className="check_button" />
      </div>

      <div className="about">About Company</div>

      <div>{props.jobDetails}</div>
      <div className="button_job">
        <BoltIcon className="boltIcon" />
        <button className="btn">Easy Apply</button>
      </div>
    </div>
  );
};

export default JobListing;
