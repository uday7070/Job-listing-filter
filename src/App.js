import "./App.css";
import { useEffect, useState } from "react";
import JobListing from "./components/JobListing";

function App() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    jobType: "",
  });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10; // Number of jobs per page

  // Function to fetch jobs from the server
  const fetchJobs = async () => {
    setLoading(true);

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
        setJobs((prevJobs) => [...prevJobs, myObj.jdList]);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  // Function to handle filtering of jobs
  const handleFilterChange = (filterName, value) => {
    setPage(1); // Reset page when filters change
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  // Function to handle scrolling
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page, filters]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="container">
      <h1 className="title">Job Listings</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Keyword"
          value={filters.keyword}
          onChange={(e) => handleFilterChange("keyword", e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={filters.location}
          onChange={(e) => handleFilterChange("location", e.target.value)}
        />
        <select
          value={filters.jobType}
          onChange={(e) => handleFilterChange("jobType", e.target.value)}
        >
          <option value="">All</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
          <option value="freelance">Freelance</option>
        </select>
      </div>
      <div className="jobListings">
        {filteredJobs.map((job) => (
          <JobListing key={job.id} job={job.jobDetailsFromCompany} />
        ))}
      </div>
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
}

export default App;
