import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TextField, Typography, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Emp.css';
import '../styles/Admin.css';
import '../styles/Nav.css';
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
    <div>
      <div className="container">
      <h1>CURRICULUM DETAILES</h1>
      <Typography className='mt-4'>Search</Typography>
        <TextField className='search mt-1'
          name='search'
          variant='outlined'
          color="success"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          label='Search'
          fullWidth
          margin='normal'
        />  
       <Button className='btnsearch m-2' onClick={searchCurriculum} variant='contained' color='primary'>Search</Button>
        <div>
          <Table className='tblcolor'>
            <TableHead className='tblhead'>
              <TableRow>
                <TableCell><b>ID</b></TableCell>
                <TableCell><b>Requirement</b></TableCell>
                <TableCell><b>Area</b></TableCell>
                <TableCell><b>Institution</b></TableCell>
                <TableCell><b>Category</b></TableCell>
                <TableCell><b>Hours</b></TableCell>
                <TableCell><b>url</b></TableCell>
                <TableCell><b>Response</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className='tblbody'>
              {data.map((value, index) => (
                <TableRow key={index}>
                  <TableCell>{index}</TableCell>
                  <TableCell>{value.requirementname}</TableCell>
                  <TableCell>{value.area}</TableCell>
                  <TableCell>{value.institution}</TableCell>
                  <TableCell>{value.category}</TableCell>
                  <TableCell>{value.hours}</TableCell>
                  <TableCell><a href={value.admin_upload_url}>Curriculum Download</a></TableCell>
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
