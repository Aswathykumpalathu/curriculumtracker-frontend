import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TextField, Typography, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Emp.css';
import './Nav.css';
const EmployeeDashboard = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [userrole, setUserRole] = useState('');

  const fetchDataFromApi = () => {
    axios.get("http://localhost:5000/api/curriculumlist/")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    const storedUserRole = sessionStorage.getItem('userrole');
    setUserRole(storedUserRole);
    fetchDataFromApi();
  }, []);

  const searchCurriculum = () => {
    console.log('button clicked');
    // Convert the search state to an object with the field "query"
    const searchQuery = { query: search };
    axios.post("http://localhost:5000/api/curriculum/search",  { query: search })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className='employeedash'>
      <div className="container mt-5 pt-5">
      <Typography>Search</Typography>
        <TextField className='search1'
          name='search'
          variant='outlined'
          color="success"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          label='Search'
          fullWidth
          margin='normal'
        />
        <Button className='btnsearch1' onClick={searchCurriculum} variant='contained' color='primary' fullWidth>Search</Button>
        <div>
          <Table className='tblcolor'>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Requirement</TableCell>
                <TableCell>Area</TableCell>
                <TableCell>Institution</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Hours</TableCell>
                <TableCell>url</TableCell>
                <TableCell>Response</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((value, index) => (
                <TableRow key={index}>
                  <TableCell>{index}</TableCell>
                  <TableCell>{value.requirementname}</TableCell>
                  <TableCell>{value.area}</TableCell>
                  <TableCell>{value.institution}</TableCell>
                  <TableCell>{value.category}</TableCell>
                  <TableCell>{value.hours}</TableCell>
                  <TableCell><a href={value.faculty_upload_url}>Download</a></TableCell>
                <TableCell>{value.status === 'InProgress' ? (
    <Button variant="contained"  size="small"><Link to={`update/${value._id}`} className='btnupdt'>Update</Link></Button>
  ) : (
    null
  )}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
