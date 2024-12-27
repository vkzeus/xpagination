import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]); // All employee data
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [error, setError] = useState(null); // Error state for API calls

  const rowsPerPage = 10; // Number of rows per page
  const totalPages = Math.ceil(data.length / rowsPerPage); // Calculate total pages

  // Fetch employee data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setData(response.data);
      } catch (error) {
        setError("Failed to fetch data");
        alert("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  // Calculate data to display for the current page
  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Navigate to the previous page
  const handlePrevious = () => {
    if (currentPage === 1) {
      setCurrentPage(totalPages); // Go to last page if currently on the first page
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  // Navigate to the next page
  const handleNext = () => {
    if (currentPage === totalPages) {
      setCurrentPage(1); // Go back to the first page if currently on the last page
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="app">
      <h1>Employee Pagination</h1>

      {error && <p className="error-message">{error}</p>}

      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-controls">
        <button onClick={handlePrevious}>Previous</button>
        <span>Page {currentPage}</span>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default App;
