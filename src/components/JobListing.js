import React from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import CheckIcon from "@mui/icons-material/Check";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

const JobListing = (props) => {
  const minSalary = props.minSalary;

  return (
    <div className="job_container">
      <div className="job_title">Techavatar</div>
      <div className="job_role">{props.jobRole}</div>
      <div className="job_location">{props.jobLocation}</div>
      <div style={{ display: "flex" }}>
        <div>
          Estimated Salary {minSalary == null ? 0 : minSalary} -{" "}
          {props.maxSalary == null ? 0 : props.maxSalary} LPA
        </div>
        <CheckIcon className="check_button" />
      </div>
      {console.log(props.minExp)}
      <div>
        Experience {props.minExp == null ? 0 : props.minExp} -{" "}
        {props.maxExp == null ? 0 : props.maxExp} Year
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
