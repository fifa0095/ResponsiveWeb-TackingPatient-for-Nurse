import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './Table.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// TableComponent definition
const TableComponent = ({ setSelectedSidebarItem }) => {
  const [patients, setPatients] = useState([]); // State to store patient data
  const [expandedRow, setExpandedRow] = useState(null); // State to manage expanded rows
  const [records, setRecords] = useState({}); // State to store records of expanded patients

  // Function to fetch data from the patients API
  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/patients/get');
      setPatients(response.data); // Set patients data from API response
    } catch (error) {
      console.error('Error fetching patients:', error); // Handle any errors
    }
  };

  // Function to fetch records for a specific patient
  const fetchRecords = async (patientId) => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/patients/record');
      setRecords((prevRecords) => ({
        ...prevRecords,
        [patientId]: response.data.filter(record => record.patientId === patientId),
      })); // Set records data for the specific patient
    } catch (error) {
      console.error('Error fetching records:', error); // Handle any errors
    }
  };

  // Fetch patient data when the component mounts
  useEffect(() => {
    fetchPatients();
  }, []);

  // Function to toggle row expansion and fetch records if necessary
  const toggleRow = async (index) => {
    if (expandedRow === index) {
      setExpandedRow(null); // Collapse row if it's already expanded
    } else {
      setExpandedRow(index); // Expand the row
      const patient = patients[index];
      await fetchRecords(patient.HN); // Fetch records for the selected patient
    }
  };

  // Function to get color based on time
  const getColorByTime = (value) => {
    const hour = parseInt(value.split(':')[0], 10);
    if (value.includes('AM')) {
      if (hour >= 0 && hour < 8) return 'night'; // เวรดึก (00.00-08.00)
      if (hour >= 8 && hour < 16) return 'morning'; // เวรเช้า (08.00-16.00)
    } else {
      if (hour >= 16) return 'evening'; // เวรบ่าย (16.00-00.00)
      return 'afternoon'; // For times between 12:00 PM and 4:00 PM
    }
    return '';
  };

  return (
    <div className="container-table">
      <div className="header-container">
        <div className="header-left">
          <div className="header-title">All Customers</div>
          <div className="header-link">Active Members</div>
        </div>
        <div className="header-right">
          <input
            type="text"
            className="search-input"
            placeholder="Search by Name or Hospital Number"
          />
          <button
            className="new-pt-button"
            onClick={() => setSelectedSidebarItem('Form')}
          >
            New PT
          </button>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table className="Table">
          <TableHead>
            <TableRow>
              <TableCell>Hospital Number</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell>{patient.HN}</TableCell>
                  <TableCell>{`${patient.prefix} ${patient.name} ${patient.surname}`}</TableCell>
                  <TableCell>{patient.DOB}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>
                    <button onClick={() => toggleRow(index)}>
                      {expandedRow === index ? 'Hide Details' : 'Show Details'}
                    </button>
                  </TableCell>
                </TableRow>
                {expandedRow === index &&
                  (records[patient.HN] || []).map((record) => (
                    <TableRow key={record.id} className="sub-row">
                      <TableCell>{new Date(record.timestamp).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(record.timestamp).toLocaleTimeString()}</TableCell>
                      <TableCell className={getColorByTime(new Date(record.timestamp).toLocaleTimeString())}>
                        {new Date(record.timestamp).toLocaleTimeString()}
                      </TableCell>
                      <TableCell>
                        <a href={`/details/${record.id}`}>More Details</a>
                      </TableCell>
                    </TableRow>
                  ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;
