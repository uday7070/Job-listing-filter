import "./App.css";
import { useEffect, useState } from "react";
import JobListing from "./components/JobListing";

function App() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    jobType: "",
    minExperience: "",
    minSalary: "",
  });

  // Function to fetch jobs from the server
  const fetchJobs = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      limit: 10,
      offset: 0,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const myObj = JSON.parse(result);
        setJobs(() => [myObj.jdList]);
      })
      .catch((error) => console.error(error));
  };

  // Function to handle filtering of jobs
  const handleFilterChange = (filterName, value) => {
    // Reset page when filters change
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  useEffect(() => {
    setFilteredJobs(
      jobs.map((item) =>
        item.filter(
          (job) =>
            job?.location
              .toLowerCase()
              .includes(filters.location.toLowerCase()) &&
            job?.jobRole
              .toLowerCase()
              .includes(filters.jobType.toLowerCase()) &&
            (filters.minExperience === "" ||
              parseInt(job.minExp) >= parseInt(filters.minExperience)) &&
            (filters.minSalary === "" ||
              parseInt(job.minJdSalary) >= parseInt(filters.minSalary))

          // (filters.jobType === "" || job?.jobRole === filters.jobType)
        )
      )
    );
  }, [jobs, filters]);

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  return (
    <div className="container">
      <h1 className="title">Job Listings</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Location"
          value={filters.location}
          onChange={(e) => handleFilterChange("location", e.target.value)}
        />
        <select
          style={{ color: "gray" }}
          value={filters.jobType}
          onChange={(e) => handleFilterChange("jobType", e.target.value)}
        >
          <option value="">All</option>
          <option value="Tech Lead">Tech Lead</option>
          <option value="Frontend">Frontend</option>
          <option value="Ios">Ios</option>
          <option value="Backend">Backend</option>
          <option value="Android">Android</option>
        </select>
        <input
          type="number"
          placeholder="Minimum Experience"
          value={filters.minExperience}
          onChange={(e) => handleFilterChange("minExperience", e.target.value)}
          className="minExperienceInput"
        />
        <input
          type="number"
          placeholder="Minimum salary"
          value={filters.minSalary}
          onChange={(e) => handleFilterChange("minSalary", e.target.value)}
          className="minExperienceInput"
        />
      </div>
      <div className="jobListings">
        {filteredJobs[0]?.map((job) => (
          <div key={job.jdUid}>
            <JobListing
              key={job.id}
              jobRole={job.jobRole}
              jobDetails={job.jobDetailsFromCompany}
              jobLocation={job.location}
              maxSalary={job.maxJdSalary}
              minSalary={job.minJdSalary}
              minExp={job.minExp}
              maxExp={job.maxExp}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
