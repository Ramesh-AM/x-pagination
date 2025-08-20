import React, {useEffect, useState} from "react";
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPage = 10;

  useEffect(() => {
    const fetchData = async () => {
    try {
      const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setEmployees(data);
      console.log("Fetched Employees:", data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(employees.length / rowsPage);
  const startIndex = (currentPage - 1) * rowsPage;
  const endIndex = startIndex + rowsPage;
  const currentEmployees = employees.slice(startIndex, endIndex);
  console.log("Current Employees:", currentEmployees);
  return (
    <div className="App" style={{ padding: "20px" }}>
      <h2>Employee Data</h2>
      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "20px" }} className="pagination">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
        <span style={{ margin: "0 10px" }}>Page {currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}

export default App;
